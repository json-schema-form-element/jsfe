import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const RadioGroupBoolean: Widgets['RadioGroupBoolean'] = (
	options,
) => html`
	<!-- TODO: Disabled state -->
	<wa-radio-group
		class="theme-webawesome widget-radio-group-boolean"
		size="m"
		label=${ifDefined(options.label)}
		help-text=${ifDefined(options.helpText)}
		value=${options.html.checked === undefined
			? ''
			: String(options.html.checked)}
		name=${options.html.name}
		id=${options.html.id}
		?required=${options.html.required ?? false}
		@wa-change=${(event: Event) =>
			event.target?.dispatchEvent(new Event('change', { bubbles: true }))}
	>
		<wa-radio ?disabled=${options.html.disabled} value="true"
			>${options.trueLabel ?? 'Yes'}</wa-radio
		>
		<wa-radio ?disabled=${options.html.disabled} value="false"
			>${options.falseLabel ?? 'No'}</wa-radio
		>
	</wa-radio-group>
`;
