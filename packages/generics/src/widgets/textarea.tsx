'use html-signal';
import type { Widgets } from '@jsfe/engine';

import { Field } from './_field.js';

export const Textarea: Widgets['Textarea'] = (options): JSX.LitTemplate => (
	<Field
		constraints={
			options.html.maxlength ? (
				<small
					if:class={options.classes.constraints}
					part="Textarea-constraints"
				>
					{`${(options.html.value?.length ?? 0).toString()} / ${options.html.maxlength.toString()}`}
				</small>
			) : null
		}
		options={options}
	>
		<textarea
			bool:required={options.html.required}
			id={options.html.id}
			if:class={options.classes.input}
			if:maxlength={options.html.maxlength}
			if:minlength={options.html.minlength}
			if:placeholder={options.html.placeholder}
			name={options.html.name}
			part="Textarea-input"
			// TODO: Test cross-framework
			prop:value={options.html.value ?? ''}
		></textarea>
	</Field>
);
