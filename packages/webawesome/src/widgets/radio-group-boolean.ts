import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const RadioGroupBoolean: Widgets['RadioGroupBoolean'] = (
	options,
) => html`
	<!-- TODO: Disabled state (not supported by Shoelace for this specific field despite the docs?) -->
	<sl-radio-group
		class="theme-shoelace widget-radio-group-boolean"
		size="medium"
		label=${ifDefined(options.label)}
		help-text=${ifDefined(options.helpText)}
		value=${options.html.checked === undefined
			? ''
			: String(options.html.checked)}
		name=${options.html.name}
		id=${options.html.id}
		?required=${options.html.required ?? false}
		@sl-change=${(event: Event) =>
			event.target?.dispatchEvent(new Event('change', { bubbles: true }))}
	>
		<sl-radio ?disabled=${options.html.disabled} value="true"
			>${options.trueLabel ?? 'Yes'}</sl-radio
		>
		<sl-radio ?disabled=${options.html.disabled} value="false"
			>${options.falseLabel ?? 'No'}</sl-radio
		>
	</sl-radio-group>
`;
