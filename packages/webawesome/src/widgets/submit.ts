import { html } from '@lit-labs/signals';

// import '@shoelace-style/shoelace/dist/components/button/button.js';

export const Submit = (options?: { id?: string; label?: string }) => html`
	<!--  -->
	<div id=${options?.id} class="theme-webawesome widget-submit">
		<wa-button type="submit" size="large"
			>${options?.label ?? 'Submit'}</wa-button
		>
	</div>
`;
