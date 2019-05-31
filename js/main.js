(function($) {
    "use strict"; // Start of use strict
    let page = getUrlParameter('page');
    if(page)
        $("#loadPage").load(`page/${page}.html`);
    else
        $("#loadPage").load("page/principal.html");
})(jQuery); // End of use strict

//FORMATA VALORES MONETARIOS - 1009.9 ->R$ 1.009,90
function formatarMonetario(valor) {
    if(valor == null || valor == undefined || valor == '') return valor;
    return 'R$ ' + valor.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};