(function($) {
    "use strict"; // Start of use strict
  
    $("#loadPage").load("page/principal.html");

    $('.pagina').click(function(){
        $("#loadPage").load(`page/${$(this).attr('name')}.html`);
    });
})(jQuery); // End of use strict