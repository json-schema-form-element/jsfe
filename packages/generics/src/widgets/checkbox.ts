import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const Checkbox: Widgets['Checkbox'] = (options) =>
	html` <!--  -->

		<!-- TODO: See if it's a suitable pattern, if yes, document it. -->
		${options.html.required
			? html`<input type="hidden" name=${options.html.name} value="false" />`
			: null}

		<input
			?checked=${Boolean(options.value) ? true : false}
			class=${ifDefined(options.classes.input)}
			help-text=${ifDefined(options.helpText)}
			id=${options.html.id}
			?indeterminate=${options.html.required &&
			options.html.value === undefined}
			name=${options.html.name}
			role=${ifDefined(options.widget === 'Switch' ? 'switch' : undefined)}
			switch=${ifDefined(options.widget === 'Switch' || undefined)}
			?required=${options.html.required}
			type="checkbox"
			value="true"
			part="Checkbox-input"
		/>

		<label
			class=${ifDefined(options.classes.label)}
			for=${options.html.id}
			part="Checkbox-label"
		>
			${options.label}
			<span>
				${options.html.required
					? html`<strong><span aria-label="required">*</span></strong>`
					: null}
			</span></label
		>

		<div>
			<small>${options.helpText}</small>
		</div>`;
