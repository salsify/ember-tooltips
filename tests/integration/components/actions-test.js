import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Option | actions', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('ember-tooltip calls lifecycle actions', async function(assert) {

    assert.expect(14);

    const actionsCalledHash = {
      onRenderFoo: 0,
      onShowBar: 0,
      onHideBaz: 0,
      onDestroyFubar: 0,
    };

    /* Setup the actions and handlers... */

    Object.keys(actionsCalledHash).forEach((action) => {
      this.set(action, (arg) => {
        assert.ok(true, `Should call ${action}`);

        /* Count the calls... */

        actionsCalledHash[action]++;

        assert.ok(arg.classNames.join(' ').indexOf('ember-tooltip-base') > -1);
      });
    });

    /* Now, let's go through the component lifecycle */

    await render(hbs`
      {{#unless destroyTooltip}}
        {{ember-tooltip
          onRender=(action onRenderFoo)
          onShow=(action onShowBar)
          onHide=(action onHideBaz)
          onDestroy=(action onDestroyFubar)
        }}
      {{/unless}}
    `);

    const { element } = this;

    assert.equal(actionsCalledHash.onRenderFoo, 0,
      'Should not have called render');

    /* Check render */

    await triggerEvent(element, 'mouseenter');

    assert.equal(actionsCalledHash.onRenderFoo, 1,
      'Should have called render');

    /* Check show */

    assert.equal(actionsCalledHash.onShowBar, 1,
      'Should have called show');

    assert.equal(actionsCalledHash.onHideBaz, 0,
      'Should not have called hide');

    await triggerEvent(element, 'mouseleave');

    assert.equal(actionsCalledHash.onHideBaz, 1,
      'Should have called hide');

    /* Check destroy */

    this.set('destroyTooltip', true);

    assert.equal(actionsCalledHash.onDestroyFubar, 1,
      'Should have called destroy');

  });

  test('ember-tooltip supports lifecycle closure actions with multiple arguments', async function(assert) {

    /* Closure actions allow you to pass multiple parameters
    when you declare the action variable. This test covers that case.
    */

    assert.expect(1);

    let onRenderPassword;

    this.actions.onRenderFoo = (trickPassword, realPassword) => {
      onRenderPassword = realPassword;
    };

    await render(hbs`
      {{ember-tooltip
        onRender=(action 'onRenderFoo' 'trick password' 'real password')
      }}
    `);

    const { element } = this;

    await triggerEvent(element, 'mouseenter');

    assert.equal(onRenderPassword, 'real password',
      'tooltip should support closure actions with multiple arguments');

  });
});
