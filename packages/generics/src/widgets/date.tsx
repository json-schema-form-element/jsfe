'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

import { Field } from './_field.js';

export const Datee: Widgets['Date'] = (options): HTMLTemplateResult => (
	<Field options={options}>
		<input
			bool:required={options.html.required ?? false}
			id={options.html.id}
			if:value={options.html.value}
			name={options.html.name}
			type={options.html.type}
		/>
	</Field>
);
