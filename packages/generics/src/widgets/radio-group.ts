import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Fieldset } from './_fieldset.js';

export const RadioGroup: Widgets['RadioGroup'] = (options) => html`
	${Fieldset({
		children: html` ${options.label
				? html`<legend
						class=${ifDefined(options.classes.label)}
						part="RadioGroup-label"
					>
						${options.label}
					</legend>`
				: null}
			<!-- -->
			${options.helpText
				? html`<p
						class=${ifDefined(options.classes.helpText)}
						part="RadioGroup-helpText"
					>
						${options.helpText}
					</p>`
				: null}
			<!--  -->
			${options.enum?.map(
				(enumValue, index) => html`
					<input
						class=${ifDefined(options.classes.input)}
						type="radio"
						id=${`${options.html.id}__${index.toString()}`}
						name=${options.html.name}
						part="RadioGroup-input"
						value=${String(enumValue)}
						?checked=${enumValue === options.value}
					/>

					<label
						class=${ifDefined(options.classes.childLabel)}
						for=${`${options.html.id}__${index.toString()}`}
						part="RadioGroup-childLabel"
					>
						${enumValue}
					</label>
				`,
			)}`,
		options,
	})}
`;

// @input=${(event: Event) => {
//   let newValue: string | number = (event.target as HTMLInputElement)
//     .value;
//   if (Array.isArray(newValue)) return;
//   if (options.type === 'number' || options.type === 'integer') {
//     newValue = Number(newValue);
//   }
//   options.valueChangedCallback?.(newValue);
// }}
