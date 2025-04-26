import { html } from '@gracile/gracile/server-html';

export const document = (props: {
	url: URL;
	title?: string | null;
	webawesome: boolean;
}) => html`
	<!doctype html>
	<html lang="en" class=${props.webawesome ? `sl-theme-dark` : ''}>
		<head>
			<!-- Basics -->
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			<!-- Global assets -->
			${props.webawesome
				? html` <link
						rel="stylesheet"
						href=${new URL('./document-webawesome.css', import.meta.url)
							.pathname}
					/>`
				: html` <link
						rel="stylesheet"
						href=${new URL('./document.css', import.meta.url).pathname}
					/>`}

			<script
				type="module"
				src=${new URL('./document.client.ts', import.meta.url).pathname}
			></script>

			<!-- SEO and page metadata -->
			<title>${props.title}</title>
			<link type="image/svg+xml" href="/favicon.svg" rel="icon" />
		</head>

		<body>
			<route-template-outlet></route-template-outlet>
		</body>
	</html>
`;
