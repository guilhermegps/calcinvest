var valoresCalculados;

(function($) {
    "use strict"; // Start of use strict
    
    $('#valorInicial').mask("#.##0,00", {reverse: true});
    $('#incrementoMensal').mask("#.##0,00", {reverse: true});
    $('#rendimento').mask('##0,00', {reverse: true});
    $('#anos').mask("000");
    $('#ir').mask('##0,00', {reverse: true});

    $('#calcular').click(function(){
        calcular();
        $("#loadResultado").load("page/component/resultado.html");
        $("#loadGraficoGlobal").load("page/component/graficoGlobal.html");
        $("#loadGraficoPizza").load("page/component/graficoPizza.html");
    });

    function calcular(){
        const ANO = 1; const MES = 2;
    
        let objAux = {
            valorTotalbruto: 0,
            totalInvestido: 0,
            lucroBruto: 0,
            lucroLiquido: 0,
            valorTotalLiquido: 0,
            IRPago: 0
        };
        let periodoRend = convertStringToFloat($('#periodoRendimento').val());
        let valorIni = convertStringToFloat($('#valorInicial').val());
        let incrementoMensal = convertStringToFloat($('#incrementoMensal').val());
        let rendimento = convertStringToFloat($('#rendimento').val());
        let anos = convertStringToFloat($('#anos').val());
        let ir = convertStringToFloat($('#ir').val());
        
        let dataBase = removerHHmmss(new Date());
        let dataTermino = removerHHmmss(new Date());
        dataTermino.setFullYear(dataBase.getFullYear() + anos);
        let pcntRendMensal = (periodoRend==ANO) ? rendimento/12 : rendimento;
    
        objAux.totalInvestido = valorIni;
        let valorBase = valorIni;
        let contDias = 0;
        while(dataBase.getTime() < dataTermino.getTime()){
            dataBase.setDate(dataBase.getDate() + 1);
            dataBase = removerHHmmss(dataBase);
            contDias++;
            if(contDias==30){ // A cada mês
                let rendiMensalBruto = porcentagemDe(pcntRendMensal, valorBase);
                let IRMensal = porcentagemDe(ir, rendiMensalBruto);
                let rendiMensalLiquido = rendiMensalBruto - IRMensal;
    
                objAux.valorTotalLiquido=valorBase+rendiMensalLiquido;
                objAux.IRPago+=IRMensal;
                objAux.totalInvestido+=incrementoMensal;
    
                valorBase=objAux.valorTotalLiquido + incrementoMensal;
                contDias=0;
            } else if(dataBase.getTime() == dataTermino.getTime()){ // dias do último mês
                let rendiMensalBruto = porcentagemDe(pcntRendMensal, valorBase);
                let IRMensal = porcentagemDe(ir, rendiMensalBruto);
                let rendiMensalLiquido = rendiMensalBruto - IRMensal;
    
                objAux.valorTotalLiquido=valorBase+rendiMensalLiquido;
                objAux.IRPago+=IRMensal;
            }
        }
    
        objAux.valorTotalbruto = objAux.valorTotalLiquido + objAux.IRPago;
        objAux.lucroBruto = objAux.valorTotalbruto - objAux.totalInvestido;
        objAux.lucroLiquido = objAux.valorTotalLiquido - objAux.totalInvestido;
    
        valoresCalculados = objAux;
    }
    
    function porcentagemDe(porcentagem, valor){
        return (porcentagem*valor)/100;
    }
    
    function removerHHmmss(data){
        data.setHours(0);
        data.setMilliseconds(0);
        data.setMinutes(0);
        data.setSeconds(0);
    
        return data;
    }
})(jQuery); // End of use strict