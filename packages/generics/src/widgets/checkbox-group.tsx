'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

import { Fieldset } from './_fieldset.js';

export const CheckboxGroup: Widgets['CheckboxGroup'] = (
	options,
): HTMLTemplateResult => {
	const Checkbox = ({
		index,
		value,
	}: {
		index: number;
		value: unknown;
	}): HTMLTemplateResult => (
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
				{(options.enum ?? []).map((enumValue: unknown, index: number) => (
					<for:each key={String(enumValue)}>
						<Checkbox index={index} value={enumValue} />
					</for:each>
				))}
			</div>
		</Fieldset>
	);
};
