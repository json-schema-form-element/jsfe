import test, { expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';

const URL = '/test-2/';
const FORM_CE = 'jsf-webawesome';

test.describe('Webawesome form — Structure', () => {
	test('renders the root fieldset with title', async ({ page }) => {
		await page.goto(URL);
		const root = page.locator(FORM_CE).locator('#__root');
		await expect(root).toBeVisible();
		await expect(root.locator('> legend')).toHaveText('All features');
	});

	test('renders Object fieldset with description', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.locator(FORM_CE).locator('fieldset#Object > legend'),
		).toHaveText('Object type');
	});
});

test.describe('Webawesome form — Text inputs', () => {
	test('text input with description', async ({ page }) => {
		await page.goto(URL);
		const input = page
			.locator(FORM_CE)
			.locator('wa-input[label="Some text input"]');
		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute(
			'help-text',
			'The help text is from "description".',
		);
	});

	test('required text input', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByLabel('Some other -required- text input'),
		).toBeVisible();
	});

	test('string with default value', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Simple inline string')).toHaveValue(
			'With default value from schema',
		);
	});

	test('password field', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Password format')).toBeVisible();
	});

	test('email field with data', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Email format')).toHaveValue(
			'foo@bar.home.arpa',
		);
	});

	test('textarea', async ({ page }) => {
		await page.goto(URL);
		const ta = page.getByLabel('Text area');
		await expect(ta).toBeVisible();
		await expect(ta).toHaveValue('Default value');
	});

	test('color picker button', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByRole('button', { name: 'Color picker' }),
		).toBeVisible();
	});
});

test.describe('Webawesome form — Number inputs', () => {
	test('float number', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Number (float)')).toBeVisible();
	});

	test('integer with default', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Number (integer)')).toHaveValue('5');
	});

	test('range with default', async ({ page }) => {
		await page.goto(URL);
		const slider = page
			.locator(FORM_CE)
			.locator('wa-slider[label="Range with default"]');
		await expect(slider).toHaveAttribute('value', '28');
	});

	test('rating widget', async ({ page }) => {
		await page.goto(URL);
		const rating = page.locator(FORM_CE).locator('wa-rating');
		await expect(rating).toBeVisible();
	});
});

test.describe('Webawesome form — Booleans', () => {
	test('checkbox', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByRole('checkbox', { name: 'Checkbox (default)' }),
		).toBeVisible();
	});

	test('checkbox with existing data is checked', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByRole('checkbox', { name: 'Checkbox', exact: true }),
		).toBeChecked();
	});

	test('switch', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByRole('switch', { name: 'Switch, enabled by default' }),
		).toBeVisible();
	});

	test('radio Yes/No', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByRole('radio', { name: 'Yes' }).first(),
		).toBeVisible();
		await expect(page.getByRole('radio', { name: 'No' }).first()).toBeVisible();
	});
});

test.describe('Webawesome form — Enumerations', () => {
	test('string select (combobox)', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByRole('combobox', { name: 'String list' }),
		).toBeVisible();
	});

	test('number select (combobox)', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByRole('combobox', { name: 'Number list' }),
		).toBeVisible();
	});

	test('string radio group', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByRole('radio', { name: 'Ola', exact: true }),
		).toBeVisible();
		await expect(
			page.getByRole('radio', { name: 'Hello', exact: true }),
		).toBeVisible();
	});

	test('number radio group', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByRole('radio', { name: '10', exact: true }),
		).toBeVisible();
		await expect(
			page.getByRole('radio', { name: '1000', exact: true }),
		).toBeVisible();
	});
});

test.describe('Webawesome form — Dates', () => {
	test('datetime field', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Date and time')).toBeVisible();
	});

	test('date field', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Date', { exact: true })).toBeVisible();
	});

	test('time field', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Time', { exact: true })).toBeVisible();
	});
});

test.describe('Webawesome form — Arrays', () => {
	test('fixed array — number with default', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('A number')).toHaveValue('42');
	});

	test('fixed array — boolean', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByRole('checkbox', { name: 'A boolean' }),
		).toBeVisible();
	});

	test('checkbox array with defaults', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByRole('checkbox', { name: 'Tomato' })).toBeChecked();
		await expect(
			page.getByRole('checkbox', { name: 'Baguette' }),
		).toBeChecked();
		await expect(
			page.getByRole('checkbox', { name: 'Beaufort' }),
		).toBeChecked();
		await expect(page.getByRole('checkbox', { name: 'Avocado' })).toBeChecked();
	});
});

test.describe('Webawesome form — Interactivity', () => {
	test('can fill a text input', async ({ page }) => {
		await page.goto(URL);
		const input = page.getByLabel('Some text input');
		await input.fill('Hello world');
		await expect(input).toHaveValue('Hello world');
	});

	test('can toggle a checkbox', async ({ page }) => {
		await page.goto(URL);
		const waCheckbox = page
			.locator(FORM_CE)
			.locator('wa-checkbox[name="Primitives.Booleans.Checkbox"]');
		await waCheckbox.click();
		const input = page.getByRole('checkbox', { name: 'Checkbox (default)' });
		await expect(input).toBeChecked();
	});

	test('can select a radio option', async ({ page }) => {
		await page.goto(URL);
		const radio = page.getByRole('radio', { name: 'Ola', exact: true });
		await radio.click({ force: true });
		await expect(radio).toBeChecked();
	});
});

test.describe('Webawesome form — Accessibility', () => {
	test('no axe-core violations', async ({ page }) => {
		test.setTimeout(60_000);
		await page.goto(URL);
		const results = await new AxeBuilder({ page }).include(FORM_CE).analyze();
		// Filter out violations from third-party component shadow DOM internals.
		// Our CE is at depth 2 (host + shadow root). Depth 3+ means the violation
		// is inside a child component's shadow DOM (sl-*, wa-*) which we don't control.
		const ownViolations = results.violations.filter((v) => {
			v.nodes = v.nodes.filter(
				(node) =>
					!node.target.some(
						(selector) => Array.isArray(selector) && selector.length >= 3,
					),
			);
			return v.nodes.length > 0;
		});
		expect(ownViolations).toEqual([]);
	});
});
