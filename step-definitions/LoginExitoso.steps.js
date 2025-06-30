const { Given, When, Then } = require("@wdio/cucumber-framework");
const expect = require("@wdio/globals").expect;
const { usePatron } = require("../utils/patron");

Given("la app muestra la pantalla de Splash", async () => {
  await $("android.widget.ImageView").waitForExist({ timeout: 20000 });
});

When("el usuario presiona el botón {string}", async (TextoBoton) => {
  console.log(`🔘 Presionando el botón: ${TextoBoton}`);
  const btnToPress = await $(`android=new UiSelector().textContains("${TextoBoton}")`);
  await btnToPress.waitForDisplayed({ timeout: 20000 });
  console.log("🟢 Botón encontrado, procediendo a hacer clic...");
  await btnToPress.click();
});

When("elige el tipo de documento {string}", async (TipoDocumento) => {
  const selector = await $('android=new UiSelector().textContains("Selecciona un tipo de identificación")');
  await selector.click();
  const opcion = await $(`android=new UiSelector().textContains("${TipoDocumento}")`);
  await opcion.click();
});

When("ingresa el número de cédula {string}", async (CedulaIdentidad) => {
  const input = await $('android=new UiSelector().resourceId("RNE__Input__text-input")');

  if (!(await input.isEnabled())) {
    await driver.touchPerform([{ action: "tap", options: { x: 600, y: 1100 } }]);
    await driver.pause(500);
  }

  await input.waitForDisplayed({ timeout: 5000 });

  try {
    await input.clearValue();
  } catch (e) {
    console.warn("No se pudo limpiar el campo");
  }

  await input.setValue(CedulaIdentidad);
  await driver.hideKeyboard();
});

When("presiona el botón {string}", async (TextoBoton) => {
  const boton = await $(`android=new UiSelector().text("${TextoBoton}")`);
  await boton.waitForDisplayed({ timeout: 5000 });
  await boton.click();
});

When("dibuja el patrón de desbloqueo {string}", async (Patron) => {
  await usePatron("pattern-lock-gesture-handler", "outer", Patron);
});

Then("debería visualizar la pantalla de inicio correctamente", async () => {
  console.log("🔍 Buscando pantalla de inicio...");
  await driver.pause(7000); // extendido para dar tiempo a cargar

  try {
    const pantallaInicio = await $('android=new UiSelector().textMatches(".*Inicio.*")');
    await expect(pantallaInicio).toBeDisplayed();
  } catch (error) {
    await driver.saveScreenshot("./screenshots/error_login.png");
    throw error;
  }
});
