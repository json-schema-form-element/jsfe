import type { CommonWidgetOptions } from '@jsfe/engine';
import type { HTMLTemplateResult, TemplateResult } from 'lit';

export function Fieldset({
	'$:children': children,
	options,
}: Readonly<{
	'$:children': TemplateResult | TemplateResult[];
	options: CommonWidgetOptions;
}>): HTMLTemplateResult {
	return (
		<fieldset
			bool:disabled={options.html.disabled}
			id={options.html.id}
			if:aria-describedby={options.html['aria-describedby']}
			if:aria-description={
				options.html['aria-describedby']
					? undefined
					: options.html['aria-description']
			}
			if:class={options.classes.root}
			name={options.html.name}
			part={options.widget ?? 'Error'}
		>
			{children}
		</fieldset>
	);
}
