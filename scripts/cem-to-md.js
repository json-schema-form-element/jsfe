import fs from 'node:fs';
import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';

const packageDir = process.argv[2];

const manifest = JSON.parse(
	fs.readFileSync(`${packageDir}/custom-elements.json`, 'utf-8'),
);
const markdown = customElementsManifestToMarkdown(manifest);

const theme = packageDir.split('/').at(-1);
const name = theme.at(0).toUpperCase() + theme.substring(1);

fs.writeFileSync(
	`${packageDir}/README.md`,
	`# JSON Schema Form Element — ***${name}*** edition

See the [documentation](../../README.md). 

---

${markdown}
`,
);
