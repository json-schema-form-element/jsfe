import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const Text: Widgets['Text'] = (options) => html`
	<wa-input
		?disabled=${options.html.disabled}
		?readonly=${options.html.readonly}
		?required=${options.html.required}
		help-text=${ifDefined(options.helpText)}
		id=${options.html.id}
		label=${ifDefined(options.label)}
		maxlength=${ifDefined(options.html.maxlength)}
		minlength=${ifDefined(options.html.minlength)}
		name=${options.html.name}
		pattern=${ifDefined(options.html.pattern)}
		placeholder=${ifDefined(options.html.placeholder)}
		type=${options.html.type}
		value=${ifDefined(options.html.value)}
	>
	</wa-input>
`;
