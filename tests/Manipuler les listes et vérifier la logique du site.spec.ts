import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/LoginPage';
import { PaiementPage } from '../models/PaiementPage';

test('Trier les articles', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const paiementPage = new PaiementPage(page);

  // 1. Connexion
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Vérifier qu'on est sur la boutique
  await expect(page).toHaveURL(/inventory.html/);

  // 3. Changer le mode de tri (en haut à droite) pour "Price (low to high)".
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // 4. Récupérer TOUS les prix (Renvoie une liste de textes)
  // .allTextContents() est très pratique ici
  const pricesText = await page.locator('.inventory_item_price').allTextContents();

  // 5. Convertir les textes "$29.99" en nombres [29.99]
  const prices = pricesText.map(p => parseFloat(p.replace('$', '')));

  // 6. Assertion : Vérifier que le premier prix est bien le plus petit
  expect(prices[0]).toBeLessThanOrEqual(prices[prices.length - 1]);
    console.log(`Le moins cher est à ${prices[0]}$ et le plus cher à ${prices[prices.length - 1]}$`);
  
});
