import { html, nothing } from 'lit';

import type { Widgets } from '@jsfe/types';

export const checkbox: Widgets['checkbox'] = (options) =>
	html` <label for=${options.id} part="field">
		<input
			type="checkbox"
			type="text"
			.helpText=${options.helpText}
			placeholder=${options.placeholder}
			.checked=${options.value ?? false}
			.name=${options.id}
			.id=${options.id}
			.indeterminate=${options.required && typeof options.value === 'undefined'}
			.required=${options.required}
			@input=${(event: Event) => {
				const { checked: newValue } = event.target as HTMLInputElement;
				options.valueChangedCallback?.(newValue);
			}}
		/>
		<div>
			<div>
				${options.label}
				${options.required
					? html`<strong><span aria-label="required">*</span></strong>`
					: nothing}
			</div>
			<small>${options.helpText}</small>
		</div>
	</label>`;
