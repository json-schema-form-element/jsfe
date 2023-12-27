import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import { field } from './_field.js';

export const selectMultiple: Widgets['selectMultiple'] = (options) => html`
	${field(
		options,
		html` <select
			value=${ifDefined(options.value)}
			.required=${options.required}
			multiple
			@change=${(event: Event) => {
				let newValue: string | null | number | string[] = (
					event.target as SlSelect
				).value;
				if (Array.isArray(newValue)) return;

				if (options.type === 'number' || options.type === 'integer') {
					newValue = Number(newValue);
				}
				// if (options.type?.includes('null') && !newValue) {
				// 	newValue = null;
				// }

				options.valueChangedCallback?.(newValue);

				// handleChange(path, newValue, [
				// 	...schemaPath,
				// 	'enum',
				// 	schema.enum?.indexOf(newValue),
				// ]);
			}}
		>
			${options.enum?.map(
				(enumValue) =>
					html` <option .value=${String(enumValue)}>${enumValue}</option>`,
			)}
		</select>`,
		typeof options.maxLength !== 'undefined'
			? html`${options.value?.length} / ${options.maxLength}`
			: undefined,
	)}
`;
