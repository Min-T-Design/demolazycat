'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import assets from '@/lib/figma-assets.json';
import { advanceCard, cardOffset } from '@/lib/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const introPhotos = [
  assets.intro.imgPicture,
  assets.intro.imgPicture1,
  assets.intro.imgPicture2,
  assets.moments.imgImage3,
  assets.moments.imgImage4,
];

export function IntroCarousel() {
  const [active, setActive] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const slides = useRef<HTMLDivElement>(null);
  const swipe = useRef<{
    id: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const move = (step: number) =>
    setActive((current) => advanceCard(current, step));
  useEffect(() => {
    const element = slides.current;
    if (!element) return;
    const finish = (event?: PointerEvent) => {
      const gesture = swipe.current;
      if (!gesture || (event && gesture.id !== event.pointerId)) return;
      const distance = (event?.clientX ?? gesture.x) - gesture.x;
      if (gesture.moved) {
        suppressClick.current = true;
        if (Math.abs(distance) >= 44) {
          setActive((current) => advanceCard(current, distance < 0 ? 1 : -1));
        }
      }
      swipe.current = null;
      setDragging(false);
      setDragX(0);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      suppressClick.current = false;
      swipe.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        moved: false,
      };
    };
    const handlePointerMove = (event: PointerEvent) => {
      const gesture = swipe.current;
      if (!gesture || gesture.id !== event.pointerId) return;
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      if (!gesture.moved) {
        if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
          swipe.current = null;
          return;
        }
        if (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy)) return;
        gesture.moved = true;
        setDragging(true);
        try {
          element.setPointerCapture(event.pointerId);
        } catch {
          // Older embedded browsers still deliver the following pointer events.
        }
      }
      event.preventDefault();
      setDragX(Math.max(-120, Math.min(120, dx)));
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (swipe.current?.id !== event.pointerId) return;
      finish(event);
      try {
        if (element.hasPointerCapture(event.pointerId)) {
          element.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Pointer capture is an enhancement, not a requirement for the swipe.
      }
    };
    const handlePointerCancel = () => {
      swipe.current = null;
      setDragging(false);
      setDragX(0);
    };
    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointermove', handlePointerMove, {
      passive: false,
    });
    element.addEventListener('pointerup', handlePointerUp);
    element.addEventListener('pointercancel', handlePointerCancel);
    element.addEventListener('lostpointercapture', handlePointerCancel);
    return () => {
      element.removeEventListener('pointerdown', handlePointerDown);
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerup', handlePointerUp);
      element.removeEventListener('pointercancel', handlePointerCancel);
      element.removeEventListener('lostpointercapture', handlePointerCancel);
    };
  }, []);
  return (
    <section
      className="intro-carousel intro-loop"
      aria-label="Travel moments"
      aria-roledescription="carousel"
    >
      <div
        ref={slides}
        className="intro-slides"
        data-dragging={dragging}
        style={{ '--drag-x': `${dragX}px` } as CSSProperties}
      >
        {introPhotos.map((photo, index) => {
          const offset = cardOffset(index, active);
          return (
            <button
              key={photo}
              className={`intro-slide ${offset === 0 ? 'selected' : ''}`}
              style={
                {
                  '--offset': offset,
                  '--scale': offset === 0 ? 1 : 0.75,
                  zIndex: 3 - Math.abs(offset),
                  opacity: Math.abs(offset) === 2 ? 0 : offset === 0 ? 1 : 0.8,
                } as CSSProperties
              }
              aria-hidden={Math.abs(offset) === 2}
              tabIndex={Math.abs(offset) === 2 ? -1 : 0}
              aria-label={`Travel moment ${index + 1} of 5${offset === 0 ? ', current' : ''}`}
              aria-current={offset === 0}
              onClick={(event) => {
                if (suppressClick.current) {
                  event.preventDefault();
                  suppressClick.current = false;
                  return;
                }
                setActive(index);
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  move(1);
                }
                if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  move(-1);
                }
              }}
              onDragStart={(event) => event.preventDefault()}
            >
              <img
                src={photo}
                alt="Travelers exploring the Ha Giang Loop"
                width="214"
                height="380"
              />
              <span className="video-caption">
                This Is Not Your Average Vietnam Tour
                <span>
                  <img
                    className="icon"
                    src={assets.intro.imgPlay}
                    alt=""
                    width="18"
                    height="18"
                  />
                  1:01
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="carousel-controls">
        <button
          className="round-button"
          aria-label="Previous travel moment"
          onClick={() => move(-1)}
        >
          <ChevronLeft className="icon" aria-hidden="true" />
        </button>
        <button
          className="round-button"
          aria-label="Next travel moment"
          onClick={() => move(1)}
        >
          <ChevronRight className="icon" aria-hidden="true" />
        </button>
      </div>
      <div className="pagination" aria-label="Choose travel moment">
        {introPhotos.map((_, index) => (
          <button
            key={index}
            aria-label={`Travel moment ${index + 1}`}
            aria-current={active === index}
            className={active === index ? 'selected' : ''}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        Travel moment {active + 1} of 5
      </span>
    </section>
  );
}

function MovingRow({
  photos,
  reverse,
  paused,
  onOpen,
}: {
  photos: number[];
  reverse: boolean;
  paused: boolean;
  onOpen: (index: number) => void;
}) {
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (viewport.current) observer.observe(viewport.current);
    animation.current = track.current!.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-33.3333333333%)' },
      ],
      {
        duration: photos.length * 7000,
        iterations: Infinity,
        easing: 'linear',
        direction: reverse ? 'reverse' : 'normal',
      },
    );
    animation.current.pause();
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
      animation.current?.cancel();
    };
  }, [photos.length, reverse]);
  useEffect(() => {
    const motion = animation.current;
    if (!motion) return;
    motion.updatePlaybackRate(hovered ? 0.18 : 1);
    if (paused || focused || reduced || !visible) motion.pause();
    else motion.play();
  }, [paused, focused, reduced, visible, hovered]);
  return (
    <div
      className="moment-marquee"
      ref={viewport}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (event.target.matches(':focus-visible')) setFocused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="moment-track" ref={track}>
        {[0, 1, 2].map((copy) => (
          <div className="moment-group" key={copy} aria-hidden={copy > 0}>
            {photos.map((number, index) => (
              <button
                key={`${number}-${index}`}
                className="moment-photo"
                tabIndex={copy > 0 ? -1 : 0}
                aria-label={`Open Ha Giang travel photo ${number}`}
                onClick={() => onOpen(number - 1)}
              >
                <img
                  src={
                    (assets.moments as Record<string, string>)[
                      `imgImage${number}`
                    ]
                  }
                  width="320"
                  height="320"
                  alt="Friends sharing an adventure on the Ha Giang Loop"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MomentsGallery({
  lightboxOpen,
  onOpen,
}: {
  lightboxOpen: boolean;
  onOpen: (index: number) => void;
}) {
  return (
    <div className="moments-gallery">
      <MovingRow
        photos={[1, 2, 3, 4, 5]}
        reverse={false}
        paused={lightboxOpen}
        onOpen={onOpen}
      />
      <MovingRow
        photos={[6, 7, 8, 9, 10]}
        reverse
        paused={lightboxOpen}
        onOpen={onOpen}
      />
    </div>
  );
}
