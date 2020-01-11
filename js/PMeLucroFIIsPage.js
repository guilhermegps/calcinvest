let id=1;
(function($) {
    "use strict"; // Start of use strict
    // debug();
    let linhaCotaCompra = `
    <div class="form-group row" id="${id}">
        <div class="col-md-2 mb-3 mb-sm-0">
            <label class="col-md-12 control-label" for="qtdCompra">Quantidade</label>
            <input name="qtdCompra" type="text" placeholder="Quantidade de cotas"
                class="form-control input-md" required>
        </div>

        <div class="col-md-2 mb-3 mb-sm-0">
            <label class="col-md-12 control-label" for="vlrCotaCompra">Valor da Cota</label>
            <input name="vlrCotaCompra" type="text" placeholder="Quanto foi pago pela cota"
                class="form-control input-md" required>
        </div>

        <div class="col-md-2 mb-3 mb-sm-0">
            <label class="col-md-12 control-label" for="taxasCompra">Taxas</label>
            <input name="taxasCompra" type="text" placeholder="Total de taxas"
                class="form-control input-md" required>
        </div>

        <div class="col-md-2 mb-3 mb-sm-0">
            <label class="col-md-12 control-label" for="totalPago">Total Pago</label>
            <input name="totalPago" type="text" class="form-control input-md" readonly>
        </div>

        <div class="col-md-2 mb-3 mb-sm-0 align-self-center">
            <br>
            <button type="button" class="btn btn-danger" onclick="remover(${id})">
                <i class="fa fa-trash" data-toggle="tooltip" title="Remover"></i>
            </button>
        </div>
    </div>`;

    $('#divCompras').html(linhaCotaCompra);
    $('#addLine').click(function(){
        $('#divCompras').append(linhaCotaCompra);
        id++;
    });
})(jQuery); // End of use strict

function remover(idElemento){
    $('#'+idElemento).remove();
}