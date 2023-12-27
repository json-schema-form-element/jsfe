import { html, nothing } from 'lit';

import type { Widgets } from '@jsfe/types';

import type { SlCheckbox } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';

export const checkboxGroup: Widgets['checkboxGroup'] = (options) => html`
	<fieldset
		.id=${options.id}
		class="theme-shoelace widget-checkbox-group widget-fieldset level-${options.level}"
		part="widget-checkbox-group"
	>
		<legend>${options.label}</legend>
		${options.helpText
			? html`<div class="help-text">${options.helpText}</div>`
			: nothing}

		<!-- NOTE: Unused for now. Too noisy? -->
		<!-- <div class="help-text">${options.itemsLabel}</div> -->

		<div class="widget-checkbox-group__list">
			${options?.enum?.map((enumValue) => {
				return html`<sl-checkbox
					.checked=${options.value?.some((v) => v === enumValue) ?? false}
					@sl-change=${(event: CustomEvent) => {
						const { checked } = event.target as SlCheckbox;

						const newData: string | number[] = [];

						options?.enum?.forEach((eVal) => {
							if (eVal === enumValue && checked) {
								newData.push(eVal);
							}
						});
						options.value?.forEach((dVal) => {
							if (dVal !== enumValue) {
								newData.push(dVal);
							}
						});

						options.valueChangedCallback?.(newData);
					}}
					.disabled=${options.disabled}
					>${enumValue}</sl-checkbox
				>`;
			})}
		</div>
	</fieldset>
`;
