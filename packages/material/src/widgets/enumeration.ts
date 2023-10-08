import { html } from 'lit';

import type { Widgets } from '@j_c/jsfe__types';

import '@material/web/select/outlined-select.js';
import '@material/web/select/select-option.js';
import type { MdOutlinedSelect } from '@material/web/select/outlined-select.js';

export const enumeration: Widgets['enumeration'] = (options) => html`
	<md-outlined-select
		?required=${options.required}
		.label=${options.label ?? ''}
		part="field-select"
		@input=${(event: Event) => {
			// value=${ifDefined(options.value)}
			// .supportingText=${options.helpText}
			let newValue: string | null | number | string[] = (
				event.target as MdOutlinedSelect
			).value;
			if (Array.isArray(newValue)) return;
			if (options.type === 'number' || options.type === 'integer') {
				newValue = Number(newValue);
			}
			// (event.target as MdOutlinedSelect).selectIndex(0);
			options.valueChangedCallback?.(newValue);
		}}
		class="material"
		>${options.enum?.map(
			(enumValue, i) =>
				html`<md-select-option .value=${String(enumValue)}>
					${enumValue}
				</md-select-option>`,
		)}</md-outlined-select
	>
`;
