$(document).ready(function(){

	var elementsCardClass =  document.getElementsByClassName("card");
	Array.prototype.forEach.call(elementsCardClass, function(value){
		value.onclick = function(){
			var inUse = isCardInUse($(this));
			if(!inUse){
				
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
		};
	});
	
	var elementsCalculateClass =  document.getElementsByClassName("calculate");
	Array.prototype.forEach.call(elementsCalculateClass, function(value){
		value.onclick = function(){
			var highHand = getHighHand();
			$("#high-hand").html(highHand);
		};
	});

	$('.clean-all').on('click', function(){
		$('.hand-content').html('');
		$('.flop-content').html('');
		$('.turn-content').html('');
		$('.river-content').html('');
		$('#high-hand').html('');
	});

	$('.clean-hand').on('click', function(){
		$('.hand-content').html('');
	});

	$('.clean-flop').on('click', function(){
		$('.flop-content').html('');
	});

	$('.clean-turn').on('click', function(){
		$('.turn-content').html('');
	});

	$('.clean-river').on('click', function(){
		$('.river-content').html('');
	});
	
});


function isCardInUse(element){
	
	var card = element[0];
	var inUse;
	$.each($('.hand-content').children(), function(index, val){
		if(
			$(card).data('value') == $(val).data('value') 
			&& $(card).data('naipe') == $(val).data('naipe')
		){
			inUse = true;
		}
	});

	$.each($('.flop-content').children(), function(index, val){
		if(
			$(card).data('value') == $(val).data('value') 
			&& $(card).data('naipe') == $(val).data('naipe')
		){
			inUse = true;
		}
	});

	$.each($('.turn-content').children(), function(index, val){
		if(
			$(card).data('value') == $(val).data('value') 
			&& $(card).data('naipe') == $(val).data('naipe')
		){
			inUse = true;
		}
	});

	$.each($('.river-content').children(), function(index, val){
		if(
			$(card).data('value') == $(val).data('value') 
			&& $(card).data('naipe') == $(val).data('naipe')
		){
			inUse = true;
		}
	});

	if(inUse){
		return inUse;
	}else{
		return false;
	}
}


function buildBoardArrayObject(){
	var arrayBoard = [];
	$.each($('.hand-content').children(), function(index, val){
		var obj = {
			id: $(this).data('id'),
			value: $(this).data('value'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	$.each($('.flop-content').children(), function(index, val){
		var obj = {
			id: $(this).data('id'),
			value: $(this).data('value'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	$.each($('.turn-content').children(), function(index, val){
		var obj = {
			id: $(this).data('id'),
			value: $(this).data('value'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	$.each($('.river-content').children(), function(index, val){
		var obj = {
			id: $(this).data('id'),
			value: $(this).data('value'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	arrayBoard = ordenarArrayObject(arrayBoard);
	return arrayBoard;
}


function getHighHand(){

	var boardArrayObject = buildBoardArrayObject();

	var royalFlush = isRoyalFlush(boardArrayObject);
	if(royalFlush){
		console.log("Royal Flush");
		return "Royal Flush";
	}

	straightFlush = isStraightFlush(boardArrayObject);
	if(straightFlush){
		console.log("Straight Flush");
		return "Straight Flush";
	}

	quadra = isFourOfaKind(boardArrayObject);
	if(quadra){
		console.log("Four of a kind");
		return "Four of a kind";
	}
	 
	fullHouse = isFullHouse(boardArrayObject);
	if(fullHouse){
		console.log("Full House");
		return "Full House";
	}

	flush = isFlush(boardArrayObject);
	if(flush){
		console.log("Flush");
		return "Flush";
	}

	straight = isStraight(boardArrayObject);
	if(straight){
		console.log("Straight");
		return "Straight";
	}

	treeOfaKind = isTreeOfaKind(boardArrayObject);
	if(treeOfaKind){
		console.log("Tree Of a Kind");
		return "Tree Of a Kind";
	}

	twoPairs = isTwoPairs(boardArrayObject);
	if(twoPairs){
		console.log("Two Pairs");
		return "Two Pairs";
	}

	pair = isPair(boardArrayObject);
	if(pair){
		console.log("Pair");
		return "Pair";
	}

	highHand = isHighCard(boardArrayObject);
	if(highHand){
		console.log("High Alta");
		return "High Alta";
	}

}


function ordenarArrayObject(boardArrayObject){
	return boardArrayObject.sort(function(a, b){
		var keyA = a['id'],
			keyB = b['id'];
		if(keyA < keyB) return -1;
		if(keyA > keyB) return 1;
		return 0;
	});
}


function isRoyalFlush(boardArrayObject){
	var sequenceArray = isStraight(boardArrayObject);
	if(sequenceArray){
		var flush = isFlush(sequenceArray);
		if(
			flush 
			&&	sequenceArray[0]['id'] === 9
			&&	sequenceArray[1]['id'] === 10
			&&	sequenceArray[2]['id'] === 11
			&&	sequenceArray[3]['id'] === 12
			&&	sequenceArray[4]['id'] === 13
		){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}


function isStraightFlush(boardArrayObject){
	var sequenceArray = isStraight(boardArrayObject);
	if(sequenceArray){
		var flush = isFlush(sequenceArray);
		if(flush){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}


function isFourOfaKind(boardArrayObject){
	return isRepetitionOfDelimiter(boardArrayObject, 4);
}


function isFullHouse(boardArrayObject){
	var arrayTreeOfaKind = [];
	boardArrayObject.forEach(function(val){
		if(arrayTreeOfaKind.length === 0){
			arrayTreeOfaKind.push(val);
		}

		boardArrayObject.forEach(function(val2){
			if(arrayTreeOfaKind.indexOf(val2) === -1){
				if(
					val['id'] === val2['id'] && val['naipe'] !== val2['naipe']
					&& arrayTreeOfaKind[arrayTreeOfaKind.length - 1]['id'] === val2['id'] && arrayTreeOfaKind[arrayTreeOfaKind.length - 1]['naipe'] !== val2['naipe']
				){
					arrayTreeOfaKind.push(val2);
				}
			}
		});

		if(arrayTreeOfaKind.length < 3){
			arrayTreeOfaKind = [];
		}

	});
	
	if(arrayTreeOfaKind.length === 3){
		var arraySecondPair = [];
		boardArrayObject.forEach(function(val){
			if(arraySecondPair.length === 0){
				if(arrayTreeOfaKind.indexOf(val) === -1){
					arraySecondPair.push(val);
				}
			}

			boardArrayObject.forEach(function(val2){
				if(arraySecondPair.indexOf(val2) === -1 && arrayTreeOfaKind.indexOf(val2) === -1){
					if(
						val['id'] === val2['id'] && val['naipe'] !== val2['naipe']
						&& arraySecondPair[arraySecondPair.length - 1]['id'] === val2['id'] && arraySecondPair[arraySecondPair.length - 1]['naipe'] !== val2['naipe']
					){
						if(arrayTreeOfaKind.indexOf(val2) === -1){
							arraySecondPair.push(val2);
						}
					}
				}
			});

			if(arraySecondPair.length < 2){
				arraySecondPair = [];
			}

		});

		if(arraySecondPair.length === 2){
			return true;
		}else{
			return false;
		}

	}else{
		return false;
	}
}


function isFlush(objArray){

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

	if(countOuro >= 4){
		return true;
	}
	if(countEspada >= 4){
		return true;
	}
	if(countCopas >= 4){
		return true;
	}
	if(countPaus >= 4){
		return true;
	}
	return false;
	
}


function isStraight(objArray){

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


function isTreeOfaKind(boardArrayObject){
	return isRepetitionOfDelimiter(boardArrayObject, 3);
}


function isTwoPairs(boardArrayObject){
	var arrayFirstPair = [];
	boardArrayObject.forEach(function(val){
		if(arrayFirstPair.length === 0){
			arrayFirstPair.push(val);
		}

		boardArrayObject.forEach(function(val2){
			if(arrayFirstPair.indexOf(val2) === -1){
				if(
					val['id'] === val2['id'] && val['naipe'] !== val2['naipe']
					&& arrayFirstPair[arrayFirstPair.length - 1]['id'] === val2['id'] && arrayFirstPair[arrayFirstPair.length - 1]['naipe'] !== val2['naipe']
				){
					arrayFirstPair.push(val2);
				}
			}
		});

		if(arrayFirstPair.length < 2){
			arrayFirstPair = [];
		}

	});
	
	if(arrayFirstPair.length === 2){
		var arraySecondPair = [];
		boardArrayObject.forEach(function(val){
			if(arraySecondPair.length === 0){
				if(arrayFirstPair.indexOf(val) === -1){
					arraySecondPair.push(val);
				}
			}

			boardArrayObject.forEach(function(val2){
				if(arraySecondPair.indexOf(val2) === -1 && arrayFirstPair.indexOf(val2) === -1){
					if(
						val['id'] === val2['id'] && val['naipe'] !== val2['naipe']
						&& arraySecondPair[arraySecondPair.length - 1]['id'] === val2['id'] && arraySecondPair[arraySecondPair.length - 1]['naipe'] !== val2['naipe']
					){
						if(arrayFirstPair.indexOf(val2) === -1){
							arraySecondPair.push(val2);
						}
					}
				}
			});

			if(arraySecondPair.length < 2){
				arraySecondPair = [];
			}

		});

		if(arraySecondPair.length === 2){
			return true;
		}else{
			return false;
		}

	}else{
		return false;
	}
}


function isPair(boardArrayObject){
	return isRepetitionOfDelimiter(boardArrayObject, 2);
}


function isHighCard(boardArrayObject){

	royalFlush = isRoyalFlush(boardArrayObject);
	straightFlush = isStraightFlush(boardArrayObject);
	fourOfaKind = isFourOfaKind(boardArrayObject);
	fullHouse = isFullHouse(boardArrayObject);
	flush = isFlush(boardArrayObject);
	straight = isStraight(boardArrayObject);
	treeOfaKind = isTreeOfaKind(boardArrayObject);
	twoPairs = isTwoPairs(boardArrayObject);
	pair = isPair(boardArrayObject);

	if(
		!royalFlush &&
		!straightFlush &&
		!fourOfaKind &&
		!fullHouse &&
		!flush &&
		!straight &&
		!treeOfaKind &&
		!twoPairs &&
		!pair
	){
		return true;
	}else{
		return false;
	}
}

function isRepetitionOfDelimiter(boardArrayObject, delimiter){
	var arrayRepeticion = [];
	boardArrayObject.forEach(function(val){
		if(arrayRepeticion.length === 0){
			arrayRepeticion.push(val);
		}

		boardArrayObject.forEach(function(val2){
			if(arrayRepeticion.indexOf(val2) === -1){
				if(
					val['id'] === val2['id'] && val['naipe'] !== val2['naipe']
					&& arrayRepeticion[arrayRepeticion.length - 1]['id'] === val2['id'] && arrayRepeticion[arrayRepeticion.length - 1]['naipe'] !== val2['naipe']
				){
					arrayRepeticion.push(val2);
				}
			}
		});

		if(arrayRepeticion.length < delimiter){
			arrayRepeticion = [];
		}

	});
	
	if(arrayRepeticion.length === delimiter){
		return true;
	}else{
		return false;
	}
}