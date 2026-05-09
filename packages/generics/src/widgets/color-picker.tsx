'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

import { Field } from './_field.js';

export const ColorPicker: Widgets['ColorPicker'] = (
	options,
): HTMLTemplateResult => (
	<Field options={options}>
		<input
			bool:required={options.html.required}
			id={options.html.id}
			if:class={options.classes.input}
			if:placeholder={options.html.placeholder}
			if:value={options.html.value}
			name={options.html.name}
			part="ColorPicker-input"
			type="color"
		/>
	</Field>
);
