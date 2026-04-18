import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const Numberr: Widgets['Number'] = (options) =>
	html` <!--  -->
		<wa-input
			?disabled=${options.html.disabled}
			?readonly=${options.html.readonly}
			?required=${options.html.required}
			helpText=${ifDefined(options.helpText)}
			id=${options.html.name}
			label=${ifDefined(options.label)}
			max=${ifDefined(options.html.max)}
			min=${ifDefined(options.html.min)}
			name=${options.html.id}
			step=${ifDefined(options.html.step)}
			type="number"
			value=${ifDefined(options.html.value)}
		></wa-input>`;
