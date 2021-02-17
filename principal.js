var paginaDeDados = "status";
var dadosStatus;


// carrega dados e preenche página
// configura página para recarregar automaticamente a cada 20s
$(document).ready(function () {	
	buscaDadosStatus();
	setInterval(function () { buscaDadosStatus(); }, 20000);
});

function buscaDadosStatus() {
	console.log(dataFormatada() + 'carregando dados...');
	$.ajax({
		url: paginaDeDados, success: function (result) {						
			dadosStatus = JSON.parse(result);
			limpaECarregaTabela(dadosStatus);
		}, cache: false
	});
	console.log(dataFormatada() + 'OK!');
}

function limpaECarregaTabela(dadosStatus) {	
	var qtd = dadosStatus.length;
	var ciclo;	
	$("#tabela-status").html("");
	for (var numLinha = 0; numLinha < qtd; numLinha++) {
		ciclo = refeicoes.Ciclos[numLinha];				
		$("#tabela-status").append(criaLinhaCiclo(ciclo.SEQ, ciclo.NOME, ciclo.HORA, ciclo.QTD));
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
