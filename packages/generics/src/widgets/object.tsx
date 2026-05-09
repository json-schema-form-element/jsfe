'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

import { WidgetTree } from '../form.helpers.js';
import { Fieldset } from './_fieldset.js';

// HACK: `Object` will crash Vite.
export const Objectt: Widgets['Object'] = (
	options /* , vue */,
): HTMLTemplateResult => (
	<Fieldset options={options}>
		{options.label ? (
			<legend class={options.classes.label} part="Object-label">
				{options.label}
			</legend>
		) : null}
		{options.html['aria-describedby'] ? (
			<p
				id={options.html['aria-describedby']}
				if:class={options.classes.input}
				part="Object-helpText"
			>
				{options.helpText}
			</p>
		) : null}

		{options.fields.map((child) => (
			<for:each key={child.pathAsString}>
				<WidgetTree rootField={child} widgets={options.form.widgets} />
			</for:each>
		))}
	</Fieldset>
);
