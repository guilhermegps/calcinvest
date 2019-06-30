var valoresCalculados;

(function($) {
    "use strict"; // Start of use strict
    
    $('#valorInicial').mask("#.##0,00", {reverse: true});
    $('#incrementoMensal').mask("#.##0,00", {reverse: true});
    $('#rendimento').mask('##0,000', {reverse: true});
    $('#anos').mask("000");
    $('#ir').mask('##0,00', {reverse: true});
    $("input[name='radios']").click(()=>{
        if($('#radios-sim').prop( "checked" )){
            $('#divIR').hide();
        } else{
            $('#divIR').show();
        }
    });

    $('#calcular').click(function(){
        event.preventDefault();
        if(!$('#formRendaFixa').valid()){
            $('#alertaCalculadoraRendaFixa').show();
            return;
        }
        $('#alertaCalculadoraRendaFixa').hide();

        calcular();
        $("#loadResultado").load("page/component/resultado.html");
        // $("#loadGraficoGlobal").load("page/component/graficoGlobal.html");
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
        let jurosRegressivo = $('#radios-sim').prop( "checked" );
        
        let dataBase = removerHHmmss(new Date());
        let dataTermino = removerHHmmss(new Date());
        dataTermino.setFullYear(dataBase.getFullYear() + anos);
        let diasTotais = diferencaEntreDatas(dataBase, dataTermino);
        let tempoRendimento = anos;
        if(periodoRend==2) tempoRendimento = anos*12;
        else if(periodoRend==3) tempoRendimento = diasTotais;
    
        ir = (jurosRegressivo) ? valueOfIR(diasTotais) : ir;
        objAux.valorTotalbruto = calcularJurosCompostos(valorIni, rendimento, tempoRendimento);
        objAux.totalInvestido = valorIni;
        objAux.IRPago = porcentagemDe(ir, objAux.valorTotalbruto-valorIni);
    
        let mesesTotais = anos*12;
        let diasPorMes = (diasTotais/mesesTotais);
        let rentabilidadeMes = (rendimento/12);
        if(periodoRend==2) rentabilidadeMes = rendimento;
        else if(periodoRend==3) rentabilidadeMes = rendimento * diasPorMes;
        for(let i=1; i<=mesesTotais; i++){
            let mesesRestantes = (mesesTotais-i);
            let rendimentoBruto = calcularJurosCompostos(
                incrementoMensal, 
                rentabilidadeMes,   
                mesesRestantes
            ) - incrementoMensal;
            let irCobrar = (jurosRegressivo) ? valueOfIR(diasPorMes * mesesRestantes) : ir
            let IRPeriodo = porcentagemDe(irCobrar, rendimentoBruto);
            
            objAux.valorTotalbruto += incrementoMensal + rendimentoBruto;
            objAux.totalInvestido += incrementoMensal;
            objAux.IRPago += IRPeriodo;
        }
        objAux.lucroBruto = objAux.valorTotalbruto - objAux.totalInvestido;
        objAux.valorTotalLiquido = objAux.valorTotalbruto - objAux.IRPago;
        objAux.lucroLiquido = objAux.valorTotalLiquido - objAux.totalInvestido;
    
        valoresCalculados = objAux;
    }
    
    /* F = P.((1 + i)^n)
        F = valor futuro (muitas vezes chamado de M ou "montante")
        P = valor presente (muitas vezes chamado de "principal")
        n = número de períodos (em dias, meses, anos, ... dependendo do contexto)
        i = taxa de juros (normalmente na forma percentual)
        J = juros
    */
    function calcularJurosCompostos(valor, juros, periodo){
        return valor*Math.pow(1 + (juros/100), periodo);
    }
    
    /* M.[((1+i)^n) - 1]/i
        M = mensalidade (ou outro pagamento periódico, também chamado PGTO ou PMT)
        n = número de períodos (em dias, meses, anos, ..., também chamado NPER)
        i = taxa de juros (normalmente na forma percentual, também chamado TAXA ou RATE)
    */
    function calcularJurosCompostosMensais(valor, juros, periodo){
        let taxaJuros = (juros/100);
        return valor*(Math.pow(1 + taxaJuros, periodo)- 1)/taxaJuros;
    }
    
    function removerHHmmss(data){
        data.setHours(0);
        data.setMilliseconds(0);
        data.setMinutes(0);
        data.setSeconds(0);
    
        return data;
    }
    
    function obterProxMes(data){
        let dataAux = new Date(data.getTime());
        dataAux.setMonth(data.getMonth() + 1);
        dataAux.setDate(data.getDate());
        return dataAux;
    }
    
    // Diferença entre as datas em dias
    function diferencaEntreDatas(date1, date2){
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }
})(jQuery); // End of use strict