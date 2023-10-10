import { html } from 'lit';
// import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import type { SlRadioGroup } from '@shoelace-style/shoelace';

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
		<sl-radio-button value="true"
			>${options.trueLabel ?? 'Yes'}</sl-radio-button
		>
		<sl-radio-button value="false"
			>${options.falseLabel ?? 'No'}</sl-radio-button
		>
	</sl-radio-group>
`;
