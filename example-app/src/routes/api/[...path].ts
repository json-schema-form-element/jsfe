import { defineRoute } from '@gracile/gracile/route';

export default defineRoute({
	handler: {
		GET: ({ url }) => {
			return new Response(`A GET! ${url.toString()}`);
		},
		POST: ({ url }) => {
			return new Response(`A POST! ${url.toString()}`);
		},
	},
});
