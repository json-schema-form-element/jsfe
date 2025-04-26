/* eslint-disable sonarjs/no-nested-conditional */
import type { CommonWidgetOptions } from '@jsfe/engine';
import type { TemplateResult } from 'lit';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const Field = (
	options: CommonWidgetOptions,
	children: TemplateResult,
	constraints?: TemplateResult,
	// ${options.value}
) => html`
	${options.labelHidden
		? null
		: html`
				<label
					class=${ifDefined(options.classes.label)}
					part=${`${options.widget ?? 'error'}-label`}
					for=${options.html.id}
				>
					${options.label}
					${options.html.required
						? html`<strong><span aria-label="required">*</span></strong>`
						: null}
				</label>
			`}
	${children}

	<!--  -->

	${options.helpText
		? html`
				<small
					class=${ifDefined(options.classes.helpText)}
					part=${`${options.widget ?? 'error'}-helpText`}
					id=${`${options.html.id}__description`}
					>${options.helpText}
					${constraints ? html`<span>${constraints}</span>` : null}</small
				>
			`
		: null}
`;
