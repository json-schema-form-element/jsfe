import { html, nothing } from 'lit';
// import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import type { SlSwitch } from '@shoelace-style/shoelace';

export const switchh: Widgets['switch'] = (options) => html`
	<sl-switch
		placeholder=${options.placeholder}
		.checked=${typeof options.value === 'boolean' ? options.value : false}
		.name=${options.id}
		.id=${options.id}
		.required=${options.required}
		@sl-input=${(event: CustomEvent) => {
			const { checked: newValue } = event.target as SlSwitch;
			options.valueChangedCallback?.(newValue);
		}}
		>${options.label}
		${options.helpText
			? html`<small> -&nbsp;${options.helpText}</small>`
			: nothing}
	</sl-switch>
`;
