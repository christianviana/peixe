var paginaDeDados = "ciclos";
var refeicoes;


// carrega primeira vez e configura página para recarregar automaticamente a cada 20s
$(document).ready(function () {
	
	buscaDadosCiclos();
	preparaModal();	
	//setInterval(function () { limpaECarregaTabela(); }, 20000);
	
});

function preparaModal() {
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
}


function buscaDadosCiclos() {
	console.log(dataFormatada() + 'carregando dados...');
	$.ajax({
		url: paginaDeDados, success: function (result) {						
			refeicoes = JSON.parse(result);
			limpaECarregaTabela(refeicoes);
		}, cache: false
	});
	console.log(dataFormatada() + 'OK!');
}

function limpaECarregaTabela(refeicoes) {	
	var qtd = refeicoes.Ciclos.length;
	var ciclo;	
	$("#tabelaCiclos").html("");
	for (var numLinha = 0; numLinha < qtd; numLinha++) {
		ciclo = refeicoes.Ciclos[numLinha];				
		$("#tabelaCiclos").append(criaLinhaCiclo(ciclo.NOME, ciclo.HORA, ciclo.QTD));
	}	
}

function criaLinhaCiclo(nome, hora, qtd) {	
	var txtCiclo = "<a href='#' class='list-group-item list-group-item-action flex-column align-items-start' ";
	txtCiclo += "data-dismiss='modal' data-toggle='modal' data-target='#modalRefeicao'";
	txtCiclo += `data-titulo=${nome+''} data-nome-refeicao=${nome} data-hora-refeicao=${hora} data-qtd-refeicao=${qtd}>`;
	txtCiclo += '<div class="d-flex w-100 justify-content-between align-items-center">';
	txtCiclo += `<h5 class="mb-1">${nome}</h5>`;
	txtCiclo += `<small>${hora}</small>`;
	txtCiclo += `<span class="badge badge-primary badge-pill">${qtd}</span>`;
	txtCiclo += '</div>';
	txtCiclo += '</a>';
	return txtCiclo;
}

function novoCiclo(nome, hora, qtd) {
	//alert('Inserir elemento novo: ' + nome.val() + " / " + hora.val() + " / " + qtd.val());
	var tam = refeicoes.Ciclos.length;	
	refeicoes.Ciclos[tam] = {SEQ: tam, NOME: nome.val(), HORA: hora.val(), QTD: qtd.val()};
	limpaECarregaTabela(refeicoes);
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
