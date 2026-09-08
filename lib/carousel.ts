export const INTRO_CARD_COUNT = 5;

export function advanceCard(current: number, step: number) {
  return (
    (((current + step) % INTRO_CARD_COUNT) + INTRO_CARD_COUNT) %
    INTRO_CARD_COUNT
  );
}

export function cardOffset(index: number, active: number) {
  return advanceCard(index - active, 2) - 2;
}
