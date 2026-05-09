// import test, { expect } from 'playwright/test';
// import AxeBuilder from '@axe-core/playwright';

// const FORM_CE = 'jsf-generic';
// test.describe('Generics contract :: Lit host', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await page.goto('/test-generics/?fw=lit');
// 		await page.waitForSelector(FORM_CE, {
// 			state: 'visible',
// 			timeout: 15_000,
// 		});
// 		await expect(page.locator('#framework-host')).toContainText('lit');
// 	});

// 	test('renders the root fieldset with title', async ({ page }) => {
// 		const root = page.locator(FORM_CE).locator('#__root');
// 		await expect(root).toBeVisible();
// 		await expect(root.locator('> legend')).toHaveText('All features');
// 	});

// 	test('renders object fieldset and description', async ({ page }) => {
// 		await expect(
// 			page.locator(FORM_CE).locator('fieldset#Object > legend'),
// 		).toHaveText('Object type');
// 		await expect(
// 			page.locator(FORM_CE).locator('#Object__description'),
// 		).toHaveText('Nests each property to a field in a fieldset.');
// 	});

// 	test('keeps default values from schema/data', async ({ page }) => {
// 		await expect(page.getByLabel('Simple inline string')).toHaveValue(
// 			'With default value from schema',
// 		);
// 		await expect(page.getByLabel('Number (integer)')).toHaveValue('5');
// 		await expect(page.getByLabel('Range with default')).toHaveValue('28');
// 	});

// 	test('supports text input interaction', async ({ page }) => {
// 		const input = page.getByLabel('Some text input');
// 		await input.fill('Matrix hello');
// 		await expect(input).toHaveValue('Matrix hello');
// 	});

// 	test('supports checkbox interaction', async ({ page }) => {
// 		const cb = page.getByLabel('Checkbox', { exact: true });
// 		await cb.check();
// 		await expect(cb).toBeChecked();
// 		await cb.uncheck();
// 		await expect(cb).not.toBeChecked();
// 	});

// 	test('supports select interaction', async ({ page }) => {
// 		const select = page
// 			.locator(FORM_CE)
// 			.locator('select[name="Primitives.Enumerations.Selects.StringList"]');
// 		await select.selectOption('Hello');
// 		await expect(select).toHaveValue('Hello');
// 	});

// 	test('has no axe-core violations in owned tree', async ({ page }) => {
// 		const results = await new AxeBuilder({ page }).include(FORM_CE).analyze();
// 		expect(results.violations).toEqual([]);
// 	});
// });

// test.describe('Generics host canary :: React island', () => {
// 	test('mounts deterministic canary island', async ({ page }) => {
// 		await page.goto('/test-generics/?fw=react');
// 		await expect(page.locator('#framework-host')).toContainText('react');
// 		await expect(
// 			page.locator('is-land[load="GenericsCanaryReact"]'),
// 		).toBeVisible();
// 		await expect(page.locator('#react-canary-note')).toBeVisible();
// 	});
// });
