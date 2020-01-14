(function($) {
    "use strict"; // Start of use strict
    $("#loadSidebar").load("page/component/sidebar.html");
    $("#loadFooter").load("page/component/footer.html");
    let page = getUrlParameter('page');
    if(page)
        $("#loadPage").load(`page/${page}.html`);
    else
        $("#loadPage").load("page/principal.html");
})(jQuery); // End of use strict

//FORMATA VALORES MONETARIOS - 1009.9 -> 1.009,90
function formatarMonetario(valor) {
    if(isBlank(valor)) return "0,00";
    return valor.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

function convertStringToFloat(valorString){
    if(isBlank(valorString)) return 0.00;

    return parseFloat(valorString.replace(/[-\\^$*+?.()|[\]{}]/g, "").replace(",", "."));
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    sURLVariables = sPageURL.split('&');

    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function valueOfIR(diasCorridos){
    if (diasCorridos<181) {
        return 22.5;
    } else if (diasCorridos<361) {
        return 20;
    } else if (diasCorridos<721) {
        return 17.5;
    } 
    
    return 15;
}

function isBlank(valor){
    if(!valor || valor=='')
        return true;

    return false;
}

function toogleButtonMenu(el){
    $(el).toggleClass('toggled-btn-menu');
    $("#loadSidebar").toggle();
}
