import { html, nothing } from 'lit';

import type { Widgets } from '@jsfe/types';

import '@carbon/web-components/es/components/form-group/index.js';
import '@carbon/web-components/es/components/stack/index.js';

export const object: Widgets['object'] = (options) => html`
	<cds-form-group
		.legendText=${options.label ?? ''}
		id=${options.id}
		class="theme-carbon widget-object"
		part="widget-object"
	>
		<!-- .message=${true}
			.messageText=$ {options.helpText} -->
		<!-- -->
		${options.helpText
			? html`<div class="widget-object__description">${options.helpText}</div>`
			: nothing}
		<div class="widget-object__children">${options.children}</div>
	</cds-form-group>
`;
