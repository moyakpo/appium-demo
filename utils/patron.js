const usePatron = async (patronPadName = "", pointSelectorName = "", patronString) => {
  const patron = patronString.split("-").map((p) => Number.parseInt(p.trim()));
  const patronPad = await $(`android=new UiSelector().resourceId("${patronPadName}")`);
  await patronPad.waitForExist({ timeout: 20000 });
  const pointsLocation = await getPointsLocations(pointSelectorName);

  const actionsSequence = browser.action("pointer", { parameters: { pointerType: "touch" } });
  await actionsSequence.move({ x: pointsLocation[patron[0]].x, y: pointsLocation[patron[0]].y });
  await actionsSequence.down();

  for (let i = 1; i < patron.length; i++) {
    const pointIndex = patron[i];
    await actionsSequence.move({ x: pointsLocation[pointIndex].x, y: pointsLocation[pointIndex].y });
  }
  await actionsSequence.up();

  console.log("🟡 Ejecutando acciones del patrón...");

  await actionsSequence.perform();

  console.log("🟢 Patrón dibujado exitosamente.");
  return pointsLocation;
};

const getPatronPointLocation = async (pointSelectorName) => {
  const pointSelector = await $(`android=new UiSelector().resourceId("${pointSelectorName}")`);
  await pointSelector
    .waitForExist({ timeout: 2000 })
    .then()
    .catch((err) => console.error("Error al esperar el punto:", err));
  const pointExists = await pointSelector.isExisting();
  if (pointExists) {
    const pointLocation = await pointSelector.getLocation();
    console.log(`🟡 Punto ${pointSelectorName} del patrón encontrado en:`, pointLocation);
    return pointLocation;
  } else null;
};

const getPointsLocations = async (pointSelectorName = "") => {
  pointsLocation = [];
  console.log("Voy por los puntos del patrón");

  for (let i = 0; i < 9; i++) {
    console.log("Voy por los puntos del patrón:", i + 1);
    const pointLocation = await getPatronPointLocation(`${pointSelectorName}-${i}`);
    pointsLocation[i] = pointLocation;
  }
  console.log("🟡 Ubicaciones de los puntos del patrón:", pointsLocation);
  return pointsLocation;
};

module.exports = {
  usePatron,
};
