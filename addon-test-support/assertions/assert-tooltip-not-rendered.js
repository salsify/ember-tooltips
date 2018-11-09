import { findTooltip } from 'ember-tooltips/test-support';

export default function assertTooltipNotRendered(assert, options = {}) {
  const { selector } = options;
  const $tooltip = findTooltip(selector);

  assert.equal($tooltip.length, 0, 'assertTooltipNotRendered(): the ember-tooltip should not be rendered');
}
