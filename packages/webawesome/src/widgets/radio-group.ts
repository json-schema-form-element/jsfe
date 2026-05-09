import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const RadioGroup: Widgets['RadioGroup'] = (options) => html`
	<wa-radio-group
		class="theme-webawesome widget-radio-group"
		size="m"
		label=${ifDefined(options.label)}
		helpText=${ifDefined(options.helpText)}
		value=${options.value === undefined
			? ''
			: // FIXME:
				// eslint-disable-next-line @typescript-eslint/no-base-to-string
				String(options.value)}
		name=${options.html.id}
		?required=${options.html.required}
	>
		${options.enum?.map(
			(enumValue) =>
				html`<wa-radio
					?disabled=${options.html.disabled}
					value=${String(enumValue)}
					>${enumValue}</wa-radio
				>`,
		)}
	</wa-radio-group>
`;
