var paginaDeDados = "status";
var dadosStatus;


// carrega dados e preenche página
// configura página para recarregar automaticamente a cada 20s
$(document).ready(function () {	
	buscaDadosStatus();
	setInterval(function () { buscaDadosStatus(); }, 20000);	
	checaAlimentado();	
});

function alimenta() {
	if (confirm("Tem certeza que deseja realizar uma alimentação manual agora?")) {
		window.location = "manual"
	}	

}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checaAlimentado() {
	var alimentado=getCookie("alimentado");
	if (alimentado == "true") {
    	alert("Seu peixe foi alimentado com sucesso!");
		deleteCookie("alimentado");			
	}          	
}

function deleteCookie(cname) {
  document.cookie = cname + "=\"false\"";
}

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
