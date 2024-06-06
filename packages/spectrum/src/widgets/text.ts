import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';

import type { Textfield } from '@spectrum-web-components/textfield';

export const text: Widgets['text'] = (options) => html`
	<div>
		${options.label
			? html`<sp-field-label for="name-0-m" for=${options.id}
					>${options.label}</sp-field-label
			  >`
			: nothing}
		<sp-textfield
			.type=${options.inputType}
			placeholder=${options.placeholder}
			value=${ifDefined(options.value)}
			.name=${options.id}
			.id=${options.id}
			.required=${options.required}
			minLength=${ifDefined(options.minLength)}
			maxLength=${ifDefined(options.maxLength)}
			pattern=${ifDefined(options.pattern)}
			@input=${(event: CustomEvent) => {
				const { value: newValue } = event.target as Textfield;
				options.valueChangedCallback?.(newValue);
			}}
		>
		</sp-textfield>

		${options.helpText
			? html`
					<sp-help-text slot="negative-help-text"
						>${options.helpText}</sp-help-text
					>
			  `
			: nothing}
	</div>
`;
