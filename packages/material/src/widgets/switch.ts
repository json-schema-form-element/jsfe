import { html } from 'lit';

import type { Widgets } from '@jsfe/types';

import '@material/web/switch/switch.js';
import type { MdSwitch } from '@material/web/switch/switch.js';

export const switchh: Widgets['switch'] = (options) => html`
	<label
		for=${options.id}
		class="theme-material widget-switch widget-toggle"
		part="widget-switch widget-toggle"
	>
		<div>
			<div>${options.label}</div>
			<small>${options.helpText}</small>
		</div>

		<md-switch
			.id=${options.id}
			.name=${options.id}
			.required=${options.required ?? false}
			.selected=${options.value ?? false}
			@input=${(event: Event) => {
				const { selected } = event.target as MdSwitch;
				console.log({ selected });
				options.valueChangedCallback?.(!selected);
			}}
			@keydown=${options.handleKeydown}
		>
		</md-switch>
		<!--  -->
	</label>
`;
