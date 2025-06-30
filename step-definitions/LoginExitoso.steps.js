const { Given, When, Then } = require("@wdio/cucumber-framework");
const expect = require("@wdio/globals").expect;

Given("la app muestra la pantalla de Splash", async () => {
  await $("android.widget.ImageView").waitForExist({ timeout: 10000 });
});

When("el usuario presiona el botón {string}", async (TextoBoton) => {
  console.log(`🔘 Presionando el botón: ${TextoBoton}`);
  const btnComenzar = await $(
    `android=new UiSelector().textContains("${TextoBoton}")`
  );
  await btnComenzar.click();
});

When("elige el tipo de documento {string}", async (TipoDocumento) => {
  const selector = await $(
    'android=new UiSelector().textContains("Selecciona un tipo de identificación")'
  );
  await selector.click();
  const opcion = await $(
    `android=new UiSelector().textContains("${TipoDocumento}")`
  );
  await opcion.click();
});

When("ingresa el número de cédula {string}", async (CedulaIdentidad) => {
  const input = await $(
    'android=new UiSelector().resourceId("RNE__Input__text-input")'
  );

  if (!(await input.isEnabled())) {
    await driver.touchPerform([
      { action: "tap", options: { x: 600, y: 1100 } },
    ]);
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
  const currentActivity = await driver.getCurrentActivity();
  console.log("🟡 Actividad actual antes del patrón:", currentActivity);

  await $("android.view.View").waitForExist({ timeout: 10000 });

  const patronMapeado = {
    1: { x: 270, y: 884 },
    2: { x: 809, y: 884 },
    3: { x: 1340, y: 884 },
    4: { x: 270, y: 1151 },
    5: { x: 807, y: 1151 },
    6: { x: 1340, y: 1151 },
    7: { x: 541, y: 1425 },
    8: { x: 804, y: 1425 },
    9: { x: 1340, y: 1425 },
  };

  const secuencia = Patron.split("-").map((p) => patronMapeado[p.trim()]);
  const acciones = [];

  for (let i = 0; i < secuencia.length; i++) {
    if (i === 0) {
      acciones.push({ action: "press", options: secuencia[i] });
    } else {
      acciones.push({ action: "wait", options: { ms: 100 } });
      acciones.push({ action: "moveTo", options: secuencia[i] });
    }
  }

  acciones.push({ action: "release" });
  await driver.touchPerform(acciones);
});

Then("debería visualizar la pantalla de inicio correctamente", async () => {
  console.log("🔍 Buscando pantalla de inicio...");
  await driver.pause(7000); // extendido para dar tiempo a cargar

  try {
    const pantallaInicio = await $(
      'android=new UiSelector().textMatches(".*Inicio.*")'
    );
    await expect(pantallaInicio).toBeDisplayed();
  } catch (error) {
    await driver.saveScreenshot("./screenshots/error_login.png");
    throw error;
  }
});
