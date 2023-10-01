import { html } from 'lit';

export const debuggerInline = (data: unknown) => html`
	<!-- <details>
		<pre>${JSON.stringify(data)}</pre>
	</details> -->
`;
