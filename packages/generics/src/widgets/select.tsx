'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

import { Field } from './_field.js';

export const Select: Widgets['Select'] = (options): HTMLTemplateResult => (
	<Field options={options}>
		<select
			aria-describedby={`${options.html.id}__description`}
			bool:required={options.html.required}
			id={options.html.id}
			name={options.html.name}
		>
			{(options.enum ?? []).map((enumValue: unknown) => (
				<for:each key={String(enumValue)}>
					<option
						// NOTE: a <select> CANNOT serialize `value`,
						// but a prop binding (`_:value`) works.
						// `selected` is the isomorphic way.
						selected={
							// TODO: Encapsulate this upstream
							options.html.value !== undefined &&
							String(enumValue) === String(options.html.value)
						}
						value={String(enumValue)}
					>
						{enumValue}
					</option>
				</for:each>
			))}
		</select>
	</Field>
);
