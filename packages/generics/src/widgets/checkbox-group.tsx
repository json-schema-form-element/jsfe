'use html-signal';
import type { Widgets } from '@jsfe/engine';

import { For } from '@gracile-labs/babel-plugin-jsx-to-literals/components/for';

import { Fieldset } from './_fieldset.js';

export const CheckboxGroup: Widgets['CheckboxGroup'] = (
	options,
): JSX.LitTemplate => {
	const Checkbox = ({
		index,
		value,
	}: {
		index: number;
		value: unknown;
	}): JSX.LitTemplate => (
		<>
			<input
				bool:checked={options.value?.some((v) => v === value) ?? false}
				bool:disabled={options.html.disabled}
				id={`${options.html.id}__${index.toString()}`}
				if:class={options.classes.input}
				name={options.html.name}
				part="CheckboxGroup-input"
				type="checkbox"
			/>
			<label
				for={`${options.html.id}__${index.toString()}`}
				if:class={options.classes.childLabel}
				part="CheckboxGroup-child-label"
			>
				{value}
			</label>
		</>
	);

	return (
		<Fieldset options={options}>
			<legend if:class={options.classes.label} part="CheckboxGroup-label">
				{options.label}
			</legend>

			{options.helpText && (
				<small
					if:class={options.classes.helpText}
					part="CheckboxGroup-helpText"
				>
					{options.helpText}
				</small>
			)}

			<div if:class={options.classes.children} part="CheckboxGroup-child">
				<For each={options.enum ?? []}>
					{(enumValue: unknown, index: number) => (
						<Checkbox
							for:key={String(enumValue)}
							index={index}
							value={enumValue}
						/>
					)}
				</For>
			</div>
		</Fieldset>
	);
};
