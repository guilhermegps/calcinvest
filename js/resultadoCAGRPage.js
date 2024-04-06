(function ($) {
    "use strict"; // Start of use strict

    $('#periodo').html(valoresCalculados.periodo);
    $('#cagrJuros').html(formatarMonetario(valoresCalculados.cagr) + '%');
    $('#acumulado').html(formatarMonetario(valoresCalculados.acumulado) + '%');
    $('#quantasVezes').html(formatarMonetario(valoresCalculados.quantasVezes));

})(jQuery); // End of use strict