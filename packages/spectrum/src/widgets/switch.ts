import { html, nothing } from 'lit';

// import { ifDefined } from 'lit/directives/if-defined.js';
import type { Widgets } from '@jsfe/types';

import type { Switch } from '@spectrum-web-components/switch';
import '@spectrum-web-components/switch/sp-switch.js';

export const switchh: Widgets['switch'] = (options) => html`
	<sp-switch
		placeholder=${options.placeholder}
		.checked=${typeof options.value === 'boolean' ? options.value : false}
		.name=${options.id}
		.id=${options.id}
		.required=${options.required}
		@input=${(event: CustomEvent) => {
			const { checked: newValue } = event.target as Switch;
			options.valueChangedCallback?.(newValue);
		}}
		>${options.label}
		${options.helpText
			? html`<small> -&nbsp;${options.helpText}</small>`
			: nothing}
	</sp-switch>
`;
