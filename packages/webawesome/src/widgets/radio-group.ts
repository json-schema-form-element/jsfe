import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const RadioGroup: Widgets['RadioGroup'] = (options) => html`
	<sl-radio-group
		class="theme-shoelace widget-radio-group"
		size="medium"
		label=${ifDefined(options.label)}
		helpText=${ifDefined(options.helpText)}
		value=${options.value === undefined ? '' : String(options.value)}
		name=${options.html.id}
		?required=${options.html.required}
	>
		${options.enum?.map(
			(enumValue) =>
				html`<sl-radio
					?disabled=${options.html.disabled}
					value=${String(enumValue)}
					>${enumValue}</sl-radio
				>`,
		)}
	</sl-radio-group>
`;
