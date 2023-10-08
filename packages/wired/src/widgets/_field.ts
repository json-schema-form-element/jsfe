import { nothing, html, type TemplateResult } from 'lit';

import type { WidgetBaseParams } from '@j_c/jsfe__types';

export const field = (
	options: WidgetBaseParams,
	children: TemplateResult<1>,
	constraints?: TemplateResult<1>,
) => html`
	<label for=${options.id} part="widget-field" class="theme-wired widget-field">
		<div>
			${options.label}
			${options.required
				? html`<strong><span aria-label="required">*</span></strong>`
				: nothing}
		</div>

		${children}

		<div>
			<small>${options.helpText}</small>
			${constraints ? html`<small>${constraints}</small>` : nothing}
		</div>
	</label>
`;
