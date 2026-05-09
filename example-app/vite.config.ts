import { gracile } from '@gracile/gracile/plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	server: {
		port: 3032,
	},

	// These virtual/client entrypoints can churn during linked-package upgrades.
	// Excluding them avoids stale prebundle hashes that cause 504 "Outdated Optimize Dep".
	optimizeDeps: {
		exclude: [
			'@gracile/gracile/hydration-elements',
			'@gracile-labs/islands/client',
		],
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
		// gracileIslands({ debug: true }),
	],
});
