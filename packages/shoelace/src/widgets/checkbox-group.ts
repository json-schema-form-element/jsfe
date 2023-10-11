import { html, nothing } from 'lit';

import type { Widgets } from '@jsfe/types';

import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import type { SlCheckbox } from '@shoelace-style/shoelace';

export const checkboxGroup: Widgets['checkboxGroup'] = (options) => html`
	<fieldset
		.id=${options.id}
		class="theme-shoelace widget-checkbox-group widget-fieldset"
		part="widget-checkbox-group"
	>
		<legend>${options.label}</legend>
		<div class="help-text">${options.helpText}</div>

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
					>${enumValue}</sl-checkbox
				>`;
			})}
		</div>
	</fieldset>
`;
