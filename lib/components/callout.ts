import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export const error = (
	message: string,
	type: 'tip' | 'warning' | 'danger' = 'danger',
) => {
	console.error(message);
	return html`
		<div
			role="alert"
			class=${classMap({
				callout: true,
				[`callout--${type}`]: true,
			})}
		>
			<p>${message}</p>
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
