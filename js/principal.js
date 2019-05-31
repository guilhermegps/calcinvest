(function($) {
    "use strict"; // Start of use strict
  
    $("#loadCalculadora").load("page/component/calculadora.html");

    $('#contato').click(function(){
        $("#loadPage").load("page/contato.html");
    });
})(jQuery); // End of use strict