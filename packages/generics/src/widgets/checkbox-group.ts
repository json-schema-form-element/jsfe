import type { Widgets } from '@jsfe/engine';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Fieldset } from './_fieldset.js';

export const CheckboxGroup: Widgets['CheckboxGroup'] = (options) => html`
	${Fieldset({
		children: html`<legend
				class=${ifDefined(options.classes.label)}
				part="CheckboxGroup-label"
			>
				${options.label}
			</legend>

			${options.helpText
				? html`<small
						class=${ifDefined(options.classes.helpText)}
						part="CheckboxGroup-helpText"
						>${options.helpText}</small
					>`
				: null}

			<div
				class=${ifDefined(options.classes.children)}
				part="CheckboxGroup-child"
			>
				${options.enum?.map((enumValue, index) => {
					return html`<input
							class=${ifDefined(options.classes.input)}
							?checked=${
								/* FIXME: */ options.value?.some((v) => v === enumValue) ??
								false
							}
							?disabled=${options.html.disabled}
							id=${`${options.html.id}__${index.toString()}`}
							name=${options.html.name}
							part="CheckboxGroup-input"
							type="checkbox"
						/>
						<label
							class=${ifDefined(options.classes.childLabel)}
							part="CheckboxGroup-child-label"
							for=${`${options.html.id}__${index.toString()}`}
							>${enumValue}</label
						> `;
				})}
			</div>`,

		options,
	})}
`;

// @change=${(event: CustomEvent) => {
//   // const { checked } = event.target as SlCheckbox;
//   // const newData: string | number[] = [];
//   // options?.enum?.forEach((eVal) => {
//   // 	if (eVal === enumValue && checked) {
//   // 		newData.push(eVal);
//   // 	}
//   // });
//   // options.value?.forEach((dVal) => {
//   // 	if (dVal !== enumValue) {
//   // 		newData.push(dVal);
//   // 	}
//   // });
//   // options.valueChangedCallback?.(newData);
// }}
