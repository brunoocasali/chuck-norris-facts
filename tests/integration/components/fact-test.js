import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('FactComponent', function (hooks) {
  setupRenderingTest(hooks);

  test(`renders data's value`, async function (assert) {
    this.set('data', { value: 'lorem ipsum' });

    await render(hbs`<Fact @data={{this.data}} />`);

    assert.equal(this.element.children.length, 1);
    assert.equal(
      this.element.querySelector('.qa-fact-value').innerText,
      'lorem ipsum'
    );
    assert.equal(
      this.element.querySelector('.qa-fact-author').innerText,
      '— Someone about Chuck Norris'
    );
  });

  module('without @data', function () {
    test(`renders data's value`, async function (assert) {
      await render(hbs`<Fact />`);

      assert.equal(this.element.children.length, 0);
    });
  });
});
