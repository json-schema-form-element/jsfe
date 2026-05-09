import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const ButtonGroupBoolean: Widgets['ButtonGroupBoolean'] = (
	options,
) => html`
	<wa-radio-group
		orientation="horizontal"
		size="m"
		label=${ifDefined(options.label)}
		help-text=${ifDefined(options.helpText)}
		value=${options.html.checked === undefined
			? ''
			: String(options.html.checked)}
		name=${options.html.id}
		?required=${options.html.required}
	>
		<wa-radio
			appearance="button"
			value="true"
			?disabled=${
				/* NOTE: This is a trick because otherwise we won't see pre-prepopulated value  */
				options.html.checked === true ? false : options.html.disabled
			}
			>${options.trueLabel ?? 'Yes'}</wa-radio
		>
		<wa-radio
			appearance="button"
			value="false"
			?disabled=${options.html.checked === false
				? false
				: options.html.disabled}
			>${options.falseLabel ?? 'No'}</wa-radio
		>
	</wa-radio-group>
`;

// @sl-change=${(event: Event) => {
//   const newValue = (event.target as SlRadioGroup).value;
//   options.valueChangedCallback?.(
//     newValue === 'true' ?? newValue !== 'false' ?? undefined,
//   );
// }}
