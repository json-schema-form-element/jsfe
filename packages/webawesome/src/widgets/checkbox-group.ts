import type { Widgets } from '@jsfe/engine';

import { Fieldset } from '@jsfe/generics/widgets/_fieldset';
import { html } from '@lit-labs/signals';

export const CheckboxGroup: Widgets['CheckboxGroup'] = (options) =>
	Fieldset({
		children: html`
			<legend>${options.label}</legend>
			${options.helpText
				? html`<div class="help-text">${options.helpText}</div>`
				: null}

			<!-- NOTE: Unused for now. Too noisy? -->
			<!-- <div class="help-text">$ {options.itemsLabel}</div> -->

			<div class="widget-checkbox-group__list">
				${options.enum?.map((enumValue) => {
					return html`<sl-checkbox
						?checked=${options.value?.some((v) => v === enumValue) ?? false}
						?disabled=${options.disabled}
						>${enumValue}</sl-checkbox
					>`;
				})}
			</div>
		`,

		options,
	});

// @sl-change=${(event: CustomEvent) => {
// 	const { checked } = event.target as SlCheckbox;

// 	const newData: number[] | string = [];

// 	if (options.enum)
// 		for (const eVal of options.enum) {
// 			if (eVal === enumValue && checked) {
// 				newData.push(eVal);
// 			}
// 		}
// 	if (options.value)
// 		for (const dValue of options.value) {
// 			if (dValue !== enumValue) {
// 				newData.push(dValue);
// 			}
// 		}

// 	options.valueChangedCallback?.(newData);
// }}
