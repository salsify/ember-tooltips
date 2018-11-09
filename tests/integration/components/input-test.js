import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import {
  assertTooltipNotVisible,
  assertTooltipNotRendered,
	assertTooltipVisible,
} from '@salsify/ember-tooltips/test-support';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | click', function(hooks) {
  setupRenderingTest(hooks);

  test('Tooltip: focusin/click input, click input', async function(assert) {

    assert.expect(3);

    await render(hbs`
      <input id="some-input">
      {{ember-tooltip event="click" targetId="some-input" enableLazyRendering=true}}
    `);

    const [ tooltipTarget ] = this.$('#some-input');

    assertTooltipNotRendered(assert);

    /* We intentionally trigger a focusin and click on the $tooltipTarget because
    when a user clicks an input both events occur in that order.
    We have fixed this with _isInProcessOfShowing and this test protects that. */

    await triggerEvent(tooltipTarget, 'focusin');
    await triggerEvent(tooltipTarget, 'click');

    assertTooltipVisible(assert);

    await triggerEvent(tooltipTarget, 'click');

    assertTooltipNotVisible(assert);
  });
});
