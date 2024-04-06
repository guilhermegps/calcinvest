function porcentagemDe(porcentagem, valor){
    if(isBlank(porcentagem) || isBlank(valor))
        return 0;

    return (porcentagem*valor)/100;
}

function quantoPorcentoE(valor, sobreOValor){
    if(isBlank(valor) || isBlank(sobreOValor))
        return 0;

    return (valor/sobreOValor)*100;
}

function diferencaEntre(inicial, final){
    if(isBlank(inicial) || isBlank(final))
        return 0;

    return ((final - inicial)/inicial) * 100;
}

function quantasVezes(percentual){
    if(isBlank(percentual))
        return 0;

    return (percentual/100) + 1;
}

function cagr(inicial, final, anos){
    if(isBlank(inicial) || isBlank(final) || isBlank(anos))
        return 0;

    return (Math.pow((final/inicial), (1/anos)) - 1) * 100;
}