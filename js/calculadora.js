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
        let diasCorridos = diferencaEntreDatas(dataBase, dataTermino)-1;
        // let meses = (diasCorridos/anos)/12;
    
        objAux.totalInvestido = valorIni;
        objAux.valorTotalLiquido = valorIni;
        let rendimentoRestante = 0;
        for (let i = 1; i < diasCorridos; i++) {
            if(i%periodoRend==0){
                calculaRendimento(rendimento);
                if((diasCorridos-i)<periodoRend){
                    rendimentoRestante = (rendimento/periodoRend) * (diasCorridos-i);
                }
            } else if(rendimentoRestante>0){
                calculaRendimento(rendimentoRestante);
            }
            
            if(i%30==0){ // A cada mês
                objAux.totalInvestido+=incrementoMensal;
                objAux.valorTotalLiquido+=incrementoMensal;
            } 
        }
    
        objAux.valorTotalbruto = objAux.valorTotalLiquido + objAux.IRPago;
        objAux.lucroBruto = objAux.valorTotalbruto - objAux.totalInvestido;
        objAux.lucroLiquido = objAux.valorTotalLiquido - objAux.totalInvestido;
    
        valoresCalculados = objAux;

        function calculaRendimento(rendi){
            let rendimentoBruto = porcentagemDe(rendi, objAux.valorTotalLiquido);
            let IRPeriodo = porcentagemDe(ir, rendimentoBruto);
            let rendimentoLiquido = rendimentoBruto - IRPeriodo;
    
            objAux.valorTotalLiquido+=rendimentoLiquido;
            objAux.IRPago+=IRPeriodo;
        }
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

    // Diferença entre as datas em dias
    function diferencaEntreDatas(date1, date2){
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }
})(jQuery); // End of use strict