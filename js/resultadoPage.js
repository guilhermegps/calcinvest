(function($) {
    "use strict"; // Start of use strict

    $('#valorTotalbruto').html(formatarMonetario(valoresCalculados.valorTotalbruto));
    $('#totalInvestido').html(formatarMonetario(valoresCalculados.totalInvestido));
    $('#lucroLiquido').html(formatarMonetario(valoresCalculados.lucroLiquido));
    $('#lucroBruto').html(formatarMonetario(valoresCalculados.lucroBruto));
    $('#valorTotalLiquido').html(formatarMonetario(valoresCalculados.valorTotalLiquido));
    $('#IRPago').html(formatarMonetario(valoresCalculados.IRPago));
})(jQuery); // End of use strict