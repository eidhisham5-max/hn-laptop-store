import { test, expect } from '@playwright/test'

test('home -> product -> add to cart -> cart -> checkout (COD)', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('text=Premium Laptops')).toBeVisible()

  await page.click('a:has-text("View All Products")')
  await page.waitForURL('**/products')
  await expect(page.locator('text=Find your next laptop')).toBeVisible()

  // Open first product
  const firstCard = page.locator('a[href^="/products/"]').first()
  await firstCard.click()
  await expect(page.locator('text=Add to Cart')).toBeVisible()

  // Add to cart
  await page.click('text=Add to Cart')

  // Go to cart
  await page.click('a[href="/cart"]')
  await expect(page.locator('text=Your Cart')).toBeVisible()

  // Fill customer info
  await page.fill('input[placeholder="Full name"]', 'Test User')
  await page.fill('input[placeholder="Phone number"]', '01000000000')
  await page.fill('textarea[placeholder="Delivery address"]', 'Cairo, Egypt')

  // Checkout COD
  await page.click('text=Checkout (Cash on Delivery)')
  await page.waitForURL('**/cart/success**')
  await expect(page.locator('text=تم تسجيل طلبك بنجاح')).toBeVisible()
})


