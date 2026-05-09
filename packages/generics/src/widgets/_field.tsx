import type { CommonWidgetOptions } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

export const Field = ({
	'$:children': children,
	constraints,
	options,
}: {
	'$:children': HTMLTemplateResult;
	constraints?: HTMLTemplateResult;
	options: CommonWidgetOptions;
}): HTMLTemplateResult => (
	<>
		{options.labelHidden ? null : (
			<label
				for={options.html.id}
				if:class={options.classes.label}
				part={`${options.widget ?? 'error'}-label`}
			>
				{options.label}

				{options.html.required ? (
					<strong>
						<span aria-label="required">*</span>
					</strong>
				) : null}
			</label>
		)}

		{children}

		{options.helpText ? (
			<small
				id={`${options.html.id}__description`}
				if:class={options.classes.helpText}
				part={`${options.widget ?? 'error'}-helpText`}
			>
				{options.helpText}
				{constraints && <span>{constraints}</span>}
			</small>
		) : null}
	</>
);
