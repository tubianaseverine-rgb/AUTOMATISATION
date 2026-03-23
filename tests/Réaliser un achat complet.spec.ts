import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/LoginPage';
import { PaiementPage } from '../models/PaiementPage';

test('Achat réussi du sac à dos', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const paiementPage = new PaiementPage(page);

  // 1. Connexion
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Vérifier qu'on est sur la boutique
  await expect(page).toHaveURL(/inventory.html/);

  // 3. Ajouter au panier
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  // 4. Vérifier le badge du panier (doit afficher 1)
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText('1');
  
  // 5. Aller au panier et vérifier le nom du produit
  await page.getByTestId('shopping-cart-link').click();
  await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');

// 6. Aller au paiement et remplir le formulaire
  await page.getByTestId('checkout').click();
  await expect(page).toHaveURL(/checkout-step-one.html/);
  await paiementPage.login('dupond', 'severine', '59000');
  await page.getByTestId('continue').click();
  await expect(page).toHaveURL(/checkout-step-two.html/);
  await page.getByTestId('finish').click();
  // 5. Vérifier le message de remerciement du paiement
  await expect(page).toHaveURL(/checkout-complete.html/);
  const msgPaiement = page.getByTestId('complete-header');
  await expect(msgPaiement).toHaveText('Thank you for your order!');

});
