$(document).ready(function() {
    $('#cpf').inputmask('999.999.999-99');
});

function validaCPF() {
   const cpfFormatado = document.getElementById('cpf').value;

   const cpf = formataCPF(cpfFormatado);
   
   if(cpf.length != 11) {
    mostraResult('CPF deve conter 11 digitos', 'red');
    return;
   }

   if(verificarDigitoRepetidos(cpf)) {
    mostraResult('CPF invalido', 'red');
    return;
   }

   const digito1 = verificador(cpf, 1);
   const digito2 = verificador(cpf, 2);

   if(digito1 && digito2) {
    mostraResult('CPF valido', 'green')
    return;
   }

   if(!digito1 || !digito2) {
    mostraResult('CPF invalido', 'red')
    return;
   }
}

function verificador(cpf, posicao) {
    const sequencia = cpf.slice(0,8 + posicao).split('');

    let soma = 0;
    let mutiplicador = 9 + posicao;

    for(const numero of sequencia) {
        soma += mutiplicador * Number(numero);
        mutiplicador--;
    }

    const restoDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);

    return restoDivisao == digito;
}

function formataCPF(cpf) {
    const cpfFormatado = cpf.replace(/\D/g, '');

    return cpfFormatado;
}

function mostraResult(texto, cor) {
    const resultado = document.getElementById('resultado');

    resultado.innerHTML = texto;
    resultado.style.color = cor;
}

function verificarDigitoRepetidos(cpf) {
    return cpf.split('').every((d) => d === cpf[0]);
}