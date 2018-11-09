import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotRendered,
  assertTooltipVisible,
} from '@salsify/ember-tooltips/test-support';

module('Integration | Option | delayOnChange', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip animates with a delay', async function(assert) {

    assert.expect(2);

    /* Create two tooltips and show one */

    await render(hbs`
      {{ember-tooltip delay=300 delayOnChange=false tooltipClassName='ember-tooltip test-tooltip' text='Hey'}}
      {{ember-tooltip delayOnChange=false isShown=true event='none' text='Hi'}}
    `);

    await settled();

    assertTooltipNotRendered(assert, { selector: '.test-tooltip' });

    /* We still need a small delay, but now we check the
    test tooltip is shown *almost* immediately after hover
    instead of after a 300ms delay */

    triggerEvent(this.element, 'mouseenter');

    await settled();

    assertTooltipVisible(assert, { selector: '.test-tooltip' });
  });
});
