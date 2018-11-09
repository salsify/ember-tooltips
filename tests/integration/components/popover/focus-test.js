import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  assertTooltipNotVisible,
  assertTooltipNotRendered,
  assertTooltipVisible,
  findTooltip,
} from 'ember-tooltips/test-support';

// const MS_FOR_BLUR = 100;

module('Integration | Option | focus', function(hooks) {
  setupRenderingTest(hooks);

  test('Popover: target focus, popover focus, popover blur', async function(assert) {
    assert.expect(4);

    await render(hbs`{{ember-popover event='focus' popoverHideDelay=0}}`);

    assertTooltipNotRendered(assert);

    await triggerEvent(this.element, 'focus');

    const [ popover ] = findTooltip();

    assertTooltipVisible(assert);

    await triggerEvent(popover, 'focusin');

    assertTooltipVisible(assert);

    await triggerEvent(popover, 'focusout');

    assertTooltipNotVisible(assert);
  });

  test('Popover: target focus, target-interior focus, popover focus, popover blur', async function(assert) {
    assert.expect(4);

    await render(hbs`
      <a href class="target-interior"></a>
      {{ember-popover event='focus' popoverHideDelay=0}}
    `);

    assertTooltipNotRendered(assert);

    await triggerEvent(this.element, 'focus');

    const [ popover ] = findTooltip();

    await triggerEvent('.target-interior', 'focus');

    assertTooltipVisible(assert);

    await triggerEvent(popover, 'focus');

    assertTooltipVisible(assert);

    await triggerEvent(popover, 'focusout');

    assertTooltipNotVisible(assert);
  });

  test('Popover: target focus, popover focus, popover-interior focus, popover blur', async function(assert) {
    assert.expect(5);

    await render(hbs`
      {{#ember-popover event='focus' popoverHideDelay=0}}
        <a href class="popover-interior"></a>
      {{/ember-popover}}
    `);

    assertTooltipNotRendered(assert);

    await triggerEvent(this.element, 'focus');

    const [ popover ] = findTooltip();

    assertTooltipVisible(assert);

    await triggerEvent(popover, 'focus');

    assertTooltipVisible(assert);

    await triggerEvent('.popover-interior', 'focus');

    assertTooltipVisible(assert);

    await triggerEvent(popover, 'focusout');

    assertTooltipNotVisible(assert);
  });

  test('Popover: input focus, input blur', async function(assert) {
    assert.expect(3);

    await render(hbs`
      <input id="some-input">
      {{ember-popover event='focus' targetId='some-input' popoverHideDelay=0}}
    `);

    const [ popoverTarget ] = this.$('#some-input');

    assertTooltipNotRendered(assert);

    await triggerEvent(popoverTarget, 'focus');

    assertTooltipVisible(assert);

    await triggerEvent(popoverTarget, 'blur');

    assertTooltipNotVisible(assert);
  });
});
