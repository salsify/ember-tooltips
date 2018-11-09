import { findTooltip } from '@salsify/ember-tooltips/test-support';

export default function assertTooltipNotVisible(assert, options = {}) {
  const { selector } = options;
  const $tooltip = findTooltip(selector);
  const ariaHidden = $tooltip.attr('aria-hidden');

  assert.ok(ariaHidden === 'true',
    `assertTooltipNotVisible(): the ember-tooltip shouldn't be visible:
      aria-hidden = ${ariaHidden}`);
}
