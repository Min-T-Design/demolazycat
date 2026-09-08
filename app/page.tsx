'use client';
import { useState } from 'react';
import assets from '@/lib/figma-assets.json';
import SiteSections from './site-sections';
import { IntroCarousel } from './motion-gallery';
import { NativeSelect } from '@/components/ui/native-select';
const assetMap = assets as Record<string, Record<string, string>>;
function asset(section: string, name: string) {
  return assetMap[section]?.[name];
}
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
      src={asset(section, name)}
      alt=""
      aria-hidden="true"
      width="24"
      height="24"
    />
  );
}
function Button({
  children,
  href = '#tours',
  secondary = false,
}: {
  children: React.ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <a className={`pill-button ${secondary ? 'secondary' : ''}`} href={href}>
      {children}
      <Icon section={secondary ? 'hero' : 'header'} name="imgIconLeft" />
    </a>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <Icon section="intro" name="imgBrandLogo" />
      {children}
    </p>
  );
}
function Arrow({
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
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [duration, setDuration] = useState('');
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <a href="#top" aria-label="Lazy Cat home">
          <img
            className="brand-logo"
            src={asset('header', 'imgLogo')}
            width="78"
            height="68"
            alt="Lazy Cat — Stay. Ride. Explore."
          />
        </a>
        <nav
          className={menuOpen ? 'main-nav open' : 'main-nav'}
          aria-label="Main navigation"
          onClick={() => setMenuOpen(false)}
        >
          <a className="active" href="#tours">
            Ha Giang Loop Tour
          </a>
          <a href="#destinations">
            Vietnam Tour
            <Icon section="header" name="imgMediaIcon" />
          </a>
          <a href="#contact">Transportations</a>
          <a href="#travel-guide">Vietnam Travel Guide</a>
          <a href="#contact">Contact Us</a>
        </nav>
        <div className="header-actions">
          <form
            className="header-search"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(
                String(new FormData(e.currentTarget).get('query') ?? ''),
              );
              setDuration('');
              document.getElementById('tours')?.scrollIntoView();
            }}
          >
            <input
              name="query"
              aria-label="Search tours"
              placeholder="Search..."
            />
            <button aria-label="Search">
              <Icon section="header" name="imgSearchMd" />
            </button>
          </form>
          <a
            className="utility-button"
            href="#contact"
            aria-label="Language support"
          >
            <Icon section="header" name="imgLanguage" />
          </a>
          <a
            className="utility-button bag"
            href="#tours"
            aria-label="View selected tour"
          >
            <Icon section="header" name="imgGroup" />
            <span>1</span>
          </a>
          <Button>Book Now</Button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-label="Discover Ha Giang">
          <div className="hero-backdrop">
            <img
              src={asset('hero', 'imgBanner')}
              width="1664"
              height="840"
              alt="Sunlit mountains and rice terraces in northern Vietnam"
              fetchPriority="high"
            />
            <div className="hero-tint" />
          </div>
          <div className="hero-art" aria-hidden="true">
            <img
              className="hero-circle"
              src={asset('hero', 'imgEllipse971')}
              alt=""
            />
            <img
              className="hero-people"
              src={asset('hero', 'imgPeople')}
              alt=""
            />
          </div>
          <div className="hero-content">
            <Eyebrow># lazycathagiangloop</Eyebrow>
            <h1>
              Discover New Places,
              <br />
              Create Lasting Memories
            </h1>
            <p className="hero-description">
              Experience Vietnam's most spectacular mountain scenery on our
              award-winning motorbike tours through the northern frontier.
            </p>
            <div className="button-row">
              <Button>Book A Tour</Button>
              <Button secondary>Explore Tours</Button>
            </div>
          </div>
          <div className="hero-doodles" aria-hidden="true">
            {['imgVector1', 'imgVector2', 'imgVector3'].map((n) => (
              <img key={n} src={asset('hero', n)} alt="" />
            ))}
          </div>
          <div className="hero-controls">
            <a
              className="round-button back"
              href="#about"
              aria-label="Explore the previous travel story"
            >
              <Icon name="imgIconLeft1" />
            </a>
            <a
              className="round-button"
              href="#tours"
              aria-label="Explore tours"
            >
              <Icon name="imgIconLeft1" />
            </a>
          </div>
          <form
            className="tour-search"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery('');
              setDuration(
                String(new FormData(e.currentTarget).get('duration') ?? ''),
              );
              document.getElementById('tours')?.scrollIntoView();
            }}
          >
            <label>
              <Icon name="imgAlarm" />
              <span>
                <span>All Duration</span>
                <NativeSelect name="duration" defaultValue="">
                  <option value="">Add duration</option>
                  <option>2 Days 1 Night</option>
                  <option>3 Days 2 Nights</option>
                  <option>4 Days 3 Nights</option>
                </NativeSelect>
              </span>
            </label>
            <label>
              <Icon name="imgCalendarMonth" />
              <span>
                <span>Check In-Out</span>
                <input
                  aria-label="Check-in date"
                  placeholder="Add dates"
                  onFocus={(e) => (e.currentTarget.type = 'date')}
                  onBlur={(e) => {
                    if (!e.currentTarget.value) e.currentTarget.type = 'text';
                  }}
                  name="date"
                />
              </span>
            </label>
            <label>
              <Icon name="imgGroup" />
              <span>
                <span>Who</span>
                <NativeSelect name="guests" defaultValue="">
                  <option value="">Add guest</option>
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                  <option>5–8 guests</option>
                </NativeSelect>
              </span>
            </label>
            <div className="search-action">
              <button className="pill-button" type="submit">
                Search
                <Icon name="imgSearchMd" />
              </button>
            </div>
          </form>
        </section>
        <section className="intro section-container" id="about">
          <div className="intro-copy">
            <Eyebrow># lazycathagiangloop</Eyebrow>
            <h2>
              Your Best Moments Are
              <br />
              Our Favourite <em>Memories</em>
            </h2>
            <p>
              <strong>Lazy Cat Homestay</strong> is a cozy and welcoming place
              to stay in the heart of Ha Giang, ideal for travelers who want to
              explore the famous Ha Giang Loop in comfort and style.
              #lazycathagiangloop
            </p>
            <div className="button-row">
              <Button href="#contact">About Lazy Cat</Button>
              <Button secondary>Explore Tours</Button>
            </div>
          </div>
          <IntroCarousel />
        </section>
        <SiteSections query={query} duration={duration} />
      </main>
    </>
  );
}
