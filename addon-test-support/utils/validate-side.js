import { assert as emberAssert } from '@ember/debug';

export default function validateSide(side, testHelper = 'assertTooltipSide') {
  const sideIsValid = (
    side === 'top' ||
    side === 'right' ||
    side === 'bottom' ||
    side === 'left'
  );

  /* We make sure the side being tested is valid. We
  use Ember.assert because assert is passed in from QUnit */

  if (!sideIsValid) {
    emberAssert(`You must pass side like ${testHelper}(assert, { side: 'top' }); Valid options for side are top, right, bottom, and left.`);
  }
}
