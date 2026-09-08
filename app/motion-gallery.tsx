'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import assets from '@/lib/figma-assets.json';
import { advanceCard, cardOffset } from '@/lib/carousel';

const introPhotos = [
  assets.intro.imgPicture,
  assets.intro.imgPicture1,
  assets.intro.imgPicture2,
  assets.moments.imgImage3,
  assets.moments.imgImage4,
];

export function IntroCarousel() {
  const [active, setActive] = useState(1);
  const move = (step: number) =>
    setActive((current) => advanceCard(current, step));
  return (
    <div
      className="intro-carousel intro-loop"
      role="region"
      aria-label="Travel moments"
      aria-roledescription="carousel"
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
    >
      <div className="intro-slides">
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
                  opacity: Math.abs(offset) === 2 ? 0 : 1,
                } as CSSProperties
              }
              aria-hidden={Math.abs(offset) === 2}
              tabIndex={Math.abs(offset) === 2 ? -1 : 0}
              aria-label={`Travel moment ${index + 1} of 5${offset === 0 ? ', current' : ''}`}
              aria-current={offset === 0}
              onClick={() => setActive(index)}
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
          <img className="icon" src={assets.intro.imgIconLeft} alt="" />
        </button>
        <button
          className="round-button"
          aria-label="Next travel moment"
          onClick={() => move(1)}
        >
          <img className="icon" src={assets.intro.imgIconLeft1} alt="" />
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
    </div>
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
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div className="gallery-motion-control section-container">
        <button
          className="text-link"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? 'Play slideshow' : 'Pause slideshow'}
        </button>
      </div>
      <div className="moments-gallery">
        <MovingRow
          photos={[1, 2, 3, 4, 5]}
          reverse={false}
          paused={paused || lightboxOpen}
          onOpen={onOpen}
        />
        <MovingRow
          photos={[6, 7, 8, 9, 10]}
          reverse
          paused={paused || lightboxOpen}
          onOpen={onOpen}
        />
      </div>
    </>
  );
}
