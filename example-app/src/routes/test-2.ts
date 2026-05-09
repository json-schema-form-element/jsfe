// import '@awesome.me/webawesome/dist/components/input/input.js';
// import '@awesome.me/webawesome/dist/components/number-input/number-input.js';
// import '@awesome.me/webawesome/dist/components/textarea/textarea.js';

// import '@awesome.me/webawesome/dist/components/radio/radio.js';

// import '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';

// import '@awesome.me/webawesome/dist/components/slider/slider.js';

// // import '@awesome.me/webawesome/dist/components/rating/rating.js';

// import '@awesome.me/webawesome/dist/components/select/select.js';
// import '@awesome.me/webawesome/dist/components/option/option.js';

// import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
// import '@awesome.me/webawesome/dist/components/switch/switch.js';

// import '@awesome.me/webawesome/dist/components/color-picker/color-picker.js';

// // Array
// import '@awesome.me/webawesome/dist/components/card/card.js';
// import '@awesome.me/webawesome/dist/components/tag/tag.js';

// import '@awesome.me/webawesome/dist/components/card/card.js';
// import '@awesome.me/webawesome/dist/components/icon/icon.js';
// import '@awesome.me/webawesome/dist/components/divider/divider.js';
// import '@awesome.me/webawesome/dist/components/button-group/button-group.js';
// import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';
// import '@awesome.me/webawesome/dist/components/button/button.js';

import { defineRoute } from '@gracile/gracile/route';
import { html } from '@gracile/gracile/server-html';

import { document } from '../document.js';

import { schema, data, ui } from '../fixtures/all-features.js';
import { JsonSchemaFormWebawesome } from '@jsfe/webawesome';
import { unsafeCSS } from 'lit';

import styles from '@jsfe/webawesome/styles.css?inline';

(class extends JsonSchemaFormWebawesome {
	static override styles = [unsafeCSS(styles)];
}).define();

export default defineRoute({
	handler: {
		GET: ({ url /* locals */ }) => {
			return {
				// ...locals,
				query: url.searchParams.get('filter') ?? '…empty…',
			};
		},
	},

	document: (context) =>
		document({ ...context, title: 'Gracile - Home', webawesome: true }),

	template: (context) => html`
		<h1><img src="/favicon.svg" height="25" width="25" /> - Test 1</h1>

		<h2>${context.url}</h2>

		${context.url.searchParams.size
			? html` <div id="form-result">
					FORM RESULT:
					<pre>${JSON.stringify([...context.url.searchParams], null, 2)}</pre>
				</div>`
			: null}

		<dl>
			<dt>jsf-webawesome</dt>
			<dd>
				<jsf-webawesome
					schema=${JSON.stringify(schema)}
					ui=${JSON.stringify(ui)}
					data=${JSON.stringify(data)}
				></jsf-webawesome>
			</dd>
		</dl>
	`,
});
