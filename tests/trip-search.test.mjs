import test from 'node:test';
import assert from 'node:assert/strict';
import {
  emptyGuests,
  updateGuests,
  guestSummary,
  dateValue,
} from '../lib/trip-search.ts';
test('guest counters never go negative and children require an adult', () => {
  assert.deepEqual(updateGuests(emptyGuests, 'adults', -1), emptyGuests);
  const family = updateGuests(emptyGuests, 'children', 1);
  assert.equal(family.adults, 1);
  assert.equal(updateGuests(family, 'adults', -1).adults, 1);
  assert.equal(guestSummary(family), '2 guests');
  assert.equal(guestSummary(emptyGuests), 'Add guests');
});
test('infants and pets are separate from guest count', () => {
  assert.equal(
    guestSummary({ adults: 2, children: 1, infants: 1, pets: 1 }),
    '3 guests, 1 infant, 1 pet',
  );
});
test('date values retain the local calendar date', () => {
  assert.equal(dateValue(new Date(2026, 0, 2)), '2026-01-02');
  assert.equal(dateValue(), '');
});
