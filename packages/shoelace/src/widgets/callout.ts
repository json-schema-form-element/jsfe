import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import type { Widgets } from '@jsfe/types';

export const callout: Widgets['callout'] = (options) => {
	console.warn(options.message);
	return html`
		<div
			role="alert"
			class=${`callout--${
				options.type ?? 'warning'
			} theme-shoelace widget-callout`}
			id=${options.id}
			part="widget-callout"
		>
			<p>${options.message}</p>
		</div>
	`;
};

export const flag = (feature: string) => {
	const message = `\`${feature}\` is not supported yet, but you can preview it with \`experimental = { ${feature}: true, ... }\``;
	console.error(message);
	return html`
		<div
			role="alert"
			class=${classMap({
				callout: true,
				[`callout--danger`]: true,
			})}
		>
			<p>${message}</p>
		</div>
	`;
};
