import test, { expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';

const URL = '/test-1/';

// Helper: Playwright pierces shadow DOM for role/label queries,
// but CSS selectors do NOT pierce shadow DOM.
// Use `page.locator('jsf-generic').locator(...)` to scope inside the CE.
const FORM_CE = 'jsf-generic';

test.describe('Generic form — Structure', () => {
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
		const desc = page.locator(FORM_CE).locator('#Object__description');
		await expect(desc).toHaveText(
			'Nests each property to a field in a fieldset.',
		);
	});

	test('contains a native <form> element', async ({ page }) => {
		await page.goto(URL);
		await expect(page.locator(FORM_CE).locator('form')).toBeAttached();
	});
});

test.describe('Generic form — Text inputs', () => {
	test('text input with description', async ({ page }) => {
		await page.goto(URL);
		const input = page.getByLabel('Some text input');
		await expect(input).toBeVisible();
		await expect(input).toHaveAccessibleDescription(
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

	test('string with placeholder', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Simple inline string')).toHaveAttribute(
			'placeholder',
			'With a placeholder…',
		);
	});

	test('constrained string field is visible', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('String with constraints')).toBeVisible();
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
		await expect(ta).toHaveAttribute('placeholder', 'This is a placeholder');
		await expect(ta).toHaveValue('Default value');
	});

	test('color picker', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Color picker')).toBeVisible();
	});
});

test.describe('Generic form — Number inputs', () => {
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
		await expect(page.getByLabel('Range with default')).toHaveValue('28');
	});

	test('range with constraints', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Range with constraints')).toBeVisible();
	});
});

test.describe('Generic form — Booleans', () => {
	test('required checkbox', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByLabel('Checkbox (default) *', { exact: true }),
		).toBeVisible();
	});

	test('checkbox with existing data', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Checkbox', { exact: true })).toBeVisible();
	});

	test('switch with default on', async ({ page }) => {
		await page.goto(URL);
		await expect(
			page.getByLabel('Switch, enabled by default', { exact: true }),
		).toBeVisible();
	});

	test('boolean radio group', async ({ page }) => {
		await page.goto(URL);
		// Radio "Yes"/"No" pair for boolean
		await expect(page.getByLabel('Yes').first()).toBeVisible();
		await expect(page.getByLabel('No').first()).toBeVisible();
	});
});

test.describe('Generic form — Enumerations', () => {
	test('string select', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('String list')).toBeVisible();
	});

	test('number select', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Number list')).toBeVisible();
		await expect(page.getByLabel('Number list')).toHaveAccessibleDescription(
			'With default value set',
		);
	});

	test('string radio group', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('Ola', { exact: true })).toBeVisible();
		await expect(page.getByLabel('Hello', { exact: true })).toBeVisible();
		await expect(page.getByLabel('Bonjour', { exact: true })).toBeVisible();
	});

	test('number radio group', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('10', { exact: true })).toBeVisible();
		await expect(page.getByLabel('100', { exact: true })).toBeVisible();
		await expect(page.getByLabel('1000', { exact: true })).toBeVisible();
		await expect(page.getByLabel('10000', { exact: true })).toBeVisible();
	});
});

test.describe('Generic form — Dates', () => {
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

test.describe('Generic form — Arrays', () => {
	test('fixed array — number with default', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('A number')).toHaveValue('42');
	});

	test('fixed array — boolean', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('A boolean')).toBeVisible();
	});

	test('fixed array — nested date', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('A date')).toBeVisible();
	});

	test('checkbox array with defaults', async ({ page }) => {
		await page.goto(URL);
		// Default data includes 'Baguette', 'Beaufort', 'Tomato', 'Avocado'
		await expect(page.getByLabel('Tomato')).toBeChecked();
		await expect(page.getByLabel('Baguette')).toBeChecked();
		await expect(page.getByLabel('Beaufort')).toBeChecked();
		await expect(page.getByLabel('Avocado')).toBeChecked();
		// Not in defaults
		await expect(
			page.getByRole('checkbox', { name: 'Apple', exact: true }),
		).not.toBeChecked();
	});

	test('string list with prepopulated items', async ({ page }) => {
		await page.goto(URL);
		await expect(page.getByLabel('List item #0')).toHaveValue('Try me!');
		await expect(page.getByLabel('List item #1')).toHaveValue('Second entry…');
	});
});

test.describe('Generic form — Interactivity', () => {
	test('can fill a text input', async ({ page }) => {
		await page.goto(URL);
		const input = page.getByLabel('Some text input');
		await input.fill('Hello world');
		await expect(input).toHaveValue('Hello world');
	});

	test('can toggle a checkbox', async ({ page }) => {
		await page.goto(URL);
		const cb = page.getByLabel('Checkbox', { exact: true });
		await cb.check();
		await expect(cb).toBeChecked();
		await cb.uncheck();
		await expect(cb).not.toBeChecked();
	});

	test('can select a radio option', async ({ page }) => {
		await page.goto(URL);
		const radio = page.getByLabel('Bonjour', { exact: true });
		await radio.check();
		await expect(radio).toBeChecked();
	});

	test('can change a select', async ({ page }) => {
		await page.goto(URL);
		const sel = page
			.locator(FORM_CE)
			.locator('select[name="Primitives.Enumerations.Selects.StringList"]');
		await sel.selectOption('Hello');
		await expect(sel).toHaveValue('Hello');
	});

	test('can add an item to a string array', async ({ page }) => {
		await page.goto(URL);
		const addBtn = page.getByRole('button', {
			name: /New.*List item/,
		});
		await addBtn.click();
		await expect(page.getByLabel('List item #2')).toBeVisible();
	});
});

test.describe('Generic form — Accessibility', () => {
	test('no axe-core violations', async ({ page }) => {
		await page.goto(URL);
		const results = await new AxeBuilder({ page }).include(FORM_CE).analyze();
		expect(results.violations).toEqual([]);
	});
});
