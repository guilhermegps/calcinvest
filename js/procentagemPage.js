(function($) {
    "use strict"; // Start of use strict

    $('#calcular').click(function(){
        let result1 = quantoPorcentoE($("#a1").val(), $("#b1").val());
        $("#result1").html(result1);

        let result2 = porcentagemDe($("#a2").val(), $("#b2").val());
        $("#result2").html(result2);

        let inicial = Number($("#a3").val());
        let final = Number($("#b3").val());
        let result3 = diferencaEntre(inicial, final);
        $("#result3").html(result3);

        let valor4 = Number($("#a4").val());
        let result4 = porcentagemDe($("#b4").val(), valor4);
        $("#result4").html(valor4+result4);

        let valor5 = Number($("#a5").val());
        let result5 = porcentagemDe($("#b5").val(), valor5);
        $("#result5").html(valor5-result5);
    });
})(jQuery); // End of use strict