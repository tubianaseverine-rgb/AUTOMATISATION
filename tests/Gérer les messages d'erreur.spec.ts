import { test, expect } from '@playwright/test';
import { LoginPage } from '../models/LoginPage';
// Note: Pas besoin de PaiementPage ici car on teste uniquement la connexion

test('Afficher erreur de connexion', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Connexion avec un user bloqué
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  // 2. Localiser le conteneur d'erreur
  // Sur SauceDemo, l'attribut est data-test="error", donc on utilise locator ou getByText
  const errorContainer = page.locator('[data-test="error"]');
  await expect(errorContainer).toBeVisible();

  // 3. Vérification du TEXTE
  await expect(errorContainer).toContainText('Sorry, this user has been locked out');

  // 4. Vérifier les icônes d'erreur (les "X" rouges dans les champs)
  // Utilise .locator pour une classe CSS (commence par un point)
  const errorIcons = page.locator('.error_icon');
  
  // Note : Sur certains navigateurs, il y en a 2 ou 3 selon le rendu. 
  // Vérifions qu'il y en a au moins une.
  await expect(errorIcons).toHaveCount(2); 

  // 5. Cliquer sur le bouton de fermeture (la croix "X" dans le bandeau rouge)
  // Le bouton a la classe .error-button
  await page.locator('.error-button').click();

  // 6. Vérifier la disparition
  // On vérifie que le conteneur n'est plus visible
  await expect(errorContainer).toBeHidden();
  
  // On vérifie que les icônes dans les champs ont aussi disparu
  await expect(errorIcons).toHaveCount(0);

  console.log('✅ Le message d\'erreur et les icônes ont bien été fermés !');
});