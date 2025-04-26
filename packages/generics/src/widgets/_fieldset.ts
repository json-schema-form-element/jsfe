import type { CommonWidgetOptions } from '@jsfe/engine';
import type { TemplateResult } from 'lit';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const Fieldset = (
	{
		children,
		options,
	}: { children: TemplateResult; options: CommonWidgetOptions },
	// constraints?: TemplateResult,
	// ${options.value}
) => html`
	<fieldset
		aria-describedby=${ifDefined(options.html['aria-describedby'])}
		aria-description=${ifDefined(options.html['aria-description'])}
		class=${ifDefined(options.classes.root)}
		?disabled=${options.html.disabled}
		id=${options.html.id}
		name=${options.html.name}
		part=${options.widget ?? 'Error'}
	>
		${children}
	</fieldset>
`;
// <label
//   class=${ifDefined(options.classes.label)}
//   part=${`${options.widget ?? 'error'}-label`}
//   for=${options.html.id}
// >
//   ${options.label}
//   ${options.html.required
//     ? html`<strong><span aria-label="required">*</span></strong>`
//     : null}
// </label>

// ${children}

// <small
//   class=${ifDefined(options.classes.helpText)}
//   part=${`${options.widget ?? 'error'}-helpText`}
//   id=${`${options.html.id}__description`}
//   >${options.helpText}
//   ${constraints ? html`<span>${constraints}</span>` : null}</small
// >
