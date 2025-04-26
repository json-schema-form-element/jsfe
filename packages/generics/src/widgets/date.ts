import type { Widgets } from '@jsfe/engine';
// import { ifDefined } from 'lit/directives/if-defined.js';

import { html } from '@lit-labs/signals';

import { Field } from './_field.js';

// ${options.value}
export const Datee: Widgets['Date'] = (options) => html`
	${Field(
		options,
		html`<input
			type=${options.html.type}
			value=${options.value ? String(options.html.value) : ''}
			name=${options.html.name}
			id=${options.html.id}
			?required=${options.html.required ?? false}
		/>`,
	)}
`;
// @input=${(event: InputEvent) => {
//   const { valueAsDate: newValue } = event.target as HTMLInputElement;
//   options.valueChangedCallback?.(newValue ?? undefined);
// }}
