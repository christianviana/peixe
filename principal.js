var paginaDeDados = "status";
var dadosStatus;


// carrega dados e preenche página
// configura página para recarregar automaticamente a cada 20s
$(document).ready(function () {	
	buscaDadosStatus();
	setInterval(function () { buscaDadosStatus(); }, 20000);
});

function buscaDadosStatus() {
	console.log(dataFormatada() + 'Carregando dados de status...');
	$.ajax({
		url: paginaDeDados, success: function (result) {						
			dadosStatus = JSON.parse(result);
			limpaECarregaTabela(dadosStatus);
		}, cache: false
	});
	console.log(dataFormatada() + 'Dados de status - OK!');
}

function limpaECarregaTabela(dadosStatus) {	
	$('#hora-ultima').text(dadosStatus.HORA_ULTIMA);
	$('#qtd-ultima').text(dadosStatus.QTD_ULTIMA);
	$('#hora-proxima').text(dadosStatus.HORA_PROXIMA);
	$('#qtd-proxima').text(dadosStatus.QTD_PROXIMA);
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
