'use html-signal';
import type { Widgets } from '@jsfe/engine';

import { Field } from './_field.js';

export const Text: Widgets['Text'] = (options): JSX.LitTemplate => (
	<Field
		constraints={
			options.html.maxlength ? (
				<small if:class={options.classes.constraints} part="Text-constraints">
					{`${(options.html.value?.length ?? 0).toString()} / ${options.html.maxlength.toString()}`}
				</small>
			) : null
		}
		options={options}
	>
		<input
			aria-describedby={`${options.html.id}__description`}
			aria-label={options.labelHidden ? options.label : undefined}
			bool:readonly={options.html.readonly}
			bool:required={options.html.required}
			id={options.html.id}
			if:class={options.classes.input}
			if:maxlength={options.html.maxlength}
			if:minlength={options.html.minlength}
			if:pattern={options.html.pattern}
			if:placeholder={options.html.placeholder}
			if:value={options.html.value}
			name={options.html.name}
			part="Text-input"
			type={options.html.type}
		/>
	</Field>
);

//
