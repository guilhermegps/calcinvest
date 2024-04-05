var valoresCalculados = {
    periodo: 0,
    cagr: 0, 
    acumulado: 0,
    quantasVezes: 0
};
(function($) {
    "use strict"; // Start of use strict

    $('#calcular').on('click', e => {
        valida();

        let inicial = convertStringToFloat($("#valorInicial").val());
        let final = convertStringToFloat($("#valorFinal").val());
        let anos = convertStringToFloat($("#duracao").val());

        let acumulado = diferencaEntre(inicial, final);

        valoresCalculados.periodo = anos;
        valoresCalculados.cagr = cagr(inicial, final, anos);
        valoresCalculados.acumulado = acumulado;
        valoresCalculados.quantasVezes = quantasVezes(acumulado);
        $("#loadResultado").load("page/component/resultadoCAGR.html");
    });

    function valida(){
        if(!$('#formCalculo').valid()){
            $('#alerta').show();
            return;
        }
        $('#alerta').hide();
    }
})(jQuery); // End of use strict