const { test, expect } = require("@playwright/test");

test("Main page has expected navbar with the desired contents.", async ({ page }) => {
    await page.goto("/");
    const topicsLink = await page.locator("nav a[href='/topics']");
    const quizLink = await page.locator("nav a[href='/quiz']");
    await expect(topicsLink).toHaveText("Topics");
    await expect(quizLink).toHaveText("Quiz");
    const heading = await page.locator("h1");
    await expect(heading).toHaveText("Quiz application");
});

test("Can access registration page from main page", async ({ page }) => {
    await page.goto("/");
    const registrationLink = await page.$('a[href="/auth/register"]');
    await registrationLink.click();
    await expect(page).toHaveURL('/auth/register');
});

test("Can access login page from main page", async ({ page }) => {
    await page.goto("/");
    const registrationLink = await page.$('a[href="/auth/login"]');
    await registrationLink.click();
    await expect(page).toHaveURL('/auth/login');
});

test("Accessing Topic Page Without Login", async ({ page }) => {
    await page.goto(`/topics`);
    await expect(page).toHaveURL('/auth/login');
  });

test("Accessing Quiz Page Without Login", async ({ page }) => {
    await page.goto(`/quiz`);
    await expect(page).toHaveURL('/auth/login');
  });

  test("Cannot register a blank account", async ({ page }) => {
    await page.goto('/auth/register');
    const registerButton = await page.locator("input[type='submit'][value='Register']");
    await registerButton.click();
    await page.waitForLoadState('domcontentloaded');
    const pageTextContent = await page.textContent('html');
    const emailErrorExists = pageTextContent.includes("email is required");
    const passwordErrorExists = pageTextContent.includes("password is required");
    expect(emailErrorExists).toBe(true);
    expect(passwordErrorExists).toBe(true);
});
  

test("Registering an account", async ({ page }) => {
    await page.goto('/auth/register');
    const email = "email@example.com";
    const password = "123456789";
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password][name='password']").type(password);
    await page.locator("input[type=submit][value='Register']").click();
});

test("Logging in an account", async ({ page }) => {
    await page.goto('/auth/login');
    const email = "email@example.com";
    const password = "123456789";
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password][name='password']").type(password);
    await page.locator("input[type=submit][value='Login']").click();
});

test("Normal user cannot create a topic", async ({page}) => {
    await page.goto('/topics');
    const inputTopicName = await page.locator("input[type='name']").count();
    expect(inputTopicName).toBe(0);
});

test("Normal user can access quiz page", async ({page}) => {
    await page.goto('/auth/login');
    const email = "email@example.com";
    const password = "123456789";
    await page.locator("input[type=email]").type(email);
    await page.locator("input[type=password][name='password']").type(password);
    await page.locator("input[type=submit][value='Login']").click();
    await page.goto('/quiz');
    await expect(page).toHaveURL('/quiz');
});

