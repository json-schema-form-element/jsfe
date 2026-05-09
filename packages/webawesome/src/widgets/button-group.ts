import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const ButtonGroup: Widgets['ButtonGroup'] = (options) => html`
	<wa-radio-group
		size="m"
		label=${ifDefined(options.label)}
		help-text=${ifDefined(options.helpText)}
		value=${options.value === undefined
			? ''
			: // FIXME:
				// eslint-disable-next-line @typescript-eslint/no-base-to-string
				String(options.value)}
		name=${options.html.id}
		?required=${options.html.required ?? false}
		orientation="horizontal"
	>
		${options.enum?.map(
			(enumValue) =>
				html`<wa-radio
					appearance="button"
					?disabled=${
						/* NOTE: This is a trick because otherwise we won't see pre-prepopulated value  */
						String(enumValue) === options.value ? false : options.html.disabled
					}
					value=${String(enumValue)}
					>${enumValue}</wa-radio
				>`,
		)}
	</wa-radio-group>
`;
