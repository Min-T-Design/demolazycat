'use client';
import { useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import {
  Building2,
  Landmark,
  MapPin,
  Minus,
  Mountain,
  Navigation,
  Plus,
  Search,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
} from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import assets from '@/lib/figma-assets.json';
import {
  dateValue,
  emptyGuests,
  guestSummary,
  updateGuests,
  type Guests,
} from '@/lib/trip-search';

const destinationOptions = [
  {
    name: 'Nearby',
    hint: "Find what's around you",
    Icon: Navigation,
  },
  {
    name: 'Ha Giang, Vietnam',
    hint: 'For the legendary mountain loop',
    Icon: Mountain,
  },
  {
    name: 'Ho Chi Minh City, Vietnam',
    hint: 'For markets, food and hidden gems',
    Icon: Building2,
  },
  {
    name: 'Da Nang, Vietnam',
    hint: 'For beaches and the Golden Bridge',
    Icon: Landmark,
  },
  {
    name: 'Ha Noi, Vietnam',
    hint: 'For heritage streets and local food',
    Icon: Building2,
  },
  {
    name: 'Sapa, Vietnam',
    hint: 'For terraces and mountain villages',
    Icon: Mountain,
  },
];

export function TripSearchFields() {
  const [open, setOpen] = useState<'destination' | 'dates' | 'guests' | null>(
    null,
  );
  const [destination, setDestination] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [range, setRange] = useState<DateRange>();
  const [today, setToday] = useState(
    () => new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [compact, setCompact] = useState(false);
  const [mode, setMode] = useState('dates');
  const [flex, setFlex] = useState(0);
  const [months, setMonths] = useState<string[]>([]);
  const [guests, setGuests] = useState<Guests>(emptyGuests);
  useEffect(() => {
    setToday(new Date(new Date().setHours(0, 0, 0, 0)));
    const media = matchMedia('(max-width: 700px)');
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  const shortDate = (date: Date) =>
    date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const dateLabel =
    mode === 'flexible'
      ? months.length
        ? months.join(', ')
        : 'Any dates'
      : range?.from
        ? `${shortDate(range.from)}${range.to ? ` – ${shortDate(range.to)}` : ' – Check out'}${flex ? ` (±${flex} days)` : ''}`
        : 'Add dates';
  const filteredDestinations = destinationOptions.filter(({ name, hint }) =>
    `${name} ${hint}`.toLowerCase().includes(destinationQuery.toLowerCase()),
  );
  return (
    <>
      <Popover
        open={open === 'destination'}
        onOpenChange={(value) => {
          setOpen(value ? 'destination' : null);
          if (!value) setDestinationQuery('');
        }}
      >
        <PopoverTrigger type="button" className="trip-field">
          <img
            src="/assets/hero-location-on.svg"
            alt=""
            width={32}
            height={32}
          />
          <span>
            <span>Where</span>
            <span
              className={destination ? 'trip-value chosen' : 'trip-value'}
            >
              {destination || 'Search destination'}
            </span>
          </span>
        </PopoverTrigger>
        <PopoverContent
          className="trip-popover destination-popover"
          align="start"
          sideOffset={12}
        >
          <PopoverTitle className="destination-title">
            Suggested destinations
          </PopoverTitle>
          <label className="destination-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search destinations</span>
            <input
              value={destinationQuery}
              onChange={(event) => setDestinationQuery(event.target.value)}
              placeholder="Search destinations"
              autoComplete="off"
            />
          </label>
          <div className="destination-options" role="listbox">
            {filteredDestinations.map(({ name, hint, Icon }, index) => (
              <button
                key={name}
                type="button"
                role="option"
                aria-selected={destination === name}
                onClick={() => {
                  setDestination(name);
                  setDestinationQuery('');
                  setOpen(null);
                }}
              >
                <span className={`destination-option-icon tone-${index % 4}`}>
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span>
                  <strong>{name}</strong>
                  <small>{hint}</small>
                </span>
              </button>
            ))}
            {!filteredDestinations.length && (
              <p className="destination-empty">
                <MapPin size={20} aria-hidden="true" />
                No matching destinations
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <input type="hidden" name="destination" value={destination} />
      <Popover
        open={open === 'dates'}
        onOpenChange={(value) => setOpen(value ? 'dates' : null)}
      >
        <PopoverTrigger type="button" className="trip-field">
          <img
            src={assets.hero.imgCalendarMonth}
            alt=""
            width={32}
            height={32}
          />
          <span>
            <span>Check In-Out</span>
            <span
              className={
                range?.from || months.length
                  ? 'trip-value chosen'
                  : 'trip-value'
              }
            >
              {dateLabel}
            </span>
          </span>
        </PopoverTrigger>
        <PopoverContent className="trip-popover dates-popover" sideOffset={16}>
          <PopoverTitle className="sr-only">Choose travel dates</PopoverTitle>
          <Tabs value={mode} onValueChange={(value) => setMode(String(value))}>
            <TabsList className="trip-date-tabs">
              <TabsTrigger value="dates">Dates</TabsTrigger>
              <TabsTrigger value="flexible">Flexible</TabsTrigger>
            </TabsList>
            <TabsContent value="dates">
              <p className="date-instruction" aria-live="polite">
                {range?.from && !range.to
                  ? 'Choose your check-out date'
                  : 'Choose your check-in and check-out dates'}
              </p>
              <Calendar
                className="trip-calendar"
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={compact ? 1 : 2}
                disabled={{ before: today }}
                startMonth={today}
                weekStartsOn={1}
                showOutsideDays={false}
                min={1}
              />
              <div className="date-flex-options" aria-label="Date flexibility">
                {[0, 1, 2, 3, 7, 14].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={flex === value}
                    onClick={() => setFlex(value)}
                  >
                    {value
                      ? `± ${value} day${value > 1 ? 's' : ''}`
                      : 'Exact dates'}
                  </button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="flexible">
              <h3 className="flex-heading">When would you like to go?</h3>
              <p className="date-instruction">
                Choose one or more months, or leave open for any dates.
              </p>
              <div className="flex-months">
                {Array.from({ length: 12 }, (_, i) => {
                  const date = new Date(
                    today.getFullYear(),
                    today.getMonth() + i,
                    1,
                  );
                  const label = date.toLocaleDateString('en-GB', {
                    month: 'short',
                    year: 'numeric',
                  });
                  return (
                    <button
                      type="button"
                      key={label}
                      aria-pressed={months.includes(label)}
                      onClick={() =>
                        setMonths((old) =>
                          old.includes(label)
                            ? old.filter((item) => item !== label)
                            : [...old, label],
                        )
                      }
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
          <div className="trip-popover-footer">
            <button
              type="button"
              className="trip-clear"
              onClick={() => {
                setRange(undefined);
                setFlex(0);
                setMonths([]);
              }}
            >
              Clear dates
            </button>
            <button
              type="button"
              className="trip-done"
              onClick={() => setOpen(null)}
              disabled={mode === 'dates' && !!range?.from && !range.to}
            >
              Done
            </button>
          </div>
        </PopoverContent>
      </Popover>
      <Popover
        open={open === 'guests'}
        onOpenChange={(value) => setOpen(value ? 'guests' : null)}
      >
        <PopoverTrigger type="button" className="trip-field">
          <img src={assets.hero.imgGroup} alt="" width={32} height={32} />
          <span>
            <span>Who</span>
            <span
              className={guests.adults ? 'trip-value chosen' : 'trip-value'}
            >
              {guestSummary(guests)}
            </span>
          </span>
        </PopoverTrigger>
        <PopoverContent
          className="trip-popover guests-popover"
          align="end"
          sideOffset={16}
        >
          <PopoverTitle className="sr-only">Who is coming?</PopoverTitle>
          {(
            [
              ['adults', 'Adults', 'Ages 13 or above'],
              ['children', 'Children', 'Ages 2–12'],
              ['infants', 'Infants', 'Under 2'],
              ['pets', 'Pets', 'Contact us to confirm suitability'],
            ] as const
          ).map(([key, title, hint]) => (
            <div className="guest-counter" key={key}>
              <div>
                <strong>{title}</strong>
                <p>{hint}</p>
              </div>
              <div className="guest-stepper">
                <button
                  type="button"
                  aria-label={`Remove ${title.toLowerCase()}`}
                  disabled={
                    guests[key] === 0 ||
                    (key === 'adults' &&
                      guests.adults === 1 &&
                      !!(guests.children || guests.infants || guests.pets))
                  }
                  onClick={() => setGuests((old) => updateGuests(old, key, -1))}
                >
                  <Minus size={18} aria-hidden="true" />
                </button>
                <output aria-label={title} aria-live="polite">
                  {guests[key]}
                </output>
                <button
                  type="button"
                  aria-label={`Add ${title.toLowerCase()}`}
                  onClick={() => setGuests((old) => updateGuests(old, key, 1))}
                >
                  <Plus size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
          <div className="trip-popover-footer">
            <button
              type="button"
              className="trip-clear"
              onClick={() => setGuests(emptyGuests)}
            >
              Clear guests
            </button>
            <button
              type="button"
              className="trip-done"
              onClick={() => setOpen(null)}
            >
              Done
            </button>
          </div>
        </PopoverContent>
      </Popover>
      <input
        type="hidden"
        name="checkIn"
        value={mode === 'dates' ? dateValue(range?.from) : ''}
      />
      <input
        type="hidden"
        name="checkOut"
        value={mode === 'dates' ? dateValue(range?.to) : ''}
      />
      <input type="hidden" name="datePreference" value={dateLabel} />
      <input
        type="hidden"
        name="guests"
        value={guests.adults ? guestSummary(guests) : ''}
      />
    </>
  );
}
