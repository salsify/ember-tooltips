import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
} from '@salsify/ember-tooltips/test-support';

module('Integration | Option | event', function(hooks) {
  setupRenderingTest(hooks);

  test('Popover: never shows with none', async function(assert) {

    assert.expect(4);

    await render(hbs`{{ember-popover event='none'}}`);

    const [ popoverTarget ] = this.$();

    assertTooltipNotRendered(assert);

    /* Check focus */

    await triggerEvent(popoverTarget, 'focus');

    assertTooltipNotRendered(assert);

    /* Check hover */

    await triggerEvent(popoverTarget, 'mouseenter');

    assertTooltipNotRendered(assert);

    /* Check click */

    await triggerEvent(popoverTarget, 'click');

    assertTooltipNotRendered(assert);
  });
});
