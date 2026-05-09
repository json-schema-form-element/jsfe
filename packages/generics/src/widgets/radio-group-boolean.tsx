'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

import { Fieldset } from './_fieldset.js';

export const RadioGroupBoolean: Widgets['RadioGroupBoolean'] = (
	options,
): HTMLTemplateResult => {
	const Radio = ({ value }: { value: boolean }): HTMLTemplateResult => (
		<>
			<input
				bool:checked={value === options.html.checked}
				id={`${options.html.id}_${String(value)}`}
				if:class={options.classes.input}
				name={options.html.name}
				part="RadioGroupBoolean-input"
				type="radio"
				value={String(value)}
			/>
			<label
				for={`${options.html.id}_${String(value)}`}
				if:class={options.classes.childLabel}
				part="RadioGroupBoolean-childLabel"
			>
				{value ? (options.trueLabel ?? 'Yes') : (options.falseLabel ?? 'No')}
			</label>
		</>
	);

	return (
		<Fieldset options={options}>
			{options.label && (
				<legend if:class={options.classes.label} part="RadioGroupBoolean-label">
					{options.label}
				</legend>
			)}

			{options.helpText && (
				<p
					if:class={options.classes.helpText}
					part="RadioGroupBoolean-helpText"
				>
					<small>{options.helpText}</small>
				</p>
			)}

			<Radio value={true} />
			<Radio value={false} />
		</Fieldset>
	);
};
