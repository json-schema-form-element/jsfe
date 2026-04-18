import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const Range: Widgets['Range'] = (options) =>
	html` <!--  -->
		<sl-range
			value=${ifDefined(options.html.value)}
			step=${ifDefined(options.html.step)}
			min=${ifDefined(options.html.min)}
			max=${ifDefined(options.html.max)}
			label=${ifDefined(options.label)}
			helpText=${ifDefined(options.helpText)}
			name=${options.html.name}
			id=${options.html.id}
			?required=${options.html.required}
			?disabled=${options.html.disabled}
		></sl-range>`;
