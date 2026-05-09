'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

import { Field } from './_field.js';

export const Text: Widgets['Text'] = (options): HTMLTemplateResult => (
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
			class={options.classes.input}
			id={options.html.id}
			maxlength={options.html.maxlength}
			minlength={options.html.minlength}
			name={options.html.name}
			part="Text-input"
			pattern={options.html.pattern}
			placeholder={options.html.placeholder}
			readonly={options.html.readonly ?? false}
			required={options.html.required ?? false}
			type={options.html.type}
			value={options.html.value}
		/>
	</Field>
);

//
