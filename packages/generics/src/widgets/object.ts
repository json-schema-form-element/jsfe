import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

import { WidgetTree } from '../form.js';
import { Fieldset } from './_fieldset.js';
import * as widgets from './index.js';

// HACK: `Object` will crash Vite.
export const Objectt: Widgets['Object'] = (options) => html`
	${Fieldset({
		children: html`${options.label
				? html`<legend
						class=${ifDefined(options.classes.label)}
						part="Object-label"
					>
						${options.label}
					</legend>`
				: null}
			<!-- -->
			${options.html['aria-describedby']
				? html`<p
						class=${ifDefined(options.classes.input)}
						id=${options.html['aria-describedby']}
						part="Object-helpText"
					>
						${options.helpText}
					</p>`
				: null}
			<!--  -->

			${options.children.map((child) =>
				WidgetTree({ rootField: child, widgets }),
			)}`,
		options,
	})}
`;
