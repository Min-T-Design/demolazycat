'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { clampPhotoOffset, horizontalDrag } from '@/lib/drag';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TourPhotoStrip({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  const row = useRef<HTMLDivElement>(null);
  const gesture = useRef<{
    id: number;
    x: number;
    y: number;
    base: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const [manual, setManual] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const [resting, setResting] = useState(false);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const expandedRef = useRef(false);
  const [minimum, setMinimum] = useState(0);
  const completionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoFrame = useRef<number | null>(null);
  const mobileTrack = () => matchMedia('(max-width: 640px)').matches;
  const trackWidth = () => (mobileTrack() ? 409 : 504);
  const cancelAutoFrame = () => {
    if (autoFrame.current !== null) cancelAnimationFrame(autoFrame.current);
    autoFrame.current = null;
  };
  const finishAuto = () => {
    setOffset(clampPhotoOffset(currentOffset(), row.current?.clientWidth ?? 0));
    setReady(true);
  };
  const begin = () => {
    if (expandedRef.current) return;
    expandedRef.current = true;
    setResting(false);
    setExpanded(true);
    if (completionTimer.current) clearTimeout(completionTimer.current);
    cancelAutoFrame();
    if (mobileTrack()) {
      setReady(false);
      setOffset(0);
      completionTimer.current = setTimeout(
        finishAuto,
        matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 720,
      );
      return;
    }
    completionTimer.current = setTimeout(
      finishAuto,
      matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 2300,
    );
  };
  const reset = () => {
    if (completionTimer.current) clearTimeout(completionTimer.current);
    cancelAutoFrame();
    expandedRef.current = false;
    setReady(false);
    gesture.current = null;
    setDragging(false);
    setManual(false);
    setOffset(0);
    setResting(true);
    setExpanded(false);
  };
  const currentOffset = () => {
    const transform = getComputedStyle(row.current!).transform;
    return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m41;
  };
  const clamp = (value: number) =>
    clampPhotoOffset(value, row.current?.clientWidth ?? 0, trackWidth());
  const move = (step: number) => {
    if (completionTimer.current) clearTimeout(completionTimer.current);
    setReady(true);
    setResting(false);
    setOffset(clamp(currentOffset() + step * 128));
    setManual(true);
  };
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setMinimum(
        clampPhotoOffset(
          -Infinity,
          row.current?.clientWidth ?? 0,
          trackWidth(),
        ),
      );
      setOffset((value) => clamp(value));
    });
    if (row.current) observer.observe(row.current);
    return () => {
      observer.disconnect();
      if (completionTimer.current) clearTimeout(completionTimer.current);
      cancelAutoFrame();
    };
  }, []);
  useEffect(() => {
    const card = row.current?.closest('.tour-card');
    if (!card) return;
    const handlePointerEnter = (event: Event) => {
      if ((event as PointerEvent).pointerType === 'mouse' && !mobileTrack())
        begin();
    };
    const handlePointerLeave = (event: Event) => {
      const pointerEvent = event as PointerEvent;
      if (pointerEvent.pointerType === 'mouse' && !gesture.current?.moved)
        reset();
    };
    const handleFocusIn = (event: Event) => {
      const focusEvent = event as FocusEvent;
      if (
        !mobileTrack() &&
        !card.contains(focusEvent.relatedTarget as Node | null)
      )
        begin();
    };
    const handleFocusOut = (event: Event) => {
      const focusEvent = event as FocusEvent;
      if (!card.contains(focusEvent.relatedTarget as Node | null)) reset();
    };
    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointerleave', handlePointerLeave);
    card.addEventListener('focusin', handleFocusIn);
    card.addEventListener('focusout', handleFocusOut);
    return () => {
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointerleave', handlePointerLeave);
      card.removeEventListener('focusin', handleFocusIn);
      card.removeEventListener('focusout', handleFocusOut);
    };
  }, []);
  useEffect(() => {
    if (!mobileTrack()) return;
    const frame = requestAnimationFrame(() => {
      if (active) begin();
      else reset();
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);
  return (
    <div
      className="tour-photo-window draggable-tour-photos"
      data-manual={manual}
      data-dragging={dragging}
      data-resting={resting}
      data-open={expanded}
      tabIndex={0}
      role="group"
      aria-label="Tour photos. Drag horizontally or use the arrow buttons."
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          setResting(false);
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? 1 : -1);
        }
      }}
      onDragStart={(event) => event.preventDefault()}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        suppressClick.current = false;
        setResting(false);
        if (mobileTrack()) {
          if (!expandedRef.current) {
            begin();
            suppressClick.current = true;
          }
        }
        gesture.current = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          base: currentOffset(),
          moved: false,
        };
      }}
      onPointerMove={(event) => {
        const drag = gesture.current;
        if (!drag || drag.id !== event.pointerId) return;
        const dx = event.clientX - drag.x,
          dy = event.clientY - drag.y;
        if (!drag.moved) {
          if (Math.abs(dy) > 6 && Math.abs(dy) > Math.abs(dx)) {
            gesture.current = null;
            return;
          }
          if (!horizontalDrag(dx, dy)) return;
          drag.moved = true;
          if (completionTimer.current) clearTimeout(completionTimer.current);
          cancelAutoFrame();
          setReady(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          setManual(true);
          setDragging(true);
          suppressClick.current = true;
        }
        event.preventDefault();
        setOffset(clamp(drag.base + dx));
      }}
      onPointerUp={(event) => {
        if (gesture.current?.id !== event.pointerId) return;
        gesture.current = null;
        setDragging(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId))
          event.currentTarget.releasePointerCapture(event.pointerId);
        if (event.pointerType === 'mouse') {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            reset();
        }
      }}
      onPointerCancel={() => {
        gesture.current = null;
        setDragging(false);
      }}
      onLostPointerCapture={() => {
        gesture.current = null;
        setDragging(false);
      }}
      onClickCapture={(event) => {
        if (suppressClick.current && event.detail !== 0) {
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }
      }}
    >
      <div
        ref={row}
        className="tour-photo-row"
        onTransitionEnd={(event) => {
          if (
            event.target === event.currentTarget &&
            event.propertyName === 'transform' &&
            !manual &&
            !resting
          )
            finishAuto();
        }}
        style={
          manual
            ? {
                transform: `translateX(${offset}px)`,
                transition: dragging
                  ? 'none'
                  : 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
              }
            : undefined
        }
      >
        {children}
      </div>
      <div
        className="tour-photo-controls"
        data-ready={ready}
        onPointerDown={(event) => {
          event.stopPropagation();
          suppressClick.current = false;
        }}
      >
        <button
          type="button"
          aria-label="Scroll tour photos left"
          disabled={!ready || offset >= -1}
          style={{ visibility: ready && offset < -1 ? 'visible' : 'hidden' }}
          onClick={() => move(1)}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Scroll tour photos right"
          disabled={!ready || offset <= minimum + 1}
          style={{
            visibility: ready && offset > minimum + 1 ? 'visible' : 'hidden',
          }}
          onClick={() => move(-1)}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
