import type { Widgets } from '@jsfe/engine';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Field } from './_field.js';

export const SelectMultiple: Widgets['SelectMultiple'] = (options) => html`
	${Field(
		options,
		html`
			<select
				aria-label=${ifDefined(options.label)}
				class=${ifDefined(options.classes.input)}
				name=${options.html.name}
				id=${options.html.id}
				part="Select-input"
				?required=${options.html.required}
				multiple
				size=${ifDefined(options.size)}
			>
				${options.enum?.map(
					(enumValue) =>
						html` <option
							class=${ifDefined(options.classes.inputChild)}
							part="Select-inputChild"
							value=${enumValue}
							?selected=${options.value?.includes(
								/* @ts-expect-error Why does `never` shows up here? */
								enumValue,
							)}
						>
							${enumValue}
						</option>`,
				)}
			</select>
		`,
		options.html.size === undefined
			? undefined
			: html`${options.value?.length} / ${options.html.size}`,
	)}
`;

// @change=${(event: Event) => {
//   let newValue: string | null | number | string[] = (
//     event.target as SlSelect
//   ).value;
//   if (Array.isArray(newValue)) return;

//   if (options.type === 'number' || options.type === 'integer') {
//     newValue = Number(newValue);
//   }
//   // if (options.type?.includes('null') && !newValue) {
//   // 	newValue = null;
//   // }

//   options.valueChangedCallback?.(newValue);

//   // handleChange(path, newValue, [
//   // 	...schemaPath,
//   // 	'enum',
//   // 	schema.enum?.indexOf(newValue),
//   // ]);
// }}
