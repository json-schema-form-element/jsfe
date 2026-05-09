'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

import { Field } from './_field.js';

export const Textarea: Widgets['Textarea'] = (options): HTMLTemplateResult => (
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
			// TODO: Test cross-framework
			_:value={options.html.value ?? ''}
			bool:required={options.html.required}
			id={options.html.id}
			if:class={options.classes.input}
			if:maxlength={options.html.maxlength}
			if:minlength={options.html.minlength}
			if:placeholder={options.html.placeholder}
			name={options.html.name}
			part="Textarea-input"
		></textarea>
	</Field>
);
