import * as fs from 'node:fs';

for (let i = 2; i < process.argv.length; i++) {
	try {
		const filePath = process.argv[i];

		const content = fs.readFileSync(filePath);
		fs.writeFileSync(
			`${filePath.replace('.css', '')}.js`,
			`import { css } from 'lit';
export const styles = css\`${content.toString('utf8')}\`;
`,
		);
		fs.writeFileSync(
			`${filePath.replace('.css', '')}.d.ts`,
			'export const styles: CSSResult;',
		);
	} catch (error) {
		console.error(error);
	}
}
