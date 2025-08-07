'use html-signal';
import type { Widgets } from '@jsfe/engine';

import { Field } from './_field.js';

export const Numberr: Widgets['Number'] = (options): JSX.LitTemplate => (
	<Field options={options}>
		<input
			if:class={options.classes.input}
			if:id={options.html.id}
			if:max={options.html.max}
			if:min={options.html.min}
			if:name={options.html.name}
			if:step={options.html.step}
			if:value={options.html.value}
			part="Number-input"
			type={options.html.type}
		/>
	</Field>
);
