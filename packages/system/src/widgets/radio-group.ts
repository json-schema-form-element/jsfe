import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import { field } from './_field.js';

export const radioGroup: Widgets['radioGroup'] = (options) => html`
	<fieldset>
		${options.label ? html`<legend>${options.label}</legend>` : nothing}
		<!-- -->
		${options.helpText
			? html`<p class="widget-object__description">${options.helpText}</p>`
			: nothing}
		<!--  -->
		${options.enum?.map(
			(enumVal) =>
				html`<label
					><input
						type="radio"
						name=${options.id}
						value=${String(enumVal)}
						@input=${(event: Event) => {
							let newValue: string | number = (event.target as HTMLInputElement)
								.value;
							if (Array.isArray(newValue)) return;
							if (options.type === 'number' || options.type === 'integer') {
								newValue = Number(newValue);
							}
							options.valueChangedCallback?.(newValue);
						}}
					/>${enumVal}</label
				>`,
		)}
	</fieldset>
`;
