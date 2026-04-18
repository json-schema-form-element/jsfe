import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const Textarea: Widgets['Textarea'] = (options) => html`
	<!--  -->
	<sl-textarea
		?disabled=${options.html.disabled}
		?readonly=${options.html.readonly}
		?required=${options.html.required}
		helpText=${ifDefined(options.helpText)}
		id=${options.html.id}
		label=${ifDefined(options.label)}
		maxlength=${ifDefined(options.html.maxlength)}
		minlength=${ifDefined(options.html.minlength)}
		name=${options.html.name}
		placeholder=${ifDefined(options.html.placeholder)}
		value=${ifDefined(options.html.value)}
	>
	</sl-textarea>
`;
