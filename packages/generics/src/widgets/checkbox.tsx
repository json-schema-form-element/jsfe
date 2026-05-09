'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

export const Checkbox: Widgets['Checkbox'] = (options): HTMLTemplateResult => (
	<>
		{options.html.required ? (
			<input name={options.html.name} type="hidden" value="false" />
		) : null}

		<input
			bool:checked={options.html.checked}
			bool:required={options.html.required}
			id={options.html.id}
			if:class={options.classes.input}
			if:role={options.widget === 'Switch' ? 'switch' : undefined}
			// @ts-expect-error Only for Safari
			if:switch={options.widget === 'Switch' || undefined}
			indeterminate={String(
				Boolean(options.html.required && options.html.checked === undefined),
			)}
			name={options.html.name}
			part="Checkbox-input"
			type={options.html.type}
			value="true"
		/>

		<label
			for={options.html.id}
			if:class={options.classes.label}
			part="Checkbox-label"
		>
			{options.label}

			<span>
				{options.html.required ? (
					<strong>
						<span aria-label="required"> *</span>
					</strong>
				) : null}
			</span>
		</label>

		<div>
			<small>{options.helpText}</small>
		</div>
	</>
);
