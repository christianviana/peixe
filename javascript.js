var paginaDeDados = "ciclos";
var refeicoes;


// carrega dados e preenche página
$(document).ready(function () {	
	buscaDadosCiclos();
	preparaModal();		
});

function preparaModal() {
	$('#modalRefeicao').on('show.bs.modal', function (event) {
  		var button = $(event.relatedTarget) // Button that triggered the modal		
		var titulo = button.data('titulo')
		var seqRefeicao = button.data('seq-refeicao')
		var nomeRefeicao = button.data('nome-refeicao')  		
		var qtdRefeicao = button.data('qtd-refeicao')
		var horaRefeicao = button.data('hora-refeicao') // Extract info from data-* attributes
		// If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  		// Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  		var modal = $(this)
  		modal.find('.modal-title').text(titulo)
		modal.find('#refeicao-nome').val(nomeRefeicao)
		modal.find('#refeicao-seq').val(seqRefeicao)		
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
		$("#tabelaCiclos").append(criaLinhaCiclo(ciclo.SEQ, ciclo.NOME, ciclo.HORA, ciclo.QTD));
	}	
}

function criaLinhaCiclo(seq, nome, hora, qtd) {	
	var txtCiclo = "<a href='#' class='list-group-item list-group-item-action flex-column align-items-start' ";
	txtCiclo += "data-dismiss='modal' data-toggle='modal' data-target='#modalRefeicao'";
	txtCiclo += " data-seq-refeicao=" + seq;	
	txtCiclo += " data-titulo=" + nome;
	txtCiclo += " data-nome-refeicao=" + nome;
	txtCiclo += " data-hora-refeicao=" + hora; 
	txtCiclo += " data-qtd-refeicao=" + qtd + ">";
	txtCiclo += '<div class="d-flex w-100 justify-content-between align-items-center">';
	txtCiclo += `<p class="mb-1">${hora} - ${nome}</p>`;	
	txtCiclo += `<span class="badge badge-primary badge-pill">${qtd}</span>`;
	txtCiclo += '</div>';
	txtCiclo += '</a>';
	return txtCiclo;
}

function novoCiclo(seq, nome, hora, qtd) {
	//alert('Inserir elemento novo: ' + nome.val() + " / " + hora.val() + " / " + qtd.val());
	seq = seq.val();
	var tam = refeicoes.Ciclos.length;		
	if (seq == '') {
		// fazer esquema pra calcular o maior seq ao invés de pegar o tamanho do vetor
		// pois com as exclusões, o maior pode ser maior que o tamanho do vetor 
		seq = tam;
	}; 
	// não está editando o nome?
	refeicoes.Ciclos[seq] = {SEQ: seq, NOME: nome.val(), HORA: hora.val(), QTD: qtd.val()};
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
