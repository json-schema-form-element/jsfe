import { html } from 'lit';

// import { ifDefined } from 'lit/directives/if-defined.js';
import type { Widgets } from '@jsfe/types';

import type { SlRadioGroup } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';

export const radioGroupBoolean: Widgets['radioGroupBoolean'] = (
	options,
) => html`
	<!-- TODO: Disabled state (not supported by Shoelace for this specific field despite the docs?) -->
	<sl-radio-group
		class="theme-shoelace widget-radio-group-boolean"
		size="medium"
		.label=${options.label ?? ''}
		.helpText=${options.helpText ?? ''}
		value=${typeof options.value !== 'undefined' ? String(options.value) : ''}
		.name=${options.id}
		.required=${options.required ?? false}
		@sl-change=${(event: CustomEvent) => {
			const newValue = (event.target as SlRadioGroup).value;
			options.valueChangedCallback?.(
				newValue === 'true' ?? newValue !== 'false' ?? undefined,
			);
		}}
	>
		<sl-radio .disabled=${options.disabled} value="true"
			>${options.trueLabel ?? 'Yes'}</sl-radio
		>
		<sl-radio .disabled=${options.disabled} value="false"
			>${options.falseLabel ?? 'No'}</sl-radio
		>
	</sl-radio-group>
`;
