'use html-signal';
import type { Widgets } from '@jsfe/engine';

import { For } from '@gracile-labs/babel-plugin-jsx-to-literals/components/for';

import { WidgetTree } from '../form.jsx';
import { Fieldset } from './_fieldset.js';

// HACK: `Object` will crash Vite.
export const Objectt: Widgets['Object'] = (
	options /* , vue */,
): JSX.LitTemplate => (
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

		<For each={options.fields}>
			{(child) => (
				<WidgetTree
					for:key={child.pathAsString}
					rootField={child}
					widgets={options.form.widgets}
				/>
			)}
		</For>
	</Fieldset>
);
