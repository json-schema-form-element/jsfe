import type { Widgets } from '@jsfe/engine';
// import { ifDefined } from 'lit/directives/if-defined.js';

import { html } from '@lit-labs/signals';

export const Datee: Widgets['Date'] = (options) => html`
	<sl-input
		type=${options.html.type}
		label=${options.label ?? ''}
		helpText=${options.helpText ?? ''}
		value=${options.html.value ?? options.html.value ?? ''}
		name=${options.html.name}
		id=${options.html.id}
		?required=${options.html.required ?? false}
		?disabled=${options.html.disabled}
		?readonly=${options.html.readonly}
	>
	</sl-input>
`;

// @sl-input=${(event: CustomEvent) => {
//   let { value } = event.target as SlInput;

//   if (options.type === 'datetime-local') {
//     value = new Date(value);
//   }

//   options.valueChangedCallback?.(
//     // NOTE: Date time does not return `valueAsDate`
//     // TODO: valueChangedCallback should coerce to Date later (when possible)
//     value,
//   );
// }}
