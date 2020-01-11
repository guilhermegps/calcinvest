(function($) {
    "use strict"; // Start of use strict
    // debug();
    let id=1;

    addLinha();
    $('#addLine').click(addLinha);
    function addLinha(){
        id++;
        $('#divCompras').append(`
        <div class="form-group row" id="${id}">
            <div class="col-md-2 mb-3 mb-sm-0">
                <label class="col-md-12 control-label" for="qtdCompra">Quantidade</label>
                <input name="qtdCompra" type="number" placeholder="Quantidade de cotas"
                    class="form-control input-md" required>
            </div>
    
            <div class="col-md-2 mb-3 mb-sm-0">
                <label class="col-md-12 control-label" for="vlrCotaCompra">Valor da Cota (R$)</label>
                <input name="vlrCotaCompra" type="text" placeholder="Quanto foi pago pela cota"
                    class="form-control input-md mascaraMonetaria" required>
            </div>
    
            <div class="col-md-2 mb-3 mb-sm-0">
                <label class="col-md-12 control-label" for="taxasCompra">Taxas (R$)</label>
                <input name="taxasCompra" type="text" placeholder="Total de taxas"
                    class="form-control input-md mascaraMonetaria" required>
            </div>
    
            <div class="col-md-2 mb-3 mb-sm-0">
                <label class="col-md-12 control-label" for="totalPago">Total Pago (R$)</label>
                <input name="totalPago" type="text" class="form-control input-md" readonly>
            </div>
    
            <div class="col-md-2 mb-3 mb-sm-0 align-self-center">
                <br>
                <button type="button" class="btn btn-danger" onclick="remover(${id})">
                    <i class="fa fa-trash" data-toggle="tooltip" title="Remover"></i>
                </button>
            </div>
        </div>`);

        $('.mascaraMonetaria').mask("#.##0,00", {reverse: true});
    }
})(jQuery); // End of use strict

function remover(idElemento){
    $('#'+idElemento).remove();
}