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
			if:value={options.html.value}
			name={options.html.name}
		>
			<For each={options.enum ?? []}>
				{(enumValue: unknown) => (
					<option for:key={String(enumValue)} value={String(enumValue)}>
						{enumValue}
					</option>
				)}
			</For>
		</select>
	</Field>
);
