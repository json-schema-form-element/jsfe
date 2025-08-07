'use html-signal';
import type { Widgets } from '@jsfe/engine';

import { Field } from './_field.js';

export const Datee: Widgets['Date'] = (options): JSX.LitTemplate => (
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
