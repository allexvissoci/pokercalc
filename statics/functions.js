$(document).ready(function(){

	$('.carta').on('click', function(){

		var isEmUso = isCartaEmUso($(this));
		if(!isEmUso){
			
			if($('.hand-content').children().length < 2){
				$('.hand-content').append($(this)[0].outerHTML);
			}else if($('.flop-content').children().length < 3){
				$('.flop-content').append($(this)[0].outerHTML);
			}else{
				if($('.turn-content').children().length < 1){
					$('.turn-content').append($(this)[0].outerHTML);	
				}else if($('.river-content').children().length < 1){
					$('.river-content').append($(this)[0].outerHTML);
				}
			}
		}
		
	});

	$('.calcular').on('click', function(){
		var highHand = getHighHand();
	});

	$('.limpar-tudo').on('click', function(){
		$('.hand-content').html('');
		$('.flop-content').html('');
		$('.turn-content').html('');
		$('.river-content').html('');
	});

	$('.limpar-hand').on('click', function(){
		$('.hand-content').html('');
	});

	$('.limpar-flop').on('click', function(){
		$('.flop-content').html('');
	});

	$('.limpar-turn').on('click', function(){
		$('.turn-content').html('');
	});

	$('.limpar-river').on('click', function(){
		$('.river-content').html('');
	});
	
});

function isCartaEmUso(element){
	
	var carta = element[0];
	var isEmUso;
	$.each($('.hand-content').children(), function(index, value){
		if(
			$(carta).data('valor') == $(value).data('valor') 
			&& $(carta).data('naipe') == $(value).data('naipe')
		){
			isEmUso = true;
		}
	});

	$.each($('.flop-content').children(), function(index, value){
		if(
			$(carta).data('valor') == $(value).data('valor') 
			&& $(carta).data('naipe') == $(value).data('naipe')
		){
			isEmUso = true;
		}
	});

	$.each($('.turn-content').children(), function(index, value){
		if(
			$(carta).data('valor') == $(value).data('valor') 
			&& $(carta).data('naipe') == $(value).data('naipe')
		){
			isEmUso = true;
		}
	});

	$.each($('.river-content').children(), function(index, value){
		if(
			$(carta).data('valor') == $(value).data('valor') 
			&& $(carta).data('naipe') == $(value).data('naipe')
		){
			isEmUso = true;
		}
	});

	if(isEmUso){
		return isEmUso;
	}else{
		return false;
	}

}

function buildBoardArrayObject(){
	var arrayBoard = [];
	$.each($('.hand-content').children(), function(index, value){
		var obj = {
			id: $(this).data('id'),
			valor: $(this).data('valor'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	$.each($('.flop-content').children(), function(index, value){
		var obj = {
			id: $(this).data('id'),
			valor: $(this).data('valor'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	$.each($('.turn-content').children(), function(index, value){
		var obj = {
			id: $(this).data('id'),
			valor: $(this).data('valor'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	$.each($('.river-content').children(), function(index, value){
		var obj = {
			id: $(this).data('id'),
			valor: $(this).data('valor'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});
	return arrayBoard;
}

function getHighHand(){
	//// construir array com cartas
	var boardArrayObject = buildBoardArrayObject();

	var highHand;
	highHand = isRoyalFlush(boardArrayObject);
	if(highHand){
		return "Royal Flush";
	}

	// highHand = isStraightFlush(boardArrayObject);
	// if(highHand){
	// 	return "Straight Flush";
	// }

	// highHand = isQuadra(boardArrayObject);
	// if(highHand){
	// 	return "Four of a kind";
	// }

	// highHand = isFullHouse(boardArrayObject);
	// if(highHand){
	// 	return "Full House";
	// }

	// highHand = isFlush(boardArrayObject);
	// if(highHand){
	// 	return "Flush";
	// }

	// highHand = isStraight(boardArrayObject);
	// if(highHand){
	// 	return "Sequencia";
	// }

	// highHand = isTrinca(boardArrayObject);
	// if(highHand){
	// 	return "Trinca";
	// }

	// highHand = isDoisPares(boardArrayObject);
	// if(highHand){
	// 	return "Dois Pares";
	// }

	// highHand = isPar(boardArrayObject);
	// if(highHand){
	// 	return "Par";
	// }

	// highHand = isHighCard(boardArrayObject);
	// if(highHand){
	// 	return "Carta Alta";
	// }

}

function ordenaArrayObject(boardArrayObject){
	return boardArrayObject.sort(function(a, b){
		var keyA = a['id'],
			keyB = b['id'];
		if(keyA < keyB) return -1;
		if(keyA > keyB) return 1;
		return 0;
	});
}

function isRoyalFlush(boardArrayObject){
	
	boardArrayObject = ordenaArrayObject(boardArrayObject);

	var sequenceArray = isSequencia(boardArrayObject);

	//// verificar se é flush
	var flush = isFlush(sequenceArray);

	//// verificar se tem A na sequencia
	console.log(flush);

	


}

// function isStraightFlush(boardArrayObject){

// }

// function isQuadra(boardArrayObject){

// }

// function isFullHouse(boardArrayObject){

// }

// function isFlush(boardArrayObject){

// }

// function isStraight(boardArrayObject){

// }

// function isTrinca(boardArrayObject){

// }

// function isDoisPares(boardArrayObject){

// }

// function isPar(boardArrayObject){

// }

// function isHighCard(boardArrayObject){

// }


function isSequencia(objArray){

	var arraySequencia = [];
	objArray.forEach(function(value){

		var indice1 = parseInt(value['id']);
		if(arraySequencia.length > 0){
			if(parseInt(arraySequencia[arraySequencia.length - 1]['id']) + 1 === indice1){
				arraySequencia.push(value);
			}
		}else{
			arraySequencia.push(value);
		}

		
		objArray.forEach(function(value2){
			var indice2 = parseInt(value2['id']);
			if((indice1 !== indice2) && ((parseInt(arraySequencia[arraySequencia.length -1 ]['id']) + 1) === indice2) ){
				arraySequencia.push(value2);
			}
			
		});
		
		if(arraySequencia.length < 5 ){
			arraySequencia = [];
		}
		
	});

	
	if(arraySequencia.length >= 5 ){
		return arraySequencia;
	}else{
		return false;
	}
}


function isFlush(){

	var countOuro = 0;
	var countEspada = 0;
	var countCopas = 0;
	var countPaus = 0;
	objArray.forEach(function(value){
		if(value['naipe'] == 'ouro'){
			countOuro++;
		}
		if(value['naipe'] == 'espada'){
			countEspada++;
		}
		if(value['naipe'] == 'copas'){
			countCopas++;
		}
		if(value['naipe'] == 'paus'){
			countPaus++;
		}
	});

	if(countOuro = 4){
		return true;
	}
	if(countEspada = 4){
		return true;
	}
	if(countCopas = 4){
		return true;
	}
	if(countPaus = 4){
		return true;
	}l
	
}