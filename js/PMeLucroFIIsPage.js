(function ($) {
    "use strict"; // Start of use strict
    // debug();
    $(`#divVenda input`).keyup(function() {
        let qtdVenda = convertStringToFloat($("#qtdVenda").val());
        let vlrCota = convertStringToFloat($("#vlrCotaVenda").val());
        let taxasVenda = convertStringToFloat($("#taxasVenda").val());

        let totalRecebido = formatarMonetario((qtdVenda * vlrCota) - taxasVenda);
        $("#totalRecebido").val(totalRecebido);
    });
    let id=1;

    addLinha();
    $('#addLine').click(addLinha);
    function addLinha() {
        id++;
        $('#divCompras').append(`
        <div class="form-group row" id="divCompra-${id}">
            <div class="col-md-2 mb-3 mb-sm-0">
                <label class="col-md-12 control-label" for="qtdCompra-${id}">Quantidade</label>
                <input name="qtdCompra-${id}" type="number" placeholder="Quantidade de cotas"
                    class="form-control input-md qtdCompra" required>
            </div>
    
            <div class="col-md-2 mb-3 mb-sm-0">
                <label class="col-md-12 control-label" for="vlrCotaCompra-${id}">Valor da Cota (R$)</label>
                <input name="vlrCotaCompra-${id}" type="text" placeholder="Quanto foi pago pela cota"
                    class="form-control input-md mascaraMonetaria vlrCotaCompra" required>
            </div>
    
            <div class="col-md-2 mb-3 mb-sm-0">
                <label class="col-md-12 control-label" for="taxasCompra-${id}">Taxas (R$)</label>
                <input name="taxasCompra-${id}" type="text" placeholder="Total de taxas"
                    class="form-control input-md mascaraMonetaria taxasCompra" required>
            </div>
    
            <div class="col-md-2 mb-3 mb-sm-0">
                <label class="col-md-12 control-label" for="totalPago-${id}">Total Pago (R$)</label>
                <input name="totalPago-${id}" type="text" 
                    class="form-control input-md totalPago" readonly>
            </div>
    
            <div class="col-md-2 mb-3 mb-sm-0 align-self-center">
                <br>
                <button type="button" class="btn btn-danger" onclick="remover(${id})">
                    <i class="fa fa-trash" data-toggle="tooltip" title="Remover"></i>
                </button>
            </div>
        </div>`);

        $('.mascaraMonetaria').mask("#.##0,00", { reverse: true });
        $(`#divCompra-${id} input`).keyup(function() {
            let linha = $(this).parent(`div`).parent(`div`);
            let qtdCompra = convertStringToFloat(linha.find(".qtdCompra").val());
            let vlrCota = convertStringToFloat(linha.find(".vlrCotaCompra").val());
            let taxasCompra = convertStringToFloat(linha.find(".taxasCompra").val());
    
            let totalPago = formatarMonetario((qtdCompra * vlrCota) + taxasCompra);
            linha.find(".totalPago").val(totalPago);
        });
    }

    $('#calcular').on('click', function() {
        event.preventDefault();
        if(!$('#formDarfFii').valid()){
            $('#alertaDarfFii').show();
            return;
        }
        $('#alertaDarfFii').hide();
    
        let vlrMedioCompra = obterMediaCompra();
        let qtdVenda = convertStringToFloat($("#qtdVenda").val());
        let totalRecebido = convertStringToFloat($("#totalRecebido").val());

        let lucroVenda = totalRecebido - qtdVenda*vlrMedioCompra;
        let IRDevido = (lucroVenda>0) ? lucroVenda*0.2 : 0;
        let dedoDuro = IRDevido * 0.00005;

        console.log("Valores sobre a venda de " + qtdVenda + " cotas do " + $("#nome").val());
        console.log("Valor Médio Compra: " + vlrMedioCompra);
        console.log("Lucro Líquido: " + lucroVenda);
        console.log("Imposto de Renda Devido(20%): " + IRDevido);
        console.log("Dedo Duro(0,005): " + dedoDuro);
        console.log("IR - Dedo Duro: " + IRDevido-dedoDuro);
    });
    
    function obterMediaCompra(){
        let linhasCompra = $('#divCompras').children();
        let qtdTotal = 0;
        let valorTotal = 0;
    
        linhasCompra.each(function(index, element){
            qtdTotal+=convertStringToFloat($(element).find(".qtdCompra").val());
            valorTotal+=convertStringToFloat($(element).find(".totalPago").val());
        });
    
        let mediaCompra = valorTotal/qtdTotal; // Média de todas as compras
        return mediaCompra;
    }
})(jQuery); // End of use strict

function remover(idElemento) {
    $(`#divCompra-${idElemento}`).remove();
}