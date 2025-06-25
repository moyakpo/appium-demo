const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

Given("que abrí la aplicación de Wikipedia", async () => {
  // Abrir la aplicación usando Appium
});

When("busco {string}", async (articulo) => {
  // Buscar el artículo usando el input de búsqueda
});

Then("veo el artículo {string}", async (articulo) => {
  // Verificar que el título del artículo es el esperado
  const tituloArticulo = await $('[name="title"]').getText();
  assert.strictEqual(tituloArticulo, articulo);
});
