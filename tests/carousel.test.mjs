import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advanceCard, cardOffset, INTRO_CARD_COUNT } from '../lib/carousel.ts';

test('exactly one centered card and two visible neighbors in every state', () => {
  for (let active = 0; active < INTRO_CARD_COUNT; active++) {
    const positions = Array.from({ length: INTRO_CARD_COUNT }, (_, i) =>
      cardOffset(i, active),
    );
    assert.equal(positions[active], 0);
    assert.deepEqual(
      [...positions].sort((a, b) => a - b),
      [-2, -1, 0, 1, 2],
    );
    assert.equal(
      positions.filter((position) => Math.abs(position) < 2).length,
      3,
    );
  }
});
test('next shrinks center left and brings right neighbor into center, including wrap', () => {
  for (let current = 0; current < INTRO_CARD_COUNT; current++) {
    const next = advanceCard(current, 1);
    assert.equal(cardOffset(next, current), 1);
    assert.equal(cardOffset(current, next), -1);
    assert.equal(cardOffset(next, next), 0);
    assert.equal(advanceCard(next, -1), current);
  }
});
test('five forward or backward steps return to the starting card', () => {
  for (const step of [-1, 1]) {
    let active = 1;
    for (let i = 0; i < 5; i++) active = advanceCard(active, step);
    assert.equal(active, 1);
  }
});
