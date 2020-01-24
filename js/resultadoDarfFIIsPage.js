(function ($) {
    "use strict"; // Start of use strict

        $('#tituloResultado').html(`Resultado - DARF ${valoresCalculados.nome}`);
        $('#valorMedioCompra').html('R$ ' + formatarMonetario(valoresCalculados.vlrMedioCompra));
        $('#totalCompras').html('R$ ' + formatarMonetario(valoresCalculados.totalCompras));
        $('#pctLucro').html(formatarMonetario(valoresCalculados.pctLucro) + '%');
        $('#lucroBruto').html('R$ ' + formatarMonetario(valoresCalculados.lucroBruto));
        $('#dedoDuro').html('R$ ' + formatarMonetario(valoresCalculados.dedoDuro));
        $('#vendaSemDedoDuro').html('R$ ' + formatarMonetario(valoresCalculados.vendaSemDedoDuro));

    if(valoresCalculados.IRDevido>0){
        $('#divValorDARF').show();
        $('#vlrDarfPagar').html('R$ ' + formatarMonetario(valoresCalculados.IRDevido));
    } else{
        $('#divValorDARF').hide();
    }
})(jQuery); // End of use strict