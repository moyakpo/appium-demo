Feature: Búsqueda de artículos en la app de Wikipedia

  Scenario: Buscar un artículo existente
    Given que la aplicación de Wikipedia está abierta
    When el usuario saltea la intro de la app del primer uso
    When el usuario ingresa "appium" en la barra de búsqueda
    When seleciona el primer articulo
    Then se muestra el artículo titulado "Appium"
