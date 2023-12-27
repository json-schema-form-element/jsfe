import { html } from 'lit';

// import { ifDefined } from 'lit/directives/if-defined.js';
import type { Widgets } from '@jsfe/types';

import type { SlRadioGroup } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';

export const buttonGroupBoolean: Widgets['buttonGroupBoolean'] = (
	options,
) => html`
	<sl-radio-group
		size="medium"
		.label=${options.label ?? ''}
		.helpText=${options.helpText ?? ''}
		value=${typeof options.value !== 'undefined' ? String(options.value) : ''}
		.name=${options.id}
		.required?=${options.required}
		@sl-change=${(event: Event) => {
			const newValue = (event.target as SlRadioGroup).value;
			options.valueChangedCallback?.(
				newValue === 'true' ?? newValue !== 'false' ?? undefined,
			);
		}}
	>
		<sl-radio-button
			value="true"
			.disabled=${
				/* NOTE: This is a trick because otherwise we won't see pre-prepopulated value  */
				options.value === true ? false : options.disabled
			}
			>${options.trueLabel ?? 'Yes'}</sl-radio-button
		>
		<sl-radio-button
			value="false"
			.disabled=${options.value === false ? false : options.disabled}
			>${options.falseLabel ?? 'No'}</sl-radio-button
		>
	</sl-radio-group>
`;
