var valoresCalculados = {
    valorTotalbruto: 0,
    totalInvestido: 0,
    lucroBruto: 0,
    valorTotalLiquido: 0,
    IRPago: 0
};

(function($) {
    "use strict"; // Start of use strict

    $('#calcular').click(function(){
        $("#loadResultado").load("page/component/resultado.html");
        $("#loadGraficoGlobal").load("page/component/graficoGlobal.html");
        $("#loadGraficoPizza").load("page/component/graficoPizza.html");
    });
})(jQuery); // End of use strict