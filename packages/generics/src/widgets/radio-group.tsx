'use html-signal';
import type { Widgets } from '@jsfe/engine';

import { For } from '@gracile-labs/babel-plugin-jsx-to-literals/components/for';
import { Fragment } from '@gracile-labs/babel-plugin-jsx-to-literals/components/fragment';

import { Fieldset } from './_fieldset.js';

export const RadioGroup: Widgets['RadioGroup'] = (options): JSX.LitTemplate => (
	<Fieldset options={options}>
		{options.label ? (
			<legend if:class={options.classes.label} part="RadioGroup-label">
				{options.label}
			</legend>
		) : null}

		{options.helpText ? (
			<p if:class={options.classes.helpText} part="RadioGroup-helpText">
				{options.helpText}
			</p>
		) : null}

		<For each={options.enum ?? []}>
			{(enumValue: unknown, index: number) => (
				<Fragment for:key={String(enumValue)}>
					<input
						bool:checked={enumValue === options.value}
						id={`${options.html.id}__${index.toString()}`}
						if:class={options.classes.input}
						name={options.html.name}
						part="RadioGroup-input"
						type="radio"
						value={String(enumValue)}
					/>
					<label
						for={`${options.html.id}__${index.toString()}`}
						if:class={options.classes.childLabel}
						part="RadioGroup-childLabel"
					>
						{enumValue}
					</label>
				</Fragment>
			)}
		</For>
	</Fieldset>
);
