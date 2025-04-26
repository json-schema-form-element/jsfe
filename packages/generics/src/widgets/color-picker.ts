import type { Widgets } from '@jsfe/engine';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Field } from './_field.js';

export const ColorPicker: Widgets['ColorPicker'] = (options) => html`
	${Field(
		options,
		html`<input
			class=${ifDefined(options.classes.input)}
			id=${options.html.id}
			name=${options.html.name}
			placeholder=${ifDefined(options.html.placeholder)}
			?required=${options.html.required}
			type="color"
			value=${ifDefined(options.value)}
			part="ColorPicker-input"
		/>`,
	)}
`;
