import { html, nothing } from 'lit';

// import { ifDefined } from 'lit/directives/if-defined.js';
import type { Widgets } from '@jsfe/types';

export const radioGroupBoolean: Widgets['radioGroupBoolean'] = (options) => {
	function radio(i: boolean) {
		return html`<label>
			${i ? options.trueLabel ?? 'Yes' : nothing}
			${!i ? options.falseLabel ?? 'No' : nothing}
			<input
				type="radio"
				name=${options.id}
				value=${String(String(i))}
				@input=${(event: Event) => {
					let newValue: string | number = (event.target as HTMLInputElement)
						.value;
					if (Array.isArray(newValue)) return;
					if (options.type === 'number' || options.type === 'integer') {
						newValue = Number(newValue);
					}
					options.valueChangedCallback?.(newValue);
				}}
			/>
		</label>`;
	}

	return html`
		<fieldset class="theme-system widget-radio-group-boolean">
			${options.label ? html`<legend>${options.label}</legend>` : nothing}
			<!-- -->
			${options.helpText
				? html`<p class="widget-object__description">${options.helpText}</p>`
				: nothing}
			<!--  -->
			${radio(false)} ${radio(true)}
		</fieldset>
	`;
};
