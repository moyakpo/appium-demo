const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

Given("que la aplicación de Wikipedia está abierta", async () => {
  // Abrir la aplicación usando Appium
});

When("el usuario saltea la intro de la app del primer uso", async () => {
  const el1 = await $("id:org.wikipedia:id/fragment_onboarding_forward_button");
  await el1.click();
  await el1.click();
  await el1.click();

  const el2 = $("id:org.wikipedia:id/fragment_onboarding_done_button");
  await el2.click();
});

When('el usuario ingresa "appium" en la barra de búsqueda', async () => {
  const el3 = await $(
    '-android uiautomator:new UiSelector().text("Search Wikipedia")'
  );
  await el3.waitForDisplayed();
  await el3.click();
  const el4 = await $("id:org.wikipedia:id/search_src_text");
  await el4.addValue("appium");
});

When("seleciona el primer articulo", async () => {
  const el5 = await $(
    '-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(1)'
  );
  await el5.click();
});

Then('se muestra el artículo titulado "Appium"', async () => {
  const el6 = await $("accessibility id:Close");
  await el6.waitForDisplayed();
  await el6.click();

  const el8 = await $(
    '-android uiautomator:new UiSelector().text("Appium").instance(0)'
  );
  const tituloArticulo = await el8.getText();
  assert.strictEqual(tituloArticulo, "Appium");
});
