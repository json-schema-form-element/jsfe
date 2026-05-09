'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

import { Fieldset } from './_fieldset.js';

export const RadioGroup: Widgets['RadioGroup'] = (
	options,
): HTMLTemplateResult => (
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

		{(options.enum ?? []).map((enumValue: unknown, index: number) => (
			<for:each key={String(enumValue)}>
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
			</for:each>
		))}
	</Fieldset>
);
