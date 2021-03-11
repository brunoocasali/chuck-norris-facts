import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('HighlightHelper', function (hooks) {
  setupRenderingTest(hooks);

  test('does not change text when it has no reserved words', async function (assert) {
    this.set('data', 'lorem ipsum');
    this.set('words', []);

    await render(hbs`{{highlight this.data this.words}}`);

    assert.equal(this.element.textContent.trim(), 'lorem ipsum');
  });

  test('changes text with wrappers when it have reserved words', async function (assert) {
    this.set('data', 'mussum ipsum, cacilds vidis litro abertis');
    this.set('words', ['cacilds', 'mussum']);

    await render(hbs`{{highlight this.data this.words}}`);

    assert.equal(
      this.element.innerHTML.trim(),
      `<mark>mussum</mark> ipsum, <mark>cacilds</mark> vidis litro abertis`
    );
  });

  test('does matching is case insensitive', async function (assert) {
    this.set('data', 'musSum ipsum, CAcilds vidis litro abertis');
    this.set('words', ['cacilds', 'mussum']);

    await render(hbs`{{highlight this.data this.words}}`);

    assert.equal(
      this.element.innerHTML.trim(),
      `<mark>musSum</mark> ipsum, <mark>CAcilds</mark> vidis litro abertis`
    );
  });
});
