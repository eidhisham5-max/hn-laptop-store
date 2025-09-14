import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/H.N Store/);
});

test('homepage has navigation', async ({ page }) => {
  await page.goto('/');

  // Expect navigation to be visible
  await expect(page.locator('nav')).toBeVisible();
});

test('homepage has hero section', async ({ page }) => {
  await page.goto('/');

  // Expect hero section to be visible
  await expect(page.locator('section').first()).toBeVisible();
});

test('products page loads', async ({ page }) => {
  await page.goto('/products');

  // Expect products page to load
  await expect(page).toHaveURL(/.*products/);
  await expect(page.locator('h1')).toContainText('المنتجات');
});

test('cart page loads', async ({ page }) => {
  await page.goto('/cart');

  // Expect cart page to load
  await expect(page).toHaveURL(/.*cart/);
  await expect(page.locator('h1')).toContainText('عربة التسوق');
});

test('checkout page loads', async ({ page }) => {
  await page.goto('/checkout');

  // Expect checkout page to load
  await expect(page).toHaveURL(/.*checkout/);
  await expect(page.locator('h1')).toContainText('إتمام الطلب');
});

test('search functionality works', async ({ page }) => {
  await page.goto('/products');

  // Find search input and type
  const searchInput = page.locator('input[placeholder*="ابحث"]');
  await searchInput.fill('MacBook');

  // Wait for results
  await page.waitForTimeout(1000);

  // Check if results are displayed
  const results = page.locator('[data-testid="product-card"]');
  await expect(results.first()).toBeVisible();
});

test('responsive design works', async ({ page }) => {
  await page.goto('/');

  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('nav')).toBeVisible();

  // Test tablet viewport
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.locator('nav')).toBeVisible();

  // Test desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page.locator('nav')).toBeVisible();
});

test('RTL layout works correctly', async ({ page }) => {
  await page.goto('/');

  // Check if RTL is applied
  const body = page.locator('body');
  await expect(body).toHaveAttribute('dir', 'rtl');
});

test('accessibility basics', async ({ page }) => {
  await page.goto('/');

  // Check for basic accessibility
  const main = page.locator('main');
  await expect(main).toBeVisible();

  // Check for heading structure
  const h1 = page.locator('h1');
  await expect(h1).toBeVisible();
});
