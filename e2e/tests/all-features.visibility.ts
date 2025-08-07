import test, { expect } from 'playwright/test';

import type { System } from './all-features.js';

import AxeBuilder from '@axe-core/playwright';

// NOTE: getByLabel does not find text if text is "slotted"
// (https://github.com/microsoft/playwright/issues/35715)

export function visibility({
	url,
	system: theme,
}: {
	url: string;
	// skip: { buttonGroup: boolean; rating: boolean };
	system: System;
}) {
	test('00 - All feats - Should not have any automatically detectable accessibility issues', async ({
		page,
	}) => {
		await page.goto(url); // 3

		const accessibilityScanResults = await new AxeBuilder({ page })
			.include('jsf-generic, jsf-webawesome')
			.analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('01 - All feats - Labels and descriptions', async ({ page }) => {
		await page.goto(url);

		expect(await page.locator('#__root > legend').innerText()).toBe(
			'All features',
		);

		expect(await page.locator('fieldset#Object > legend').innerText()).toBe(
			'Object type',
		);
		expect(
			await page.locator('fieldset#Object').getAttribute('aria-describedby'),
		).toBe('Object__description');
		expect(await page.locator('#Object__description').innerText()).toBe(
			'Nests each property to a field in a fieldset.',
		);

		// MARK: Object
		await expect(page.getByLabel('Some text input')).toBeVisible();
		await expect(
			page.getByLabel('Some text input'),
		).toHaveAccessibleDescription('The help text is from "description".');

		await expect(
			page.getByLabel('Some other -required- text input'),
		).toBeVisible();

		// MARK: Strings
		await expect(page.getByLabel('Simple inline string')).toBeVisible();
		await expect(page.getByLabel('Simple inline string')).toHaveAttribute(
			'placeholder',
			'With a placeholder…',
		);
		await expect(page.getByLabel('String with constraints')).toBeVisible();
		await expect(page.getByLabel('Password format')).toBeVisible();
		await expect(page.getByLabel('Email format')).toBeVisible();
		await expect(page.getByLabel('Text area')).toBeVisible();
		await expect(page.getByLabel('Text area')).toHaveAttribute(
			'placeholder',
			'This is a placeholder',
		);

		// FIXME: Shoelace
		if (theme !== 'shoelace') {
			await expect(page.getByLabel('Color picker')).toBeVisible();
		}

		// MARK: Numbers
		await expect(page.getByLabel('Number (float)')).toBeVisible();
		await expect(page.getByLabel('Number (integer)')).toBeVisible();
		await expect(page.getByLabel('Range with default')).toBeVisible();
		await expect(page.getByLabel('Range with constraints')).toBeVisible();

		if (theme === 'shoelace') {
			// FIXME:
			// await expect(page.getByLabel('Rating')).toBeVisible();
		}

		// MARK: Booleans
		// FIXME: Shoelace
		if (theme !== 'shoelace') {
			await expect(
				page.getByLabel('Checkbox (default) *', { exact: true }),
			).toBeVisible();
			await expect(page.getByLabel('Checkbox', { exact: true })).toBeVisible();
			await expect(
				page.getByLabel('Switch, enabled by default', { exact: true }),
			).toBeVisible();
		} else {
			// TODO: Try
			await expect(
				page.getByRole('checkbox', { name: 'Checkbox (default)' }),
			).toBeVisible();
			// await expect(
			// 	page.getByLabel('Checkbox', { exact: true }),
			// ).toBeVisible();
			// await expect(
			// 	page.getByLabel('Switch, enabled by default', { exact: true }),
			// ).toBeVisible();
		}

		// TODO: Radio group (fieldset) a11y
		// await expect(page.getByRole('radiogroup', { name: 'Radio' })).toBeVisible();
		// await expect(page.getByLabel('Radio')).toBeVisible();

		// TODO: Button group (fieldset) a11y
		// await page.getByRole('group', { name: 'Choose your favorite fruit' });
		// OR
		// const fieldset = page.locator('fieldset').filter({
		// 	hasText: 'Choose your favorite fruit',
		// });
		// OR
		// const fieldset = page.locator(
		// 	'fieldset:has(legend:text("Choose your favorite fruit"))',
		// );

		// FIXME: Shoelace
		if (theme !== 'shoelace') {
			await expect(page.getByLabel('Ola', { exact: true })).toBeVisible();
			await expect(page.getByLabel('Hello', { exact: true })).toBeVisible();

			await expect(page.getByLabel('1000', { exact: true })).toBeChecked();
		}

		// FIXME: Shoelace
		if (theme !== 'shoelace') {
			await expect(page.getByLabel('String list')).toBeVisible();
			await expect(page.getByLabel('Number list')).toBeVisible();
			await expect(page.getByLabel('Number list')).toHaveAccessibleDescription(
				'With default value set',
			);
		}

		await expect(page.getByLabel('Date and time')).toBeVisible();
		await expect(page.getByLabel('Date', { exact: true })).toBeVisible();
		await expect(page.getByLabel('Time', { exact: true })).toBeVisible();

		// Fixed array
		await expect(page.getByLabel('A number')).toBeVisible();

		if (theme === 'shoelace') {
			await expect(
				page.getByRole('checkbox', { name: 'A boolean' }),
			).toBeVisible();
		} else {
			await expect(page.getByLabel('A boolean')).toBeVisible();
		}
		await expect(page.getByLabel('A date')).toBeVisible();

		// FIXME:
		// await expect(
		// 	page.getByLabel('A multiple choices list with select menu'),
		// ).toBeVisible();

		// FIXME:
		// await expect(
		// 	page.getByLabel('A multiple choices list with checkboxes'),
		// ).toBeVisible();

		// await expect(page.getByLabel('Time', { exact: true })).toBeVisible();
	});
}
