import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Fieldset } from './_fieldset.js';

export const RadioGroupBoolean: Widgets['RadioGroupBoolean'] = (options) => {
	function radio(value: boolean) {
		return html`
			<input
				class=${ifDefined(options.classes.input)}
				type="radio"
				name=${options.html.name}
				id=${`${options.html.id}_${String(value)}`}
				part="RadioGroupBoolean-input"
				value=${String(value)}
				?checked=${value === options.value}
			/>
			<label
				class=${ifDefined(options.classes.childLabel)}
				for=${`${options.html.id}_${String(value)}`}
				part="RadioGroupBoolean-childLabel"
			>
				${value ? (options.trueLabel ?? 'Yes') : null}
				${value ? null : (options.falseLabel ?? 'No')}
			</label>
		`;
	}
	// @input=${(event: Event) => {
	//   let newValue: string | number = (event.target as HTMLInputElement)
	//     .value;
	//   if (Array.isArray(newValue)) return;
	//   if (options.type === 'number' || options.type === 'integer') {
	//     newValue = Number(newValue);
	//   }
	//   options.valueChangedCallback?.(newValue);
	// }}

	return html`
		${Fieldset({
			children: html` ${options.label
					? html`<legend
							class=${ifDefined(options.classes.label)}
							part="RadioGroupBoolean-label"
						>
							${options.label}
						</legend>`
					: null}
				<!-- -->
				${options.helpText
					? html`<p
							class=${ifDefined(options.classes.helpText)}
							part="RadioGroupBoolean-helpText"
						>
							<small>${options.helpText}</small>
						</p>`
					: null}
				<!--  -->
				${radio(true)} ${radio(false)}`,
			options,
		})}
	`;
};
