'use client';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { NativeSelect } from '@/components/ui/native-select';
import assets from '@/lib/figma-assets.json';
import { MomentsGallery } from './motion-gallery';
import { TourPhotoStrip } from './tour-photo-strip';
import { FoodCarousel } from './food-carousel';
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
const images = assets as Record<string, Record<string, string>>;
const src = (section: string, name: string) => images[section]?.[name];
function Icon({
  section = 'hero',
  name,
  className = '',
}: {
  section?: string;
  name: string;
  className?: string;
}) {
  return (
    <img
      className={`icon ${className}`}
      src={src(section, name)}
      alt=""
      aria-hidden="true"
      width="24"
      height="24"
    />
  );
}
function SectionHeading({
  tag,
  children,
  link = 'Explore More',
  href = '#tours',
  extra,
}: {
  tag: string;
  children: React.ReactNode;
  link?: string;
  href?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <Icon section="intro" name="imgBrandLogo" />
          {tag}
        </p>
        <h2>{children}</h2>
      </div>
      {extra ?? (
        <a className="text-link" href={href}>
          {link}
          <Icon section="tours" name="imgFi7776927" />
        </a>
      )}
    </div>
  );
}
function MobileSectionLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a className="mobile-section-link" href={href}>
      {children}
      <Icon section="tours" name="imgFi7776927" />
    </a>
  );
}
function RoundArrow({
  back = false,
  onClick,
  label,
}: {
  back?: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      className={`round-button ${back ? 'back' : ''}`}
      onClick={onClick}
      aria-label={label}
    >
      <Icon name="imgIconLeft1" />
    </button>
  );
}
const tours = [
  {
    title: 'Ho Chi Minh City Tour: The Hidden Gems 3 Days & 2 Nights',
    destination: 'Ho Chi Minh',
    features: [
      'Breathtaking mountain vistas.',
      'Knowledgeable local guide.',
      'Outdoor adventures like hiking and swimming.',
      'Cozy and genuine lodging options.',
      'Comfortable and authentic places to stay.',
      'Charming and welcoming accommodations.',
    ],
  },
  {
    title: '4 Days & 3 Nights Ha Giang Loop Tour - Great experience',
    destination: 'Ha Giang',
    features: [
      'Stunning mountain scenery.',
      'Skilled local tour guide.',
      'Fun activities like hiking and swimming.',
      'Inviting and authentic lodging.',
      'Comfortable and authentic accommodations.',
      'Welcoming and genuine places to stay.',
    ],
  },
  {
    title: 'Hoi An/ Da Nang - Ba Na Hills - Golden Bridge Deluxe',
    destination: 'Da Nang',
    features: [
      'Gorgeous mountain views.',
      'Experienced local tour guide.',
      'Exciting activities: hiking and swimming.',
      'Comfortable and authentic lodging.',
      'Charming and cozy accommodations.',
      'Authentic and comfortable places to stay.',
    ],
  },
];
const benefits = [
  {
    title: 'All-Inclusive, no hidden fees',
    body: 'Other providers many may add extra charges during your trip or after. With our all-inclusive packages there are no hidden fees, no unexpected costs!',
    icon: 'imgGroup4',
  },
  {
    title: 'Enjoy deeper connections',
    body: 'Other providers many may We keep our tours small, with 6 to 8 people, for a more personal, flexible, and immersive experience. Enjoy deeper connections with local guides, culture, and the stunning landscapes of the Ha Giang Loop.',
    icon: 'imgSketch',
  },
  {
    title: 'Cool little finds, hidden gems',
    body: "We guide you to off-the-beaten-path locations where larger groups can't reach, allowing you to explore hidden gems like waterfalls, caves, and peaceful viewpoints.",
    icon: 'imgGroup1',
  },
  {
    title: 'Comfortable Accommodation',
    body: 'Stay in local homestays and guesthouses along the Ha Giang Loop. Enjoy clean rooms, hot showers, and home-cooked meals, with warm hospitality from ethnic minority families.',
    icon: 'imgGroup2',
  },
  {
    title: 'Fairness and ethics. Bring a wonderful trip',
    body: "We care about our guests and our Easy Riders the heart of every tour. We make sure they're treated fairly and supported, so everyone enjoys the ride. Happy riders, happy journeys!",
    icon: 'imgGroup3',
  },
  {
    title: 'Awesome easy rider, great experience',
    body: 'We carefully select professional drivers who are skilled, experienced, and personable, ensuring you a safe and comfortable Ha Giang Loop tour, reliable motorbike guides, and an unforgettable Northern Vietnam adventure.',
    icon: 'imgGroup',
  },
];
const reviews = [
  {
    name: 'Morgan Chase',
    source: 'Client',
    avatar: 'imgEllipse31',
    text: 'Had an amazing time on the Ha Giang Loop with just 6 of us. My easy rider was skilled and friendly, making me feel safe even on zigzag mountain roads so I could take pictures. Loved the spots he chose for my vibe. The Lazy Cat owner was very helpful and booked my buses at a fair price. 10/10 experience!',
  },
  {
    name: 'Taylor Reed',
    source: 'Google',
    avatar: 'imgEllipse32',
    text: 'Great hostel! you can book the ha giang loop with them (we did 4 days), and it was amazing! they also provide free breakfast at the hostel, and the dorms/private rooms are both really clean and chill',
  },
  {
    name: 'Jordan Blake',
    source: 'Booking',
    avatar: 'imgEllipse33',
    text: 'Great hostel! Staff made it very easy to book the loop on one day notice for a good price. They also have a good location that’s a close walk to the city but quiet. Lastly staff is very good and you get yummy free breakfast / would recommend.',
  },
];
const faqQuestions = [
  'Is there a free trial available?',
  'Can I change my plan later?',
  'What is your cancellation policy?',
  'Can other info be added to an invoice?',
  'How does billing work?',
  'How do I change my account email?',
];
const newsTitle =
  'Which season is nice to go to in Ha Giang? 3 Days & 2 Nights';
const newsBody =
  'After arriving at the lighthouse, you can explore the permitted rooms inside, take some photos in front of the easternmost landmark of the country,... The magnificent yet untouched scenery from this viewpoint will quickly make you fall in love with the sea of Phu Yen!';

// Figma 568:3328 custom spring: mass 1, stiffness 115.2, damping 12.
// Sample its analytical response for CSS linear(); preserve its 1.2371818s timeline.
const springDuration = 1.2371817827224731;
const springEase = `linear(${Array.from({ length: 121 }, (_, i) => {
  const t = (i / 120) * springDuration;
  const w = Math.sqrt(115.19999694824219 - 36);
  return i === 120
    ? '1'
    : (
        1 -
        Math.exp(-6 * t) * (Math.cos(w * t) + (6 / w) * Math.sin(w * t))
      ).toFixed(6);
}).join(',')})`;
type Preview = {
  section: string;
  names: string[];
  index: number;
  title: string;
};

export default function SiteSections({
  query = '',
  destination = '',
}: {
  query?: string;
  destination?: string;
}) {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [booking, setBooking] = useState(false);
  const [article, setArticle] = useState<number | null>(null);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const [reviewApi, setReviewApi] = useState<CarouselApi>();
  const [reviewSlide, setReviewSlide] = useState(0);
  const [tourSlide, setTourSlide] = useState(0);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [destinationOffset, setDestinationOffset] = useState(0);
  const toursRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const destinationPositions = useRef(new Map<string, number>());
  const destinationAnimations = useRef<Animation[]>([]);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const visibleTours = tours
    .map((tour, index) => ({ ...tour, index }))
    .filter(
      (t) =>
        (!query || t.title.toLowerCase().includes(query.toLowerCase())) &&
        (!destination ||
          destination === 'Nearby' ||
          t.destination
            .toLowerCase()
            .includes(destination.split(',')[0].toLowerCase())),
    );
  useEffect(() => {
    const viewport = toursRef.current;
    if (!viewport) return;
    const start = Math.max(
      0,
      visibleTours.findIndex((tour) => tour.destination === 'Ha Giang'),
    );
    setTourSlide(start);
    if (!matchMedia('(max-width: 640px)').matches) return;
    const frame = requestAnimationFrame(() => {
      const card = viewport.querySelectorAll<HTMLElement>('.tour-card')[start];
      if (card) viewport.scrollLeft = card.offsetLeft;
    });
    return () => cancelAnimationFrame(frame);
  }, [query, destination, visibleTours.length]);
  useEffect(() => {
    if (!reviewApi) return;
    const update = () =>
      setReviewSlide(reviewApi.selectedScrollSnap() % reviews.length);
    update();
    reviewApi.on('select', update);
    reviewApi.on('reInit', update);
    return () => {
      reviewApi.off('select', update);
      reviewApi.off('reInit', update);
    };
  }, [reviewApi]);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    const observer = new IntersectionObserver(
      ([entry]) => setReviewsVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    if (reviewsRef.current) observer.observe(reviewsRef.current);
    return () => {
      media.removeEventListener('change', sync);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!reviewApi || reviewsPaused || reducedMotion || !reviewsVisible) return;
    const timer = window.setInterval(() => reviewApi.scrollNext(), 4200);
    return () => window.clearInterval(timer);
  }, [reviewApi, reviewsPaused, reducedMotion, reviewsVisible]);
  useLayoutEffect(() => {
    const grid = destinationsRef.current;
    const previous = destinationPositions.current;
    if (!grid || previous.size === 0) return;
    destinationAnimations.current.forEach((animation) => animation.cancel());
    destinationAnimations.current = [];
    if (!reducedMotion) {
      const cards = grid.querySelectorAll<HTMLElement>(
        '[data-destination-card]',
      );
      cards.forEach((card) => {
        const name = card.dataset.destinationCard;
        const oldLeft = name ? previous.get(name) : undefined;
        if (oldLeft === undefined) return;
        const delta = oldLeft - card.getBoundingClientRect().left;
        if (Math.abs(delta) < 1) return;
        const wraps = Math.abs(delta) > card.offsetWidth * 2;
        const animation = card.animate(
          wraps
            ? [
                { opacity: 0.25, transform: 'scale(0.97)' },
                { opacity: 1, transform: 'scale(1)' },
              ]
            : [
                { transform: `translate3d(${delta}px, 0, 0)` },
                { transform: 'translate3d(0, 0, 0)' },
              ],
          {
            duration: wraps ? 420 : 560,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          },
        );
        destinationAnimations.current.push(animation);
      });
    }
    previous.clear();
  }, [destinationOffset, reducedMotion]);
  const showPhoto = (
    section: string,
    names: string[],
    index: number,
    title: string,
  ) => setPreview({ section, names, index, title });
  const moveDestinations = (direction: number) => {
    const grid = destinationsRef.current;
    grid?.scrollTo({ left: 0, behavior: 'auto' });
    destinationAnimations.current.forEach((animation) => animation.cancel());
    destinationPositions.current = new Map(
      Array.from(
        grid?.querySelectorAll<HTMLElement>('[data-destination-card]') ?? [],
      ).map((card) => [
        card.dataset.destinationCard ?? '',
        card.getBoundingClientRect().left,
      ]),
    );
    setDestinationOffset((current) => (current + direction + 6) % 6);
  };
  return (
    <>
      <section className="tours-section" id="tours" data-node-id="709:5700">
        <div className="tour-mountains" aria-hidden="true">
          <img
            src="/assets/tours-background.png"
            alt=""
            width="1728"
            height="1152"
          />
        </div>
        <div className="section-container">
          <SectionHeading tag="# Outstanding Tour" href="#destinations">
            <em>Discover</em> Lazy Cat's Tours
          </SectionHeading>
          {(query || destination) && (
            <p className="search-results" role="status">
              {visibleTours.length} tours found{query ? ` for “${query}”` : ''}
              {destination ? ` · ${destination}` : ''}
            </p>
          )}
          <div
            className="tour-carousel-viewport"
            ref={toursRef}
            onScroll={(event) => {
              if (!matchMedia('(max-width: 640px)').matches) return;
              const viewport = event.currentTarget;
              const cards = Array.from(
                viewport.querySelectorAll<HTMLElement>('.tour-card'),
              );
              if (!cards.length) return;
              const center = viewport.scrollLeft + viewport.clientWidth / 2;
              let nearest = 0;
              let distance = Infinity;
              cards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const nextDistance = Math.abs(cardCenter - center);
                if (nextDistance < distance) {
                  distance = nextDistance;
                  nearest = index;
                }
              });
              setTourSlide(nearest);
            }}
          >
            <div className="tour-grid">
              {visibleTours.map((tour) => {
                const photos = Array.from(
                  { length: 4 },
                  (_, i) => `imgPic${tour.index * 4 + i || ''}`,
                );
                return (
                  <article
                    className="tour-card"
                    key={tour.title}
                    data-node-id={`709:${5712 + tour.index}`}
                  >
                    <h3>{tour.title}</h3>
                    <TourPhotoStrip>
                      {photos.map((photo, i) => (
                        <button
                          className="tour-photo"
                          style={{ '--photo-index': i } as CSSProperties}
                          key={photo}
                          aria-label={`Open ${tour.destination} photo ${i + 1}`}
                          onClick={() =>
                            showPhoto('tours', photos, i, tour.title)
                          }
                        >
                          <span>
                            <img
                              src={src('tours', photo)}
                              alt={`${tour.destination} tour highlight ${i + 1}`}
                              width="120"
                              height="161"
                              loading="lazy"
                            />
                          </span>
                        </button>
                      ))}
                    </TourPhotoStrip>
                    <div className="tour-tags">
                      {[
                        ['imgCalendarMonth', '3 Days & 2 Nights'],
                        ['imgSupervisorAccount', '6–8 Pax'],
                        ['imgPsychiatry', 'Vegetarian foods'],
                        ['imgLocalDining', 'Allergy-friendly meals'],
                      ].map(([icon, text]) => (
                        <span key={text}>
                          <Icon section="tours" name={icon} />
                          {text}
                        </span>
                      ))}
                    </div>
                    <div className="tour-price">
                      <strong>$339</strong>
                      <span>/Person</span>
                      <Icon section="tours" name="imgVuesaxLinearInfoCircle" />
                    </div>
                    <div
                      className="tour-features"
                      tabIndex={0}
                      aria-label={`Included in ${tour.destination} tour`}
                    >
                      <ul>
                        {tour.features.map((f) => (
                          <li key={f}>
                            <Icon section="tours" name="imgFi7776927" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tour-actions">
                      <button
                        className="pill-button secondary"
                        onClick={() => {
                          setSelectedTour(tour.index);
                          setBooking(false);
                        }}
                      >
                        Learn More
                      </button>
                      <button
                        className="pill-button"
                        onClick={() => {
                          setSelectedTour(tour.index);
                          setBooking(true);
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          {visibleTours.length > 1 && (
            <div className="pagination mobile-carousel-pagination tour-pagination">
              {visibleTours.map((tour, index) => (
                <button
                  key={tour.title}
                  type="button"
                  className={tourSlide === index ? 'selected' : ''}
                  aria-label={`Show tour ${index + 1}`}
                  aria-current={tourSlide === index}
                  onClick={() => {
                    const card =
                      toursRef.current?.querySelectorAll<HTMLElement>(
                        '.tour-card',
                      )[index];
                    card?.scrollIntoView({
                      behavior: reducedMotion ? 'auto' : 'smooth',
                      block: 'nearest',
                      inline: 'center',
                    });
                  }}
                />
              ))}
            </div>
          )}
          <MobileSectionLink href="#destinations">
            Explore More
          </MobileSectionLink>
          {!visibleTours.length && (
            <p className="no-results">
              No tours match these options. Try another destination or search
              for Ha Giang, Ho Chi Minh or Da Nang.
            </p>
          )}
        </div>
      </section>
      <section
        className="benefits-section section-container"
        id="why-lazycat"
        data-node-id="709:5715"
      >
        <SectionHeading tag="# Outstanding value" href="#contact">
          Lazy Cat The <em>Best Choice</em>
          <br />
          For Great Experience
        </SectionHeading>
        <div
          className="benefit-list"
          ref={benefitsRef}
          onScroll={(event) => {
            if (!matchMedia('(max-width: 640px)').matches) return;
            const viewport = event.currentTarget;
            const cards = Array.from(
              viewport.querySelectorAll<HTMLElement>('.benefit-card'),
            );
            const center = viewport.scrollLeft + viewport.clientWidth / 2;
            let nearest = 0;
            let distance = Infinity;
            cards.forEach((card, index) => {
              const cardCenter = card.offsetLeft + card.offsetWidth / 2;
              const nextDistance = Math.abs(cardCenter - center);
              if (nextDistance < distance) {
                nearest = index;
                distance = nextDistance;
              }
            });
            setActiveBenefit(nearest);
          }}
          style={
            {
              '--feature-ease': springEase,
              '--feature-duration': `${springDuration}s`,
            } as CSSProperties
          }
          onMouseLeave={() => setActiveBenefit(0)}
        >
          {benefits.map((b, i) => (
            <button
              key={b.title}
              className={`benefit-card ${activeBenefit === i ? 'expanded' : ''}`}
              aria-expanded={activeBenefit === i}
              aria-controls={`benefit-${i}`}
              onMouseEnter={() => setActiveBenefit(i)}
              onFocus={() => setActiveBenefit(i)}
              onClick={(event) => {
                setActiveBenefit(i);
                if (matchMedia('(max-width: 640px)').matches) {
                  event.currentTarget.scrollIntoView({
                    behavior: reducedMotion ? 'auto' : 'smooth',
                    block: 'nearest',
                    inline: 'center',
                  });
                }
              }}
            >
              <h3>{b.title}</h3>
              <p id={`benefit-${i}`} aria-hidden={activeBenefit !== i}>
                {b.body}
              </p>
              <img
                className="benefit-cloud"
                src={src(
                  'services',
                  activeBenefit === i
                    ? 'imgGroup2144769070'
                    : 'imgGroup2144769071',
                )}
                alt=""
              />
              <img
                className="benefit-illustration"
                src={src('services', b.icon)}
                alt=""
              />
              <span className="benefit-more">Learn More</span>
            </button>
          ))}
        </div>
        <div className="pagination mobile-carousel-pagination benefit-pagination">
          {benefits.map((benefit, index) => (
            <button
              key={benefit.title}
              type="button"
              className={activeBenefit === index ? 'selected' : ''}
              aria-label={`Show benefit ${index + 1}`}
              aria-current={activeBenefit === index}
              onClick={() => {
                setActiveBenefit(index);
                benefitsRef.current
                  ?.querySelectorAll<HTMLElement>('.benefit-card')
                  [index]?.scrollIntoView({
                    behavior: reducedMotion ? 'auto' : 'smooth',
                    block: 'nearest',
                    inline: 'center',
                  });
              }}
            />
          ))}
        </div>
        <MobileSectionLink href="#contact">Explore More</MobileSectionLink>
      </section>
      <section
        className="destinations-section section-container"
        id="destinations"
        data-node-id="709:5726"
      >
        <SectionHeading
          tag="# Travel destinations"
          extra={
            <div className="arrow-pair">
              <RoundArrow
                back
                onClick={() => moveDestinations(-1)}
                label="Previous destinations"
              />
              <RoundArrow
                onClick={() => moveDestinations(1)}
                label="Next destinations"
              />
            </div>
          }
        >
          Chose Your <em>Destination</em>
        </SectionHeading>
        <div className="destination-grid" ref={destinationsRef}>
          {[
            'Ho Chi Minh',
            'Ha Noi',
            'Da Nang',
            'Ha Giang',
            'Sapa',
            'Hai Phong',
          ].map((_, position, names) => {
            const i = (position + destinationOffset) % names.length;
            const name = names[i];
            return (
              <button
                className="destination-card"
                key={name}
                data-destination-card={name}
                onClick={() =>
                  showPhoto('destinations', [`imgPic${i || ''}`], 0, name)
                }
              >
                <img
                  src={src('destinations', `imgPic${i || ''}`)}
                  alt={name}
                  width="200"
                  height="200"
                  loading="lazy"
                />
                <span>{name}</span>
              </button>
            );
          })}
        </div>
        <div className="pagination">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              className={i === (destinationOffset + 2) % 5 ? 'selected' : ''}
              aria-label={`Destination group ${i + 1}`}
              onClick={() =>
                moveDestinations(((i + 3) % 5) - destinationOffset)
              }
            />
          ))}
        </div>
      </section>
      <section
        className="reviews-section"
        id="reviews"
        data-node-id="1447:16075"
      >
        <div className="reviews-panel">
          <img
            className="reviews-background"
            src="/assets/reviews-mountains.png"
            alt="Ha Giang mountains"
            loading="lazy"
          />
          <div className="section-container">
            <SectionHeading
              tag="# lazycathagiangloop"
              link="See More 999+ Reviews"
              href="#review-cards"
            >
              Why Our Customers Highly Recommend Us
            </SectionHeading>
            <div
              ref={reviewsRef}
              className="review-slider-wrap"
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setReviewsPaused(true);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === 'mouse') setReviewsPaused(false);
              }}
              onPointerDown={() => setReviewsPaused(true)}
              onPointerUp={() => setReviewsPaused(false)}
              onPointerCancel={() => setReviewsPaused(false)}
              onFocusCapture={() => setReviewsPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setReviewsPaused(false);
              }}
            >
              <Carousel
                className="review-slider"
                id="review-cards"
                opts={{ align: 'start', loop: true }}
                setApi={setReviewApi}
                aria-label="Customer reviews"
              >
                <CarouselContent className="review-grid">
                  {[...reviews, ...reviews].map((r, i) => {
                    const isCopy = i >= reviews.length;
                    return (
                      <CarouselItem
                        className="review-slide"
                        key={`${r.name}-${isCopy ? 'copy' : 'original'}`}
                        aria-hidden={isCopy}
                      >
                        <button
                          className="review-card"
                          tabIndex={isCopy ? -1 : 0}
                          onClick={() => setReviewIndex(i % reviews.length)}
                          aria-label={`Read ${r.name}'s full review`}
                        >
                          <div className="review-author">
                            <img
                              src={src('recommendations', r.avatar)}
                              width="44"
                              height="44"
                              alt=""
                            />
                            <span>
                              <strong>{r.name}</strong>
                              <small>{r.source}</small>
                            </span>
                          </div>
                          <p>{r.text}</p>
                          <span className="stars" aria-label="5 out of 5 stars">
                            {[0, 1, 2, 3, 4].map((star) => (
                              <Icon
                                key={star}
                                section="recommendations"
                                name="imgStar"
                              />
                            ))}
                          </span>
                        </button>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <div className="review-pagination" aria-label="Choose review">
                  {reviews.map((review, index) => (
                    <button
                      key={review.name}
                      type="button"
                      className={reviewSlide === index ? 'selected' : ''}
                      aria-label={`Show review ${index + 1}`}
                      aria-current={reviewSlide === index}
                      onClick={() => reviewApi?.scrollTo(index)}
                    />
                  ))}
                </div>
              </Carousel>
            </div>
            <h3 className="trusted-heading">
              Trusted by <span>10+ companies</span>
            </h3>
            <div className="partner-logos">
              {[
                'Airbnb',
                'Google',
                'Traveloka',
                'GetYourGuide',
                'Tripadvisor',
                'Booking.com',
                'Agoda',
                'Daiichi Travel',
                'Bằng Phấn',
              ].map((name, i) => (
                <div key={name} className={`partner-logo partner-${i}`}>
                  <img
                    src={src('recommendations', `imgRectangle${3464084 + i}`)}
                    alt={name}
                    loading="lazy"
                    width="125"
                    height="125"
                  />
                </div>
              ))}
            </div>
            <MobileSectionLink href="#review-cards">
              See More 999+ Reviews
            </MobileSectionLink>
          </div>
        </div>
      </section>
      <section
        className="food-section section-container"
        id="food-tour"
        data-node-id="1472:19288"
      >
        <SectionHeading tag="# Culinary Experience" href="#moments">
          Ha Giang <em>Food Tour</em>
        </SectionHeading>
        <FoodCarousel>
          {['imgPicture', 'imgPicture1', 'imgPicture2', 'imgPicture3'].map(
            (photo, i) => (
              <button
                key={photo}
                className="food-card"
                onClick={() =>
                  showPhoto(
                    'experiences',
                    ['imgPicture', 'imgPicture1', 'imgPicture2', 'imgPicture3'],
                    i,
                    'This Is Not Your Average Vietnam Tour',
                  )
                }
                aria-label={`View travel poster ${i + 1}`}
              >
                <img
                  src={src('experiences', photo)}
                  width="312"
                  height="555"
                  alt="Travel campaign poster from the Lazy Cat gallery"
                  loading="lazy"
                />
                <span className="video-caption">
                  This Is Not Your Average Vietnam Tour
                  <span>
                    <Icon section="experiences" name="imgPlay" />
                    1:01
                  </span>
                </span>
              </button>
            ),
          )}
        </FoodCarousel>
        <MobileSectionLink href="#moments">Explore More</MobileSectionLink>
      </section>
      <section
        className="moments-section"
        id="moments"
        data-node-id="1472:19187"
      >
        <div className="section-container">
          <SectionHeading
            tag="# Testimonial"
            href="https://www.instagram.com/lazycathagiangloop/"
            link="Explore More Instagram"
          >
            Our <em>Moment</em> We Sharing
          </SectionHeading>
        </div>
        <MomentsGallery
          lightboxOpen={preview !== null}
          onOpen={(index) =>
            showPhoto(
              'moments',
              Array.from({ length: 10 }, (_, x) => `imgImage${x + 1}`),
              index,
              'Our moments on the Ha Giang Loop',
            )
          }
        />
        <MobileSectionLink href="https://www.instagram.com/lazycathagiangloop/">
          Explore More Instagram
        </MobileSectionLink>
      </section>
      <section
        className="news-section section-container"
        id="travel-guide"
        data-node-id="709:5888"
      >
        <SectionHeading tag="# Blog & News" link="Read More" href="#news-cards">
          You May Be <em>Interested</em>
        </SectionHeading>
        <div className="news-grid" id="news-cards">
          {['imgImage3', 'imgImage5', 'imgImage4', 'imgImage'].map(
            (photo, i) => (
              <article className="news-card" key={photo}>
                <button
                  className="news-photo"
                  onClick={() => setArticle(i)}
                  aria-label={`Read ${newsTitle}`}
                >
                  <img
                    src={src('news', photo)}
                    alt="Scenic Vietnam travel destination"
                    width="280"
                    height="198"
                    loading="lazy"
                  />
                </button>
                <div className="news-meta">
                  <span>Minh Tuan</span>
                  <span>|</span>
                  <time dateTime="2024-06-27">27/06/2024</time>
                </div>
                <h3>{newsTitle}</h3>
                <p>{newsBody}</p>
                <button className="news-more" onClick={() => setArticle(i)}>
                  See more
                  <Icon section="news" name="imgArrowNarrowDown" />
                </button>
              </article>
            ),
          )}
        </div>
        <MobileSectionLink href="#news-cards">Read More</MobileSectionLink>
      </section>
      <section className="faq-section" id="faq" data-node-id="709:5900">
        <img
          className="faq-illustration"
          src="/assets/faq-illustration.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <div className="section-container faq-layout">
          <div>
            <p className="eyebrow">
              <Icon section="intro" name="imgBrandLogo" /># Everything you need
            </p>
            <h2>
              <em>Frequently</em> Asked
              <br />
              Questions
            </h2>
          </div>
          <Accordion
            className="faq-list"
            defaultValue={['faq-0']}
            multiple={false}
          >
            {faqQuestions.map((q, i) => (
              <AccordionItem value={`faq-${i}`} key={q}>
                <AccordionTrigger>
                  {q}
                  <Icon section="faq-inner" name="imgBoldArrowsAltArrowDown1" />
                </AccordionTrigger>
                <AccordionContent>
                  {i === 0 ? (
                    'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
                  ) : (
                    <span>
                      Please{' '}
                      <a href="mailto:custumer@lazycat.com">contact Lazy Cat</a>{' '}
                      for more information.
                    </span>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <footer className="footer-wrap" id="contact" data-node-id="1426:7189">
        <div className="site-footer">
          <img
            className="footer-watermark"
            src={src('footer', 'imgLogo')}
            alt=""
            loading="lazy"
          />
          <div className="footer-content section-container">
            <div className="footer-brand">
              <a href="#top">
                <img
                  className="footer-logo"
                  src={src('footer', 'imgGroup1')}
                  alt="Lazy Cat"
                  width="150"
                  height="132"
                  loading="lazy"
                />
              </a>
              <address>
                <p>
                  <Icon section="footer" name="imgLocationOn" />
                  <span>
                    320B Ly Tu Trong Street, Tran Phu Ward, Ha Giang City,
                    Vietnam
                  </span>
                </p>
                <a href="mailto:custumer@lazycat.com">
                  <Icon section="footer" name="imgMail" />
                  custumer@lazycat.com
                </a>
                <a href="tel:+84353979239">
                  <Icon section="footer" name="imgPhoneInTalk" />
                  84 353 979 239
                </a>
              </address>
            </div>
            <div className="footer-column">
              <h3>Information</h3>
              <a className="highlight" href="#about">
                About LazyCat
              </a>
              <a href="#reviews">LazyCat Team</a>
              <a href="mailto:custumer@lazycat.com?subject=Careers">Careers</a>
              <a href="mailto:custumer@lazycat.com">Contact Us</a>
            </div>
            <div className="footer-column">
              <h3>Vietnam Travel Guide</h3>
              {[
                'Vietnam Budget Travel',
                'Vietnam Food Guide',
                'Vietnam Transportation',
                'Vietnam Weather',
                'Vietnam Visa',
                'Best Time to Visit Vietnam',
              ].map((t, i) => (
                <a href={i === 1 ? '#food-tour' : '#travel-guide'} key={t}>
                  {t}
                </a>
              ))}
            </div>
            <div className="footer-column">
              <h3>
                <span className="desktop-footer-only">Support</span>
                <span className="mobile-footer-only">
                  Terms &amp; Conditions
                </span>
              </h3>
              {['Legal Notice', 'Privacy Policy', 'Term and Conditions'].map(
                (t) => (
                  <a
                    className="desktop-footer-only"
                    href={`mailto:custumer@lazycat.com?subject=${encodeURIComponent(t)}`}
                    key={`desktop-${t}`}
                  >
                    {t}
                  </a>
                ),
              )}
              {[
                'Agent Policy',
                'Cancellation Policy',
                'Privacy Policy',
                'Partner Policy',
                'Website Terms',
              ].map((t) => (
                <a
                  className="mobile-footer-only"
                  href={`mailto:custumer@lazycat.com?subject=${encodeURIComponent(t)}`}
                  key={`mobile-${t}`}
                >
                  {t}
                </a>
              ))}
            </div>
            <div className="footer-subscribe">
              <h3>Sign Up for Information</h3>
              <form
                className="newsletter"
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = new FormData(e.currentTarget).get('email');
                  window.location.href = `mailto:custumer@lazycat.com?subject=Newsletter%20subscription&body=${encodeURIComponent(`Please send Lazy Cat news to ${email}.`)}`;
                }}
              >
                <Icon section="footer" name="imgMail1" />
                <input
                  type="email"
                  name="email"
                  aria-label="Email for information"
                  placeholder="Enter your email"
                  required
                />
                <button aria-label="Request information by email">
                  <Icon section="footer" name="imgLinearArrowsArrowRightUp" />
                </button>
              </form>
              <h3>Follow Us</h3>
              <div className="social-links">
                {[
                  ['imgSocialIcon', 'Facebook'],
                  ['imgGroup', 'Instagram'],
                  ['imgSocialIcon1', 'TikTok'],
                ].map(([icon, name]) => (
                  <button
                    key={name}
                    type="button"
                    disabled
                    title={`${name} link has not been provided`}
                    aria-label={`${name} — link coming soon`}
                  >
                    <Icon section="footer" name={icon} />
                  </button>
                ))}
              </div>
              <h3>Accept payment</h3>
              <div className="payment-logos">
                {[
                  ['imgPaymentMethodVisa', 'Visa'],
                  ['imgMastercard', 'Mastercard'],
                  ['imgPayPal', 'PayPal'],
                  ['imgPaymentMethodApplePay', 'Apple Pay'],
                ].map(([icon, name]) => (
                  <span key={icon}>
                    <img
                      src={src('footer', icon)}
                      alt={name}
                      width="47"
                      height="32"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-contact-icons">
            <a
              href="https://wa.me/84353979239"
              target="_blank"
              rel="noreferrer"
              aria-label="Contact via WhatsApp"
            >
              <Icon section="footer" name="imgWhatsapp" />
            </a>
            <a
              href="https://www.instagram.com/lazycathagiangloop/"
              target="_blank"
              rel="noreferrer"
              aria-label="Contact via Instagram"
            >
              <Icon section="footer" name="imgInstagram" />
            </a>
            <a
              href="mailto:custumer@lazycat.com"
              aria-label="Contact via email"
            >
              <Icon section="footer" name="imgGmail" />
            </a>
            <a
              className="round-button to-top"
              href="#top"
              aria-label="Back to top"
            >
              <Icon name="imgIconLeft1" />
            </a>
          </div>
          <div className="copyright">
            <div className="section-container">
              <span>© 2026 Lazy Cat</span>
              <span>
                <a href="#contact">Policy</a>
                <i /> <a href="#contact">Terms of Use</a>
              </span>
            </div>
          </div>
        </div>
      </footer>

      <Dialog
        open={preview !== null}
        onOpenChange={(open) => {
          if (!open) setPreview(null);
        }}
      >
        <DialogContent className="photo-dialog">
          <DialogTitle>{preview?.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Photo gallery. Use the previous and next buttons to explore.
          </DialogDescription>
          {preview && (
            <>
              <img
                className="lightbox-image"
                src={src(preview.section, preview.names[preview.index])}
                alt={preview.title}
              />
              {preview.names.length > 1 && (
                <div className="lightbox-controls">
                  <RoundArrow
                    back
                    label="Previous photo"
                    onClick={() =>
                      setPreview({
                        ...preview,
                        index:
                          (preview.index - 1 + preview.names.length) %
                          preview.names.length,
                      })
                    }
                  />
                  <span aria-live="polite">
                    {preview.index + 1} / {preview.names.length}
                  </span>
                  <RoundArrow
                    label="Next photo"
                    onClick={() =>
                      setPreview({
                        ...preview,
                        index: (preview.index + 1) % preview.names.length,
                      })
                    }
                  />
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={selectedTour !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedTour(null);
        }}
      >
        <DialogContent className="tour-dialog">
          <DialogTitle>
            {selectedTour !== null ? tours[selectedTour].title : ''}
          </DialogTitle>
          <DialogDescription>
            {booking
              ? 'Plan your trip with Lazy Cat. Send your preferred dates to our team.'
              : 'Small-group adventures with Lazy Cat.'}
          </DialogDescription>
          {selectedTour !== null && (
            <>
              <div className="dialog-tour-photo">
                <img
                  src={src('tours', `imgPic${selectedTour * 4 || ''}`)}
                  alt={tours[selectedTour].destination}
                />
              </div>
              <p className="dialog-price">
                $339 <span>/Person</span>
              </p>
              {booking ? (
                <form
                  className="booking-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    const body = `I would like to enquire about ${tours[selectedTour].title}.\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nDate: ${data.get('date')}\nGuests: ${data.get('guests')}`;
                    window.location.href = `mailto:custumer@lazycat.com?subject=${encodeURIComponent('Tour enquiry — ' + tours[selectedTour].title)}&body=${encodeURIComponent(body)}`;
                  }}
                >
                  <label>
                    Your name
                    <input name="name" autoComplete="name" required />
                  </label>
                  <label>
                    Email
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </label>
                  <div>
                    <label>
                      Travel date
                      <input name="date" type="date" required />
                    </label>
                    <label>
                      Guests
                      <NativeSelect name="guests" defaultValue="2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                      </NativeSelect>
                    </label>
                  </div>
                  <button className="pill-button" type="submit">
                    Send Enquiry By Email
                    <Icon section="header" name="imgIconLeft" />
                  </button>
                  <small>
                    Your email app will open. Booking is confirmed directly with
                    Lazy Cat.
                  </small>
                </form>
              ) : (
                <>
                  <ul className="dialog-feature-list">
                    {tours[selectedTour].features.map((f) => (
                      <li key={f}>
                        <Icon section="tours" name="imgFi7776927" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="pill-button"
                    onClick={() => setBooking(true)}
                  >
                    Book Now
                    <Icon section="header" name="imgIconLeft" />
                  </button>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={article !== null}
        onOpenChange={(open) => {
          if (!open) setArticle(null);
        }}
      >
        <DialogContent className="article-dialog">
          <DialogTitle>{newsTitle}</DialogTitle>
          <DialogDescription>Minh Tuan · 27/06/2024</DialogDescription>
          {article !== null && (
            <img
              src={src(
                'news',
                ['imgImage3', 'imgImage5', 'imgImage4', 'imgImage'][article],
              )}
              alt="Vietnam travel scenery"
            />
          )}
          <p>{newsBody}</p>
        </DialogContent>
      </Dialog>
      <Dialog
        open={reviewIndex !== null}
        onOpenChange={(open) => {
          if (!open) setReviewIndex(null);
        }}
      >
        <DialogContent className="review-dialog">
          <DialogTitle>
            {reviewIndex !== null ? reviews[reviewIndex].name : ''}
          </DialogTitle>
          <DialogDescription>
            {reviewIndex !== null ? reviews[reviewIndex].source : ''}
          </DialogDescription>
          <p>{reviewIndex !== null ? reviews[reviewIndex].text : ''}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
