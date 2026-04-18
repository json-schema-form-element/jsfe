import { gracile } from '@gracile/gracile/plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	server: {
		port: 3032,
	},

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	plugins: [
		react(),
		// viteStaticCopy({
		// 	targets: [
		// 		{
		// 			src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/*.svg',
		// 			dest: 'assets/icons',
		// 		},
		// 	],
		// }),
		gracile({
			output: 'server',

			dev: {
				locals: (_context) => {
					return {
						requestId: crypto.randomUUID(),
						userEmail: 'admin@admin.home.arpa',
					};
				},
			},
		}),
	],
});
