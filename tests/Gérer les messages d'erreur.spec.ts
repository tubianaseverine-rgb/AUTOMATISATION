import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/LoginPage';
import { PaiementPage } from '../models/PaiementPage';

test('Afficher erreur de connexion', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const paiementPage = new PaiementPage(page);

  // 1. Connexion avec un user bloqué
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  // 2. Localiser le conteneur d'erreur
  const errorContainer = page.locator('[data-test="error"]');
  await expect(errorContainer).toBeVisible();

  // 3. Vérification du TEXTE
  // .toContainText est flexible, il vérifie si la phrase est présente
  await expect(errorContainer).toContainText('Sorry, this user has been locked out');

  // 4. Vérification de la COULEUR (Le style CSS)
  // On utilise getComputedStyle via une assertion Playwright
  //await expect(errorContainer).toHaveCSS('background-color', 'rgb(226, 35, 26)'); 
  // Note : En CSS, le rouge de SauceDemo est souvent un fond rouge avec du texte blanc.
  
  //Vérifier l'icône d'erreur
  const errorIcons = page.locator('.error_icon');
  await expect(errorIcons).toHaveCount(2); // Une pour le login, une pour le password
  await page.locator('.error-button').click();
  await expect(errorContainer).toHaveCSS('background-color', 'rgb(0, 0, 0)'); 
  // Vérifier la disparition
  // Playwright va attendre que l'élément disparaisse ou devienne caché
  await expect(errorIcons).toBeHidden();

  console.log('✅ Le message d\'erreur a bien été fermé !');
 
  
});
