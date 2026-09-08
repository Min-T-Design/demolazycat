'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { clampPhotoOffset, horizontalDrag } from '@/lib/drag';
import assets from '@/lib/figma-assets.json';

export function TourPhotoStrip({ children }: { children: ReactNode }) {
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
  const currentOffset = () => {
    const transform = getComputedStyle(row.current!).transform;
    return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m41;
  };
  const clamp = (value: number) =>
    clampPhotoOffset(value, row.current?.clientWidth ?? 0);
  const move = (step: number) => {
    setOffset(clamp(currentOffset() + step * 140));
    setManual(true);
  };
  useEffect(() => {
    const observer = new ResizeObserver(() =>
      setOffset((value) =>
        clampPhotoOffset(value, row.current?.clientWidth ?? 0),
      ),
    );
    if (row.current) observer.observe(row.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className="tour-photo-window draggable-tour-photos"
      data-manual={manual}
      data-dragging={dragging}
      tabIndex={0}
      role="group"
      aria-label="Tour photos. Drag horizontally or use the arrow buttons."
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? 1 : -1);
        }
      }}
      onDragStart={(event) => event.preventDefault()}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        suppressClick.current = false;
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
        style={
          manual
            ? { transform: `translateX(${offset}px)`, transition: 'none' }
            : undefined
        }
      >
        {children}
      </div>
      <div
        className="tour-photo-controls"
        onPointerDown={(event) => {
          event.stopPropagation();
          suppressClick.current = false;
        }}
      >
        <button
          type="button"
          aria-label="Scroll tour photos left"
          onClick={() => move(1)}
        >
          <img src={assets.intro.imgIconLeft} alt="" width="20" height="20" />
        </button>
        <button
          type="button"
          aria-label="Scroll tour photos right"
          onClick={() => move(-1)}
        >
          <img src={assets.intro.imgIconLeft1} alt="" width="20" height="20" />
        </button>
      </div>
    </div>
  );
}
