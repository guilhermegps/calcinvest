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