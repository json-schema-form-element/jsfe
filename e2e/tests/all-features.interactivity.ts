import test, { expect } from 'playwright/test';

import type { System } from './all-features.js';

export function interactivity({
	url,
	system: _system,
}: {
	url: string;
	// skip: { buttonGroup: boolean; rating: boolean };
	system: System;
}) {
	test('02 - All feats - Fill and submit form', async ({ page }) => {
		await page.goto(url);
		// await addOutline();

		await page.keyboard.press('Tab'); // Skip details

		await page.keyboard.press('Tab');
		await page.keyboard.type('Some text input');
		await page.keyboard.press('Tab');
		await page.keyboard.type('Some other -required- text input');
		await page.keyboard.press('Tab');
		await page.keyboard.type('Simple inline string');
		await page.keyboard.press('Tab');
		await page.keyboard.type('STRING WITH CONSTRAINTS');
		await page.keyboard.press('Tab');
		await page.keyboard.type('Password format');
		await page.keyboard.press('Tab');
		await page.keyboard.type('Email@format.com');
		await page.keyboard.press('Tab');
		await page.keyboard.type(
			'Text area Text area Text area Text area Text area Text area Text area Text area Text area Text area Text area Text area',
		);
		// Color picker
		await page.keyboard.press('Tab');
		await page.keyboard.press('Space');
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('Enter');

		await page.keyboard.press('Tab');
		await page.keyboard.type('123.123');
		await page.keyboard.press('Tab');
		await page.keyboard.type('1234');
		await page.keyboard.press('Tab');
		await page.keyboard.type('90');
		// Range 1
		await page.keyboard.press('Tab');
		await page.keyboard.press('ArrowLeft');
		await page.keyboard.press('ArrowLeft');
		// Range 2
		await page.keyboard.press('Tab');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');

		// TODO: Rating

		// Checkbox 1
		await page.keyboard.press('Tab');
		await page.keyboard.press('Space');
		// Checkbox 2
		await page.keyboard.press('Tab');
		await page.keyboard.press('Space');
		// Switch
		await page.keyboard.press('Tab');
		await page.keyboard.press('Space');
		// Radio 1
		await page.keyboard.press('Tab');
		await page.keyboard.press('ArrowRight');
		// HACK: REMOVE after bug fix
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		// HACK: --^
		// Radio 1
		await page.keyboard.press('Tab');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowLeft');
		// await page.keyboard.type('Text area');

		// Select 1
		await page.keyboard.press('Tab');
		await page.keyboard.type('H');
		// Select 2
		await page.keyboard.press('Tab');
		await page.keyboard.type('1');

		// Radio group 1
		await page.keyboard.press('Tab');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		// Radio group 2
		await page.keyboard.press('Tab');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');

		// MARK: Enumerations
		// await page.keyboard.press('Tab');
		// TODO: Buttons group
		// if (theme === 'shoelace')

		// FIXME: Dates

		// NOTE: Browser quirk, we can't use keyboard actions.
		await page.fill(
			'input[name="Primitives.Date.DateTime"]',
			'2025-04-23T14:30',
		);
		await page.fill('input[name="Primitives.Date.Date"]', '2025-04-23');
		await page.fill('input[name="Primitives.Date.Time"]', '14:30');

		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');

		// FIXME: Date
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');

		// await page.fill('id=birthday', date);
		// // await page.keyboard.type('1');
		// // await page.keyboard.press('Tab');
		// // await page.keyboard.type('1');
		// // await page.keyboard.press('Tab');
		// // await page.keyboard.type('1999');
		// // await page.keyboard.type('11');
		// // await page.keyboard.press('Tab');
		// // await page.keyboard.type('11');
		// // await page.keyboard.press('Tab');
		// // await page.keyboard.press('Tab');

		// // Date and time
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');

		// // Time
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');

		// // MARK: Arrays

		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.type('I tried');
		// // Down
		// await page.keyboard.press('Shift+Tab');
		// await page.keyboard.press('Space');

		// New
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Space');
		// await page.keyboard.press('Space');
		// await page.keyboard.press('Space');

		// Up
		// await page.keyboard.press('Shift+Tab');
		// await page.keyboard.type('UPPED');
		// await page.keyboard.press('Shift+Tab');
		// await page.keyboard.press('Space');

		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Tab');
		// await page.keyboard.press('Shift+Tab');
		// await page.keyboard.type('New 2');
		// await page.keyboard.press('Shift+Tab');
		// await page.keyboard.press('Space');
		// await page.keyboard.press('Shift+Tab');
		// await page.keyboard.press('Space');

		await page.keyboard.press('Tab');

		// return;
		// Submit
		await page.keyboard.press('Enter');

		expect(
			JSON.parse(await page.locator('#form-result pre').innerText()),
		).toStrictEqual([
			['Object.TextFoo', 'Some text input'],
			['Object.TextBar', 'Some other -required- text input'],

			['Primitives.Strings.SimpleString', 'Simple inline string'],
			['Primitives.Strings.StringConstrained', 'STRING WIT'],
			['Primitives.Strings.Password', 'Password format'],
			['Primitives.Strings.Email', 'Email@format.com'],
			[
				'Primitives.Strings.TextArea',
				'Text area Text area Text area Text area Text area Text area Text area Text area Text area Text area Text area Text area',
			],
			['Primitives.Strings.Color', '#4c92e1'],

			['Primitives.Numbers.Float', '123.123'],
			['Primitives.Numbers.Integer', '1234'],
			['Primitives.Numbers.NumberConstrained', '90'],
			['Primitives.Numbers.Range', '48'],
			['Primitives.Numbers.RangeConstrained', '50'],

			['Primitives.Booleans.Checkbox', 'false'],
			['Primitives.Booleans.Checkbox', 'true'],
			// ['Primitives.Booleans.CheckboxWithData', 'false'], // NOTE: Special case.
			['Primitives.Booleans.Radio', 'false'],
			['Primitives.Booleans.RadioWithDefault', 'false'],

			['Primitives.Enumerations.Selects.StringList', 'Hello'],
			['Primitives.Enumerations.Selects.NumberList', '100'],
			['Primitives.Enumerations.Radios.String', 'Bonjour'],
			['Primitives.Enumerations.Radios.Number', '10'],

			['Primitives.Date.DateTime', '2025-04-23T14:30'],
			['Primitives.Date.Date', '2025-04-23'],
			['Primitives.Date.Time', '14:30'],

			['Arrays.Fixed.0', ''],
			['Arrays.Fixed.2.when', ''],
			['Arrays.MultipleChoicesSelect', 'Apple'],
			['Arrays.MultipleChoicesSelect', 'Pineapple'],
			['Arrays.MultipleChoicesSelect', 'Banana'],
			['Arrays.MultipleChoicesSelect', 'Mango'],
			['Arrays.MultipleChoicesSelect', 'Avocado'],
			['Arrays.MultipleChoicesCheckboxes', 'on'],
			['Arrays.MultipleChoicesCheckboxes', 'on'],
			['Arrays.MultipleChoicesCheckboxes', 'on'],
			['Arrays.MultipleChoicesCheckboxes', 'on'],

			['Arrays.Primitives.0', 'Try me!'],
			['Arrays.Primitives.1', 'Second entry…'],
			// ['Arrays.Primitives.0', 'Second entry…'],
			// ['Arrays.Primitives.1', 'Try me!'],
			// ['Arrays.Fixed.0', '42'],
			// ['Arrays.Fixed.1', 'on'],

			// ['Arrays.Fixed.0', '42'],
			// ['Arrays.Fixed.2.when', ''],
		]);
	});
}
