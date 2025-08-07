import { html } from '@lit-labs/signals';

import { WidgetTree } from '@jsfe/generics/form';
import * as widgets from './index.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Widgets } from '@jsfe/engine';
import { Fieldset } from '@jsfe/generics/widgets/_fieldset';

export const Objectt: Widgets['Object'] = (options) =>
	Fieldset({
		children: html`
			${options.label ? html`<legend>${options.label}</legend>` : ``}
			<!-- -->
			${options.helpText
				? html`<div
						class="widget-fieldset__description"
						id=${ifDefined(options.html['aria-describedby'])}
					>
						${options.helpText}
					</div>`
				: null}
			<!--  -->
			${options.fields.map((child) =>
				WidgetTree({ rootField: child, widgets }),
			)}
		`,
		options,
	});
