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
			var boardArrayObject = buildBoardArrayObject();
			var highHand = getHighHand(boardArrayObject);
			$("#high-hand").html(highHand);

			//// getOuts
			var arrayOuts = getOuts();

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
			index: $(this).data('index'),
			value: $(this).data('value'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	$.each($('.flop-content').children(), function(index, val){
		var obj = {
			id: $(this).data('id'),
			index: $(this).data('index'),
			value: $(this).data('value'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	$.each($('.turn-content').children(), function(index, val){
		var obj = {
			id: $(this).data('id'),
			index: $(this).data('index'),
			value: $(this).data('value'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	$.each($('.river-content').children(), function(index, val){
		var obj = {
			id: $(this).data('id'),
			index: $(this).data('index'),
			value: $(this).data('value'),
			naipe: $(this).data('naipe')
		};
		arrayBoard.push(obj);
	});

	arrayBoard = ordenarArrayObject(arrayBoard);
	return arrayBoard;
}


function getHighHand(boardArrayObject){

	var royalFlush = isRoyalFlush(boardArrayObject);
	if(royalFlush){
		return "Royal Flush";
	}

	straightFlush = isStraightFlush(boardArrayObject);
	if(straightFlush){
		return "Straight Flush";
	}

	quadra = isFourOfaKind(boardArrayObject);
	if(quadra){
		return "Four of a kind";
	}
	 
	fullHouse = isFullHouse(boardArrayObject);
	if(fullHouse){
		return "Full House";
	}

	flush = isFlush(boardArrayObject);
	if(flush){
		return "Flush";
	}

	straight = isStraight(boardArrayObject);
	if(straight){
		return "Straight";
	}

	treeOfaKind = isTreeOfaKind(boardArrayObject);
	if(treeOfaKind){
		return "Tree Of a Kind";
	}

	twoPairs = isTwoPairs(boardArrayObject);
	if(twoPairs){
		return "Two Pairs";
	}

	pair = isPair(boardArrayObject);
	if(pair){
		return "Pair";
	}

	highHand = isHighCard(boardArrayObject);
	if(highHand){
		return "High Card";
	}

}


function ordenarArrayObject(boardArrayObject){
	return boardArrayObject.sort(function(a, b){
		var keyA = a['index'],
			keyB = b['index'];
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
			&&	sequenceArray[0]['index'] === 9
			&&	sequenceArray[1]['index'] === 10
			&&	sequenceArray[2]['index'] === 11
			&&	sequenceArray[3]['index'] === 12
			&&	sequenceArray[4]['index'] === 13
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
					val['index'] === val2['index'] && val['naipe'] !== val2['naipe']
					&& arrayTreeOfaKind[arrayTreeOfaKind.length - 1]['index'] === val2['index'] && arrayTreeOfaKind[arrayTreeOfaKind.length - 1]['naipe'] !== val2['naipe']
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
						val['index'] === val2['index'] && val['naipe'] !== val2['naipe']
						&& arraySecondPair[arraySecondPair.length - 1]['index'] === val2['index'] && arraySecondPair[arraySecondPair.length - 1]['naipe'] !== val2['naipe']
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

	if(countOuro >= 5){
		return true;
	}
	if(countEspada >= 5){
		return true;
	}
	if(countCopas >= 5){
		return true;
	}
	if(countPaus >= 5){
		return true;
	}
	return false;
	
}


function isStraight(objArray){

	var arraySequencia = [];
	objArray.forEach(function(value){

		var indice1 = parseInt(value['index']);
		if(arraySequencia.length > 0){
			if(parseInt(arraySequencia[arraySequencia.length - 1]['index']) + 1 === indice1){
				arraySequencia.push(value);
			}
		}else{
			arraySequencia.push(value);
		}
		
		objArray.forEach(function(value2){
			var indice2 = parseInt(value2['index']);
			if((indice1 !== indice2) && ((parseInt(arraySequencia[arraySequencia.length -1 ]['index']) + 1) === indice2) ){
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
					val['index'] === val2['index'] && val['naipe'] !== val2['naipe']
					&& arrayFirstPair[arrayFirstPair.length - 1]['index'] === val2['index'] && arrayFirstPair[arrayFirstPair.length - 1]['naipe'] !== val2['naipe']
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
						val['index'] === val2['index'] && val['naipe'] !== val2['naipe']
						&& arraySecondPair[arraySecondPair.length - 1]['index'] === val2['index'] && arraySecondPair[arraySecondPair.length - 1]['naipe'] !== val2['naipe']
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
					val['index'] === val2['index'] && val['naipe'] !== val2['naipe']
					&& arrayRepeticion[arrayRepeticion.length - 1]['index'] === val2['index'] && arrayRepeticion[arrayRepeticion.length - 1]['naipe'] !== val2['naipe']
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


function getOuts(){

	var arrayHighHandScale = [
		"High Card",
		"Pair",
		"Two Pairs",
		"Tree Of a Kind",
		"Straight",
		"Flush",
		"Full House",
		"Four of a kind",
		"Straight Flush",
		"Royal Flush"
	];

	var boardArrayObject = buildBoardArrayObject();
	var highHand = getHighHand(boardArrayObject);
	var highHandIndex = arrayHighHandScale.indexOf(highHand);

	var packArrayObject = buildPackArrayObject();
	
	var arrayPairOuts = [];
	var arrayTwoPairsOuts = [];
	var arrayTreeOfaKindOuts = [];
	var arrayStraightOuts = [];
	var arrayFlushOuts = [];
	var arrayFullHouseOuts = [];
	var arrayFourofakindOuts = [];
	var arrayStraightFlushOuts = [];
	var arrayRoyalFlushOuts = [];
	var boardArrayObjectAux = [];

	if(boardArrayObject.length < 7){

		packArrayObject.forEach(function(packCard){

			boardArrayObjectAux = buildBoardArrayObject();

			packCardIsInArray = false;
			boardArrayObject.forEach(function(card){
				if(packCard['id'] === card['id']){
					packCardIsInArray = true;
				}
			});
			if(!packCardIsInArray){

				boardArrayObjectAux.push(packCard);

				var highHandAux = getHighHand(boardArrayObjectAux);
				var highHandIndexAux = arrayHighHandScale.indexOf(highHandAux);

				boardArrayObjectAux = [];
				if(highHandIndexAux > highHandIndex){

					if(highHandAux == "Royal Flush"){
						if(arrayRoyalFlushOuts.indexOf(packCard) == -1){
							arrayRoyalFlushOuts.push(packCard);
						}
					}
					if(highHandAux == "Straight Flush"){
						if(arrayStraightFlushOuts.indexOf(packCard) == -1){
							arrayStraightFlushOuts.push(packCard);
						}
					}
					if(highHandAux == "Four of a kind"){
						if(arrayFourofakindOuts.indexOf(packCard) == -1){
							arrayFourofakindOuts.push(packCard);
						}
					}
					if(highHandAux == "Full House"){
						if(arrayFullHouseOuts.indexOf(packCard) == -1){
							arrayFullHouseOuts.push(packCard);
						}
					}
					if(highHandAux == "Flush"){
						if(arrayFlushOuts.indexOf(packCard) == -1){
							arrayFlushOuts.push(packCard);
						}
					}
					if(highHandAux == "Straight"){
						if(arrayStraightOuts.indexOf(packCard) == -1){
							arrayStraightOuts.push(packCard);
						}
					}
					if(highHandAux == "Tree Of a Kind"){
						if(arrayTreeOfaKindOuts.indexOf(packCard) == -1){
							arrayTreeOfaKindOuts.push(packCard);
						}
					}
					if(highHandAux == "Two Pairs"){
						if(arrayTwoPairsOuts.indexOf(packCard) == -1){
							arrayTwoPairsOuts.push(packCard);
						}
					}
					if(highHandAux == "Pair"){
						if(arrayPairOuts.indexOf(packCard) == -1){
							arrayPairOuts.push(packCard);
						}
					}
				}
			}
		});

		var html = "";
		if(arrayPairOuts.length > 0){
			html += "<div><h3>PairOuts</h3>";
				arrayPairOuts.forEach(function(val){
					html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"<img src='images/"+val['naipe']+".png' height='15' width='15'></label>";
				});
			html += "</div>";
		}
		if(arrayTwoPairsOuts.length > 0){
			html += "<div><h3>TwoPairsOuts</h3>";
				arrayTwoPairsOuts.forEach(function(val){
					html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"<img src='images/"+val['naipe']+".png' height='15' width='15'></label>";
				});
			html += "</div>";
		}
		if(arrayTreeOfaKindOuts.length > 0){
			html += "<div><h3>TreeOfaKindOuts</h3>";
				arrayTreeOfaKindOuts.forEach(function(val){
					html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"<img src='images/"+val['naipe']+".png' height='15' width='15'></label>";
				});
			html += "</div>";
		}
		if(arrayStraightOuts.length > 0){
			html += "<div><h3>StraightOuts</h3>";
				arrayStraightOuts.forEach(function(val){
					html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"<img src='images/"+val['naipe']+".png' height='15' width='15'></label>";
				});
			html += "</div>";
		}
		if(arrayFlushOuts.length > 0){
			html += "<div><h3>FlushOuts</h3>";
				arrayFlushOuts.forEach(function(val){
					html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"<img src='images/"+val['naipe']+".png' height='15' width='15'></label>";
				});
			html += "</div>";
		}
		if(arrayFullHouseOuts.length > 0){
			html += "<div><h3>FullHouseOuts</h3>";
				arrayFullHouseOuts.forEach(function(val){
					html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"<img src='images/"+val['naipe']+".png' height='15' width='15'></label>";
				});
			html += "</div>";
		}
		if(arrayFourofakindOuts.length > 0){
			html += "<div><h3>FourofakindOuts</h3>";
				arrayFourofakindOuts.forEach(function(val){
					html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"<img src='images/"+val['naipe']+".png' height='15' width='15'></label>";
				});
			html += "</div>";
		}
		if(arrayStraightFlushOuts.length > 0){
			html += "<div><h3>StraightFlushOuts</h3>";
				arrayStraightFlushOuts.forEach(function(val){
					html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"<img src='images/"+val['naipe']+".png' height='15' width='15'></label>";
				});
			html += "</div>";
		}
		if(arrayRoyalFlushOuts.length > 0){
			html += "<div><h3>RoyalFlushOuts</h3>";
				arrayRoyalFlushOuts.forEach(function(val){
					html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"<img src='images/"+val['naipe']+".png' height='15' width='15'></label>";
				});
			html += "</div>";
		}
		
		var totalOuts = arrayPairOuts.length + arrayTwoPairsOuts.length + arrayTreeOfaKindOuts.length +	arrayStraightOuts.length +	arrayFlushOuts.length +	arrayFullHouseOuts.length +	arrayFourofakindOuts.length + arrayStraightFlushOuts.length + arrayRoyalFlushOuts.length; 
		$('#total-outs').html(totalOuts);
		$('#outs-content').html(html);
	}
	
}


function buildPackArrayObject(){
	pack = [
		{id: 1, index: 1, value: 2, naipe: "ouro"},
		{id: 2, index: 1, value: 2, naipe: "espada"},
		{id: 3, index: 1, value: 2, naipe: "copas"},
		{id: 4, index: 1, value: 2, naipe: "paus"},
		{id: 5, index: 2, value: 3, naipe: "ouro"},
		{id: 6, index: 2, value: 3, naipe: "espada"},
		{id: 7, index: 2, value: 3, naipe: "copas"},
		{id: 8, index: 2, value: 3, naipe: "paus"},
		{id: 9, index: 3, value: 4, naipe: "ouro"},
		{id: 10, index: 3, value: 4, naipe: "espada"},
		{id: 11, index: 3, value: 4, naipe: "copas"},
		{id: 12, index: 3, value: 4, naipe: "paus"},
		{id: 13, index: 4, value: 5, naipe: "ouro"},
		{id: 14, index: 4, value: 5, naipe: "espada"},
		{id: 15, index: 4, value: 5, naipe: "copas"},
		{id: 16, index: 4, value: 5, naipe: "paus"},
		{id: 17, index: 5, value: 6, naipe: "ouro"},
		{id: 18, index: 5, value: 6, naipe: "espada"},
		{id: 19, index: 5, value: 6, naipe: "copas"},
		{id: 20, index: 5, value: 6, naipe: "paus"},
		{id: 21, index: 6, value: 7, naipe: "ouro"},
		{id: 22, index: 6, value: 7, naipe: "espada"},
		{id: 23, index: 6, value: 7, naipe: "copas"},
		{id: 24, index: 6, value: 7, naipe: "paus"},
		{id: 25, index: 7, value: 8, naipe: "ouro"},
		{id: 26, index: 7, value: 8, naipe: "espada"},
		{id: 27, index: 7, value: 8, naipe: "copas"},
		{id: 28, index: 7, value: 8, naipe: "paus"},
		{id: 29, index: 8, value: 9, naipe: "ouro"},
		{id: 30, index: 8, value: 9, naipe: "espada"},
		{id: 31, index: 8, value: 9, naipe: "copas"},
		{id: 32, index: 8, value: 9, naipe: "paus"},
		{id: 33, index: 9, value: 10, naipe: "ouro"},
		{id: 34, index: 9, value: 10, naipe: "espada"},
		{id: 35, index: 9, value: 10, naipe: "copas"},
		{id: 36, index: 9, value: 10, naipe: "paus"},
		{id: 37, index: 10, value: "J", naipe: "ouro"},
		{id: 38, index: 10, value: "J", naipe: "espada"},
		{id: 39, index: 10, value: "J", naipe: "copas"},
		{id: 40, index: 10, value: "J", naipe: "paus"},
		{id: 41, index: 11, value: "Q", naipe: "ouro"},
		{id: 42, index: 11, value: "Q", naipe: "espada"},
		{id: 43, index: 11, value: "Q", naipe: "copas"},
		{id: 44, index: 11, value: "Q", naipe: "paus"},
		{id: 45, index: 12, value: "K", naipe: "ouro"},
		{id: 46, index: 12, value: "K", naipe: "espada"},
		{id: 47, index: 12, value: "K", naipe: "copas"},
		{id: 48, index: 12, value: "K", naipe: "paus"},
		{id: 49, index: 13, value: "A", naipe: "ouro"},
		{id: 50, index: 13, value: "A", naipe: "espada"},
		{id: 51, index: 13, value: "A", naipe: "copas"},
		{id: 52, index: 13, value: "A", naipe: "paus"}
	];
	return pack;
}