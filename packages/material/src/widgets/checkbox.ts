import { html } from 'lit';

import type { Widgets } from '@j_c/jsfe__types';

import '@material/web/checkbox/checkbox.js';
import type { MdCheckbox } from '@material/web/checkbox/checkbox.js';

export const checkbox: Widgets['checkbox'] = (options) => html`
	<label for=${options.id} part="field-checkbox" class="material">
		<md-checkbox
			.id=${options.id}
			.name=${options.id}
			.required=${options.required}
			.checked=${options.value ?? false}
			@input=${(event: CustomEvent) => {
				const { checked: newValue } = event.target as MdCheckbox;
				options.valueChangedCallback?.(newValue);
			}}
			@keydown=${options.handleKeydown}
			touch-target="wrapper"
		>
		</md-checkbox>
		<!--  -->

		<div>
			<div>${options.label}</div>
			<small>${options.helpText}</small>
		</div>
	</label>
`;
