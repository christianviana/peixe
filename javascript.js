var paginaDeDados = "ciclos";
var refeicoes;


// carrega primeira vez e configura página para recarregar automaticamente a cada 20s
$(document).ready(function () {
	limpaECarregaTabela();
	
	$('#modalRefeicao').on('show.bs.modal', function (event) {
  		var button = $(event.relatedTarget) // Button that triggered the modal
		var titulo = button.data('titulo')
		var nomeRefeicao = button.data('nome-refeicao')  		
		var qtdRefeicao = button.data('qtd-refeicao')
		var horaRefeicao = button.data('hora-refeicao') // Extract info from data-* attributes
		// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  		// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  		var modal = $(this)
  		modal.find('.modal-title').text(titulo)
		modal.find('#refeicao-nome').val(nomeRefeicao)	
  		modal.find('#refeicao-hora').val(horaRefeicao)
		modal.find('#refeicao-qtd').val(qtdRefeicao)
		modal.find('#refeicao-output').text(qtdRefeicao)		
	})
	
	//setInterval(function () { limpaECarregaTabela(); }, 20000);
});


function limpaECarregaTabela() {
	console.log(dataFormatada() + 'carregando dados...');
	$.ajax({
		url: paginaDeDados, success: function (result) {
			//$("#tabelaCiclos").html("");			
			insereLinhas(result);
		}, cache: false
	});
	console.log(dataFormatada() + 'OK!');
}

function insereLinhas(result) {
	refeicoes = JSON.parse(result);
	var qtd = refeicoes.Ciclos.length;

	for (var numLinha = 0; numLinha < qtd; numLinha++) {
		$("#tabelaCiclos").append(criaLinhaCiclo(refeicoes.Ciclos[numLinha]));
	}	
}

function criaLinhaCiclo(ciclo) {	
	var txtCiclo = "<a href='#' class='list-group-item list-group-item-action flex-column align-items-start' ";
	txtCiclo += "data-dismiss='modal' data-toggle='modal' data-target='#modalRefeicao'";
	txtCiclo += `data-nome-refeicao=${ciclo.NOME} data-titulo=${ciclo.NOME} data-hora-refeicao=${ciclo.HORA} data-qtd-refeicao=${ciclo.QTD}>`;
	txtCiclo += '<div class="d-flex w-100 justify-content-between align-items-center">';
	txtCiclo += `<h5 class="mb-1">${ciclo.NOME}</h5>`;
	txtCiclo += `<small>${ciclo.HORA}</small>`;
	txtCiclo += `<span class="badge badge-primary badge-pill">${ciclo.QTD}</span>`;
	txtCiclo += '</div>';
	txtCiclo += '</a>';
	return txtCiclo;
}

function novoCiclo(elemento) {
	
//	refeicoes.Ciclos.
	//$("#tabelaCiclos").html("");			
//	insereLinhas(result);
	//var ciclo = new JSON();
	//ciclo.append	
	
	alert('Inserir elemento novo');
	
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
