import type { CommonWidgetOptions } from '@jsfe/engine';

export function Fieldset({
	children,
	options,
}: Readonly<{
	children: JSX.LitTemplate;
	options: CommonWidgetOptions;
}>): JSX.LitTemplate {
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
