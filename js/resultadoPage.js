(function ($) {
    "use strict"; // Start of use strict

    if(valoresCalculados.valorTotalbruto>0){
        $('#valorTotalbruto').html(formatarMonetario(valoresCalculados.valorTotalbruto));
        $('#totalInvestido').html(formatarMonetario(valoresCalculados.totalInvestido));
        $('#lucroLiquido').html(formatarMonetario(valoresCalculados.lucroLiquido));
        $('#lucroBruto').html(formatarMonetario(valoresCalculados.lucroBruto));
        $('#valorTotalLiquido').html(formatarMonetario(valoresCalculados.valorTotalLiquido));
        $('#IRPago').html(formatarMonetario(valoresCalculados.IRPago));
    
        carregarGrafico();
    }

    function carregarGrafico(){
        let investimento = quantoPorcentoE(valoresCalculados.totalInvestido, valoresCalculados.valorTotalbruto);
        let rendimento = quantoPorcentoE(valoresCalculados.lucroLiquido, valoresCalculados.valorTotalbruto);
        let impostos = quantoPorcentoE(valoresCalculados.IRPago, valoresCalculados.valorTotalbruto);

        let labels = ["Investimento", "Rendimento", "Impostos"];
        let valores = [investimento.toFixed(2), rendimento.toFixed(2), impostos.toFixed(2)];
        let coresPrincipais = ['#16a6ea', '#39d921', '#ff0000'];
        let coresSelecao = ['#67bfe9', '#86d07b', '#f77474'];
        $("#loadGraficoPizza").load("page/component/graficoPizza.html", 
            funcaoGraficoPizza(labels, valores, coresPrincipais, coresSelecao));
    }
})(jQuery); // End of use strict