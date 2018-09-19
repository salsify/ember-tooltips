import { later } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipRendered,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  triggerTooltipTargetEvent,
  assertTooltipVisible,
} from 'dummy/tests/helpers/ember-tooltips';

async function testTooltipDelay(assert, template) {

  render(template);

  assertTooltipNotRendered(assert);

  triggerTooltipTargetEvent(this.$(), 'mouseenter');

  /* Check the tooltip is not rendered until the delay */

  later(() => {
    assertTooltipNotRendered(assert);
  }, 250);

  await settled();

  /* Check the tooltip is shown after the delay */

  assertTooltipRendered(assert);
  assertTooltipVisible(assert);

  /* Check the tooltip still hides immediately when it's supposed to be hidden */

  triggerTooltipTargetEvent(this.$(), 'mouseleave');

  await settled();

  assertTooltipNotVisible(assert);
}

module('Integration | Option | delay', function(hooks) {
  setupRenderingTest(hooks);

  test('ember-tooltip animates with delay passed as a number', async function(assert) {
    assert.expect(5);
    testTooltipDelay.call(this, assert, hbs`{{ember-tooltip delay=300}}`);
  });

  test('ember-tooltip animates with delay passed as a string', async function(assert) {
    assert.expect(5);
    testTooltipDelay.call(this, assert, hbs`{{ember-tooltip delay='300'}}`);
  });
});
