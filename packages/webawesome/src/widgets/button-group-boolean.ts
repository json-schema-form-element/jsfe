import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const ButtonGroupBoolean: Widgets['ButtonGroupBoolean'] = (
	options,
) => html`
	<sl-radio-group
		size="medium"
		label=${ifDefined(options.label)}
		help-text=${ifDefined(options.helpText)}
		value=${options.html.checked === undefined
			? ''
			: String(options.html.checked)}
		name=${options.html.id}
		?required?=${options.html.required}
	>
		<sl-radio-button
			value="true"
			?disabled=${
				/* NOTE: This is a trick because otherwise we won't see pre-prepopulated value  */
				options.html.checked === true ? false : options.html.disabled
			}
			>${options.trueLabel ?? 'Yes'}</sl-radio-button
		>
		<sl-radio-button
			value="false"
			?disabled=${options.html.checked === false
				? false
				: options.html.disabled}
			>${options.falseLabel ?? 'No'}</sl-radio-button
		>
	</sl-radio-group>
`;

// @sl-change=${(event: Event) => {
//   const newValue = (event.target as SlRadioGroup).value;
//   options.valueChangedCallback?.(
//     newValue === 'true' ?? newValue !== 'false' ?? undefined,
//   );
// }}
