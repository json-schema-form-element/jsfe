import test, { expect } from 'playwright/test';

import type { FromSchema, JSONSchema7 } from '../lib/index.js';
import { prepare } from './__fixtures__/prepare.js';

const schema = {
	type: 'object',
	title: 'Numbers',
	properties: {
		foo: {
			default: 4,
			type: 'number',
		},
		bar: {
			default: 2,
			type: 'number',
			maximum: 12,
		},
	},
} as const satisfies JSONSchema7;
type Data = FromSchema<typeof schema>;

const initialData: Data = { foo: 123 };

test('Numbers', async ({ page }) => {
	await prepare(page, initialData, schema);

	expect(page.getByLabel('foo')).toBeVisible();
	expect(page.getByLabel('foo')).toHaveValue('123');
	expect(page.getByLabel('bar')).toBeVisible();
	expect(page.getByLabel('bar')).toHaveValue('2');

	await page.getByLabel('bar').fill('10');
	expect(page.getByLabel('bar')).toHaveValue('10');
	await page.getByLabel('foo').fill('14');
	expect(page.getByLabel('foo')).toHaveValue('14');
	await page.getByLabel('bar').fill('223');

	expect(page.locator('#dump')).toHaveValue(
		JSON.stringify({ foo: 14, bar: 223 }),
	);

	await page.getByRole('button', { name: 'Submit' }).click();

	expect(page.locator('#bar[data-user-invalid]')).toBeVisible();

	expect(page.locator('#dump')).toHaveValue(
		JSON.stringify({ foo: 14, bar: 223 }),
	);
});
