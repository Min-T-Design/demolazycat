export type Guests = {
  adults: number;
  children: number;
  infants: number;
  pets: number;
};
export const emptyGuests: Guests = {
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
};
export function updateGuests(
  current: Guests,
  key: keyof Guests,
  delta: number,
): Guests {
  const next = { ...current, [key]: Math.max(0, current[key] + delta) };
  if (key !== 'adults' && delta > 0 && !next.adults) next.adults = 1;
  if (!next.adults && (next.children || next.infants || next.pets))
    next.adults = 1;
  return next;
}
export function guestSummary(guests: Guests) {
  const count = guests.adults + guests.children;
  return (
    [
      count ? `${count} guest${count === 1 ? '' : 's'}` : '',
      guests.infants
        ? `${guests.infants} infant${guests.infants === 1 ? '' : 's'}`
        : '',
      guests.pets ? `${guests.pets} pet${guests.pets === 1 ? '' : 's'}` : '',
    ]
      .filter(Boolean)
      .join(', ') || 'Add guests'
  );
}
export function dateValue(date?: Date) {
  return date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    : '';
}
