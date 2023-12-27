import { html } from 'lit';

// import { ifDefined } from 'lit/directives/if-defined.js';
import type { Widgets } from '@jsfe/types';

import type { RadioGroup } from '@spectrum-web-components/radio';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/radio/sp-radio.js';

export const radioGroup: Widgets['radioGroup'] = (options) => html`
	<sp-radio-group
		class="theme-spectrum widget-radio-group"
		size="medium"
		.label=${options.label ?? ''}
		.helpText=${options.helpText ?? ''}
		value=${typeof options.value !== 'undefined' ? String(options.value) : ''}
		.name=${options.id}
		.required=${options.required ?? false}
		@change=${(event: CustomEvent) => {
			let newValue: (typeof options)['enum'][number] = (
				event.target as RadioGroup
			).value;

			if (options.type === 'number') {
				newValue = Number(newValue);
			}

			options.valueChangedCallback?.(newValue);
		}}
	>
		${options.enum?.map(
			(enumVal) =>
				html`<sp-radio value=${String(enumVal)}>${enumVal}</sp-radio>`,
		)}
	</sp-radio-group>
`;
