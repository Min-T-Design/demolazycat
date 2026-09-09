import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clampPhotoOffset, horizontalDrag } from '../lib/drag.ts';

test('tour photo dragging stays between the first and last photo', () => {
  assert.equal(clampPhotoOffset(-999, 276), -228);
  assert.equal(clampPhotoOffset(999, 366), 0);
  assert.equal(clampPhotoOffset(-18, 276), -18);
  assert.equal(clampPhotoOffset(-999, 240), -264);
  assert.equal(clampPhotoOffset(-100, 600), 0);
});
test('small taps and vertical page swipes are not horizontal drags', () => {
  assert.equal(horizontalDrag(4, 1), false);
  assert.equal(horizontalDrag(8, 20), false);
  assert.equal(horizontalDrag(-20, 2), true);
  assert.equal(horizontalDrag(20, 2), true);
});
