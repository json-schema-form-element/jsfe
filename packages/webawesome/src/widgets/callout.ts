import { html } from '@lit-labs/signals';
import { classMap } from 'lit/directives/class-map.js';

export const Errorr = (options: {
	id?: string;
	message?: string;
	type?: string;
}) => {
	console.warn(options.message);
	return html`
		<div
			role="alert"
			class=${`callout--${
				options.type ?? 'warning'
			} theme-webawesome widget-callout`}
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
				[`callout--danger`]: true,
				callout: true,
			})}
		>
			<p>${message}</p>
		</div>
	`;
};
