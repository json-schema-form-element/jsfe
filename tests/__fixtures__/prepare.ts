import { type Page } from 'playwright';

import type { JSONSchema7, FromSchema } from '../../lib/index.js';

export async function prepare(
	page: Page,
	initialData: any,
	schema: JSONSchema7,
) {
	await page.goto('/');

	await page.evaluate(
		({ initialData, schema }) => {
			const dump = document.querySelector<HTMLTextAreaElement>('#dump')!;
			const jsfe = document.createElement('json-schema-form');

			document.body.appendChild(jsfe);

			jsfe.schema = schema;

			jsfe.data = initialData;

			jsfe.onDataChange = (newData) => {
				console.log(newData);
				console.log({ newData: JSON.stringify(newData) });
				dump.innerText = JSON.stringify(newData);
			};

			jsfe.onFormSubmit = (newData, valid) => {
				dump.innerText = JSON.stringify(newData);
				console.log({ newData: JSON.stringify(newData), valid });
			};
		},
		{ initialData, schema },
	);
}
