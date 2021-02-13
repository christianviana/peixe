var paginaDeDados = "ciclos";
var refeicoes;


// carrega primeira vez e configura página para recarregar automaticamente a cada 20s
$(document).ready(function () {
	limpaECarregaTabela();
	setInterval(function () { limpaECarregaTabela(); }, 20000);
});


function limpaECarregaTabela() {
	console.log(dataFormatada() + 'carregando dados...');
	$.ajax({
		url: paginaDeDados, success: function (result) {
			$("#interruptoresRow").html("");
			$("#temperaturaRow").html("");
			$("#umidadeRow").html("");
			insereLinhas(result);
		}, cache: false
	});
	console.log(dataFormatada() + 'OK!');
}


//function novoCiclo() {
//	$("#interruptoresRow").append(criaInterruptor(pagina.Dispo[numLinha]));
//}

function insereLinhas(result) {

	refeicoes = JSON.parse(result);
	var qtd = refeicoes.Ciclos.length;

	for (var numLinha = 0; numLinha < qtd; numLinha++) {
		$("#tabelaCiclos").append(criaCiclo(refeicoes.Ciclos[numLinha]));
	}
}

function criaCiclo(ciclo) {
	var txtCiclo = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">';
	txtCiclo += '<div class="d-flex w-100 justify-content-between align-items-center">';
	txtCiclo += `<h5 class="mb-1">${ciclo.NOME}</h5>`;
	txtCiclo += `<small>${ciclo.HORA}</small>`;
	txtCiclo += `<span class="badge badge-primary badge-pill">${ciclo.QTD}</span>`;
	txtCiclo += '</div>';
	txtCiclo += '</a>';
	return txtCiclo;
}


// Usa AJAX pra só recarregar o botão que mudou
function muda(sequencia) {
	console.log(dataFormatada() + 'clicou no botão de sequência ' + sequencia);
	var urlParaMudar = pagLigaLed + "?" + sequencia;
	$(`#EspButton_${sequencia}`).toggleClass('imgPiscando');
	$.ajax({
		url: urlParaMudar, success: function (result) {
			//$(`#EspButton_${sequencia}`).toggleClass('imgPiscando');
			// Aqui é onde podem ser feitas as mudanças via Ajax para refletir a mudança de estado do LED no componente Web que o representar
			console.log(dataFormatada() + 'resposta do clique no botão de sequência ' + sequencia + ': ' + result);
			//var pagina = JSON.parse(result);
			//var qtd = pagina.Dispo.length;
			// Por segurança, só altera se o resultado tem apenas um dispositivo, e com o mesmo sequencial que foi enviado
			//if (qtd === 1 && sequencia === pagina.Dispo[0].SEQ) {
			//	$(`#Botao_${sequencia}`).replaceWith(criaInterruptor(pagina.Dispo[0]));
		}
	});
	// Após ajustar o estado do LED, setta a página para recarregar em 0,5s, 
	// para buscar novamente o estado do botão LED do servidor
	// Este tempo pode ser necessário para que o estado se modifique no dispositivo remoto
	setTimeout(function () { limpaECarregaTabela(); }, 2000);
}

function dataFormatada() {
	var d = new Date();
	var retorno = completaZerosEsquerda(d.getHours()) + ':';
	retorno += completaZerosEsquerda(d.getMinutes()) + ':';
	retorno += completaZerosEsquerda(d.getSeconds()) + '.';
	retorno += d.getMilliseconds();
	retorno += ' -> ';
	return retorno;
}

function completaZerosEsquerda(numero) {
	return numero < 10 ? '0' + numero : numero;
}
