(function($) {
    "use strict"; // Start of use strict

    $('#calcular').click(function(){
        let result1 = quantoPorcentoE($("#a1").val(), $("#b1").val());
        $("#result1").html(result1);

        let result2 = porcentagemDe($("#a2").val(), $("#b2").val());
        $("#result2").html(result2);

        let valor3 = Number($("#a3").val());
        let result3 = porcentagemDe($("#b3").val(), valor3);
        $("#result3").html(valor3+result3);

        let valor4 = Number($("#a4").val());
        let result4 = porcentagemDe($("#b4").val(), valor4);
        $("#result4").html(valor4-result4);
    });
})(jQuery); // End of use strict