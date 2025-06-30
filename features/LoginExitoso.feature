Feature: Login exitoso en la app CBR
  Como usuario quiero iniciar sesión con cédula válida y patrón correcto

  Scenario Outline: Login exitoso con cédula válida y patrón correcto
    Given la app muestra la pantalla de Splash
    When el usuario presiona el botón "Comenzá"
    And el usuario presiona el botón "Iniciá sesión"
    And elige el tipo de documento "<TipoDocumento>"
    And ingresa el número de cédula "<CedulaIdentidad>"
    And el usuario presiona el botón "Iniciá sesión"
    And dibuja el patrón de desbloqueo "<Patron>"
    Then debería visualizar la pantalla de inicio correctamente

    Examples:
      | TipoDocumento       | CedulaIdentidad  | Patron      |
      | cédula de identidad | 001-271089-5555A | 1-2-5-8-7-6 |
