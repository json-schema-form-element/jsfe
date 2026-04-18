'use html-signal';
import type { Widgets } from '@jsfe/engine';

import { For } from '@gracile-labs/babel-plugin-jsx-to-literals/components/for';

import { Field } from './_field.js';

export const Select: Widgets['Select'] = (options): JSX.LitTemplate => (
	<Field options={options}>
		<select
			aria-describedby={`${options.html.id}__description`}
			bool:required={options.html.required}
			id={options.html.id}
			name={options.html.name}
		>
			<For each={options.enum ?? []}>
				{(enumValue: unknown) => (
					<option
						for:key={String(enumValue)}
						value={String(enumValue)}
						// NOTE: a <select> CANNOT serialize `value`,
						// but a prop binding (`_:value`) works.
						// `selected` is the isomorphic way.
						bool:selected={
							// TODO: Encapsulate this upstream
							options.html.value !== undefined &&
							String(enumValue) === String(options.html.value)
						}
					>
						{enumValue}
					</option>
				)}
			</For>
		</select>
	</Field>
);
