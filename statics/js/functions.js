$(document).ready(function(){

	$('.cards').on('click', function(){

		var inUse = isCardInUse($(this).children());
		var boardArrayObject = buildBoardArrayObject();
		if(!inUse && boardArrayObject.length < 7){
			$(this).addClass('inUse');
			if($('.hand-content').children().length < 2){
				$('.hand-content').append($(this).children()[0].outerHTML);
			}else if($('.flop-content').children().length < 3){
				$('.flop-content').append($(this).children()[0].outerHTML);
			}else{
				if($('.turn-content').children().length < 1){
					$('.turn-content').append($(this).children()[0].outerHTML);
				}else if($('.river-content').children().length < 1){
					$('.river-content').append($(this).children()[0].outerHTML);
				}
			}
		}else{
			$(this).removeClass('inUse');
			var arrClasses = $(this).children().attr('class').split(' ');
			var classes = '';
			$.each(arrClasses, function(index, val){
				classes += '.'+val;
			});
			$('.hand-content '+classes).remove();
			$('.flop-content '+classes).remove();
			$('.turn-content '+classes).remove();
			$('.river-content '+classes).remove();
			$('#high-hand').html('');
			$('#high-hand').parent().addClass('hidden');
			getOuts();
		}

		var handContentLength = $('.hand-content').children().length;
		var flopContentLength = $('.flop-content').children().length;
		if(handContentLength == 2 && flopContentLength == 3){
			var boardArrayObject = buildBoardArrayObject();
			var highHand = getHighHand(boardArrayObject);
			$("#high-hand").html(highHand);
			$('#high-hand').parent().removeClass('hidden');

			$('.total-outs').html('');
			$('.total-outs').parent().addClass('hidden');
			$('#outs-content').html('');
			getOuts();
		}

	});

	$('.clean-all').on('click', function(){
		$('.hand-content').html('');
		$('.flop-content').html('');
		$('.turn-content').html('');
		$('.river-content').html('');
		$('#high-hand').html('');
		$('#high-hand').parent().addClass('hidden');
		$('.total-outs').html('');
		$('.total-outs').parent().addClass('hidden');
		$('#outs-content').html('');
		$('.cards').removeClass('inUse');
	});

});

var sumKeyCode = '';
$(document).ready(function(){

	addEventListener("keydown", function (e) {
		var arrayKey = [98, 99, 100, 101, 102, 103, 104, 105, 97, 96, 74, 81, 75, 65, 13, 8, 107, 111, 109, 106];
		var boardArrayObject = buildBoardArrayObject();
		if($.inArray(e.keyCode, arrayKey) > -1){

			if(e.keyCode != 13 && e.keyCode != 8){
				sumKeyCode = sumKeyCode + e.keyCode.toString();
			}
			if(e.keyCode == 8){
				sumKeyCode = '';
			}
			setTimeout(function(){
				checkClickedKey(sumKeyCode);
				sumKeyCode = '';
			},500);
		}

	});

});

function removeInUseClass(element){
	$.each($('.cards').children(), function(index, val){
		if($(element).data('id') == $(val).data('id')){
			$($('.cards')[index]).removeClass('inUse');
		}
	});
}

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
		if(value['naipe'] == 'diams'){
			countOuro++;
		}
		if(value['naipe'] == 'spades'){
			countEspada++;
		}
		if(value['naipe'] == 'hearts'){
			countCopas++;
		}
		if(value['naipe'] == 'clubs'){
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
				boardArrayObjectAux = ordenarArrayObject(boardArrayObjectAux);

				var highHandAux = getHighHand(boardArrayObjectAux);
				var highHandIndexAux = arrayHighHandScale.indexOf(highHandAux);

				if(highHandIndexAux > highHandIndex){

					var royalFlush = isRoyalFlush(boardArrayObjectAux);
					if(royalFlush){
						if(arrayRoyalFlushOuts.indexOf(packCard) == -1){
							arrayRoyalFlushOuts.push(packCard);
						}
					}
					var straightFlush = isStraightFlush(boardArrayObjectAux);
					if(straightFlush){
						if(arrayStraightFlushOuts.indexOf(packCard) == -1){
							arrayStraightFlushOuts.push(packCard);
						}
					}
					var FourOfaKind = isFourOfaKind(boardArrayObjectAux);
					if(FourOfaKind){
						if(arrayFourofakindOuts.indexOf(packCard) == -1){
							arrayFourofakindOuts.push(packCard);
						}
					}
					var FullHouse = isFullHouse(boardArrayObjectAux);
					if(FullHouse){
						if(arrayFullHouseOuts.indexOf(packCard) == -1){
							arrayFullHouseOuts.push(packCard);
						}
					}
					var Flush = isFlush(boardArrayObjectAux);
					if(Flush){
						if(arrayFlushOuts.indexOf(packCard) == -1){
							arrayFlushOuts.push(packCard);
						}
					}
					var Straight = isStraight(boardArrayObjectAux);
					if(Straight){
						if(arrayStraightOuts.indexOf(packCard) == -1){
							arrayStraightOuts.push(packCard);
						}
					}
					var TreeOfaKind = isTreeOfaKind(boardArrayObjectAux);
					if(TreeOfaKind){
						if(arrayTreeOfaKindOuts.indexOf(packCard) == -1){
							arrayTreeOfaKindOuts.push(packCard);
						}
					}
					var TwoPairs = isTwoPairs(boardArrayObjectAux);
					if(TwoPairs){
						if(arrayTwoPairsOuts.indexOf(packCard) == -1){
							arrayTwoPairsOuts.push(packCard);
						}
					}
					var Pair = isPair(boardArrayObjectAux);
					if(Pair){
						if(arrayPairOuts.indexOf(packCard) == -1){
							arrayPairOuts.push(packCard);
						}
					}
				}
				boardArrayObjectAux = [];
			}
		});

		var html = buildOutsHtml(boardArrayObject, arrayRoyalFlushOuts, arrayStraightFlushOuts, arrayFourofakindOuts, arrayFullHouseOuts, arrayFlushOuts, arrayStraightOuts, arrayTreeOfaKindOuts, arrayTwoPairsOuts, arrayPairOuts);

		var arrayOuts = countTotalOuts(arrayRoyalFlushOuts, arrayStraightFlushOuts, arrayFourofakindOuts, arrayFullHouseOuts, arrayFlushOuts, arrayStraightOuts, arrayTreeOfaKindOuts, arrayTwoPairsOuts, arrayPairOuts);

		var totalOuts = arrayOuts.length;
		if(totalOuts > 0){
			$('.total-outs').html(totalOuts);
			$('.total-outs').parent().removeClass('hidden');
		}else{
			$('.total-outs').parent().addClass('hidden');
		}
		$('#outs-content').html(html);
	}

}

function calculateOutsPercentage(boardArrayObject, outsArrayObject){
	var packTotalLength = 52;
	var boardArrayLength = boardArrayObject.length;
	var outsArrayLength = outsArrayObject.length;

	var diffTotal = packTotalLength - boardArrayLength;

	emptyBoardPositionsCount = 0;
	if($('.turn-content').children().length == 0){
		emptyBoardPositionsCount++;
	}
	if($('.river-content').children().length == 0){
		emptyBoardPositionsCount++;
	}
	outsArrayLength = outsArrayLength * emptyBoardPositionsCount;

	result = ((100 * outsArrayLength) / diffTotal);
	return result.toFixed(2);
}

function buildOutsHtml(boardArrayObject, arrayRoyalFlushOuts, arrayStraightFlushOuts, arrayFourofakindOuts, arrayFullHouseOuts, arrayFlushOuts, arrayStraightOuts, arrayTreeOfaKindOuts, arrayTwoPairsOuts, arrayPairOuts){
	var html = "";
	if(arrayRoyalFlushOuts.length > 0){
		var percentage = calculateOutsPercentage(boardArrayObject, arrayRoyalFlushOuts);
		html += "<div><div><label>Royal Flush Outs</label> <span class='percentage'>"+ percentage +"%</span></div>";
			arrayRoyalFlushOuts.forEach(function(val){
				html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"&"+val['naipe']+";</label>";
			});
		html += "</div>";
	}
	if(arrayStraightFlushOuts.length > 0){
		var percentage = calculateOutsPercentage(boardArrayObject, arrayStraightFlushOuts);
		html += "<div><div><label>Straight FlushOuts</label> <span class='percentage'>"+ percentage +"%</span></div>";
			arrayStraightFlushOuts.forEach(function(val){
				html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"&"+val['naipe']+";</label>";
			});
		html += "</div>";
	}
	if(arrayFourofakindOuts.length > 0){
		var percentage = calculateOutsPercentage(boardArrayObject, arrayFourofakindOuts);
		html += "<div><div><label>Four of a kind Outs</label> <span class='percentage'>"+ percentage +"%</span></div>";
			arrayFourofakindOuts.forEach(function(val){
				html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"&"+val['naipe']+";</label>";
			});
		html += "</div>";
	}
	if(arrayFullHouseOuts.length > 0){
		var percentage = calculateOutsPercentage(boardArrayObject, arrayFullHouseOuts);
		html += "<div><div><label>Full House Outs</label> <span class='percentage'>"+ percentage +"%</span></div>";
			arrayFullHouseOuts.forEach(function(val){
				html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"&"+val['naipe']+";</label>";
			});
		html += "</div>";
	}
	if(arrayFlushOuts.length > 0){
		var percentage = calculateOutsPercentage(boardArrayObject, arrayFlushOuts);
		html += "<div><div><label>Flush Outs</label> <span class='percentage'>"+ percentage +"%</span></div>";
			arrayFlushOuts.forEach(function(val){
				html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"&"+val['naipe']+";</label>";
			});
		html += "</div>";
	}
	if(arrayStraightOuts.length > 0){
		var percentage = calculateOutsPercentage(boardArrayObject, arrayStraightOuts);
		html += "<div><div><label>Straight Outs</label> <span class='percentage'>"+ percentage +"%</span></div>";
			arrayStraightOuts.forEach(function(val){
				html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"&"+val['naipe']+";</label>";
			});
		html += "</div>";
	}
	if(arrayTreeOfaKindOuts.length > 0){
		var percentage = calculateOutsPercentage(boardArrayObject, arrayTreeOfaKindOuts);
		html += "<div><div><label>Tree Of a Kind Outs</label> <span class='percentage'>"+ percentage +"%</span></div>";
			arrayTreeOfaKindOuts.forEach(function(val){
				html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"&"+val['naipe']+";</label>";
			});
		html += "</div>";
	}
	if(arrayTwoPairsOuts.length > 0){
		var percentage = calculateOutsPercentage(boardArrayObject, arrayTwoPairsOuts);
		html += "<div><div><label>Two Pairs Outs</label> <span class='percentage'>"+ percentage +"%</span></div>";
			arrayTwoPairsOuts.forEach(function(val){
				html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"&"+val['naipe']+";</label>";
			});
		html += "</div>";
	}
	if(arrayPairOuts.length > 0){
		var percentage = calculateOutsPercentage(boardArrayObject, arrayPairOuts);
		html += "<div><div><label>Pair Outs</label> <span class='percentage'>"+ percentage +"%</span></div>";
			arrayPairOuts.forEach(function(val){
				html += "<label class='"+val['value']+" "+val['naipe']+"' data-id='"+val['id']+"' data-index='"+val['index']+"' data-value='"+val['value']+"' data-naipe='"+val['naipe']+"'>"+val['value']+"&"+val['naipe']+";</label>";
			});
		html += "</div>";
	}
	return html;
}

function countTotalOuts(arrayRoyalFlushOuts, arrayStraightFlushOuts, arrayFourofakindOuts, arrayFullHouseOuts, arrayFlushOuts, arrayStraightOuts, arrayTreeOfaKindOuts, arrayTwoPairsOuts, arrayPairOuts){
	var arrayOuts = [];

	$.each(arrayPairOuts, function(index, val){
		if(arrayOuts.indexOf(val) == -1){
			arrayOuts.push(val);
		}
	});

	$.each(arrayTwoPairsOuts, function(index, val){
		if(arrayOuts.indexOf(val) == -1){
			arrayOuts.push(val);
		}
	});

	$.each(arrayTreeOfaKindOuts, function(index, val){
		if(arrayOuts.indexOf(val) == -1){
			arrayOuts.push(val);
		}
	});

	$.each(arrayStraightOuts, function(index, val){
		if(arrayOuts.indexOf(val) == -1){
			arrayOuts.push(val);
		}
	});

	$.each(arrayFlushOuts, function(index, val){
		if(arrayOuts.indexOf(val) == -1){
			arrayOuts.push(val);
		}
	});

	$.each(arrayFullHouseOuts, function(index, val){
		if(arrayOuts.indexOf(val) == -1){
			arrayOuts.push(val);
		}
	});

	$.each(arrayFourofakindOuts, function(index, val){
		if(arrayOuts.indexOf(val) == -1){
			arrayOuts.push(val);
		}
	});

	$.each(arrayStraightFlushOuts, function(index, val){
		if(arrayOuts.indexOf(val) == -1){
			arrayOuts.push(val);
		}
	});

	$.each(arrayRoyalFlushOuts, function(index, val){
		if(arrayOuts.indexOf(val) == -1){
			arrayOuts.push(val);
		}
	});
	return arrayOuts;
}


function buildPackArrayObject(){
	pack = [
		{id: 1, index: 1, value: 2, naipe: "diams"},
		{id: 2, index: 1, value: 2, naipe: "spades"},
		{id: 3, index: 1, value: 2, naipe: "hearts"},
		{id: 4, index: 1, value: 2, naipe: "clubs"},
		{id: 5, index: 2, value: 3, naipe: "diams"},
		{id: 6, index: 2, value: 3, naipe: "spades"},
		{id: 7, index: 2, value: 3, naipe: "hearts"},
		{id: 8, index: 2, value: 3, naipe: "clubs"},
		{id: 9, index: 3, value: 4, naipe: "diams"},
		{id: 10, index: 3, value: 4, naipe: "spades"},
		{id: 11, index: 3, value: 4, naipe: "hearts"},
		{id: 12, index: 3, value: 4, naipe: "clubs"},
		{id: 13, index: 4, value: 5, naipe: "diams"},
		{id: 14, index: 4, value: 5, naipe: "spades"},
		{id: 15, index: 4, value: 5, naipe: "hearts"},
		{id: 16, index: 4, value: 5, naipe: "clubs"},
		{id: 17, index: 5, value: 6, naipe: "diams"},
		{id: 18, index: 5, value: 6, naipe: "spades"},
		{id: 19, index: 5, value: 6, naipe: "hearts"},
		{id: 20, index: 5, value: 6, naipe: "clubs"},
		{id: 21, index: 6, value: 7, naipe: "diams"},
		{id: 22, index: 6, value: 7, naipe: "spades"},
		{id: 23, index: 6, value: 7, naipe: "hearts"},
		{id: 24, index: 6, value: 7, naipe: "clubs"},
		{id: 25, index: 7, value: 8, naipe: "diams"},
		{id: 26, index: 7, value: 8, naipe: "spades"},
		{id: 27, index: 7, value: 8, naipe: "hearts"},
		{id: 28, index: 7, value: 8, naipe: "clubs"},
		{id: 29, index: 8, value: 9, naipe: "diams"},
		{id: 30, index: 8, value: 9, naipe: "spades"},
		{id: 31, index: 8, value: 9, naipe: "hearts"},
		{id: 32, index: 8, value: 9, naipe: "clubs"},
		{id: 33, index: 9, value: 10, naipe: "diams"},
		{id: 34, index: 9, value: 10, naipe: "spades"},
		{id: 35, index: 9, value: 10, naipe: "hearts"},
		{id: 36, index: 9, value: 10, naipe: "clubs"},
		{id: 37, index: 10, value: "J", naipe: "diams"},
		{id: 38, index: 10, value: "J", naipe: "spades"},
		{id: 39, index: 10, value: "J", naipe: "hearts"},
		{id: 40, index: 10, value: "J", naipe: "clubs"},
		{id: 41, index: 11, value: "Q", naipe: "diams"},
		{id: 42, index: 11, value: "Q", naipe: "spades"},
		{id: 43, index: 11, value: "Q", naipe: "hearts"},
		{id: 44, index: 11, value: "Q", naipe: "clubs"},
		{id: 45, index: 12, value: "K", naipe: "diams"},
		{id: 46, index: 12, value: "K", naipe: "spades"},
		{id: 47, index: 12, value: "K", naipe: "hearts"},
		{id: 48, index: 12, value: "K", naipe: "clubs"},
		{id: 49, index: 13, value: "A", naipe: "diams"},
		{id: 50, index: 13, value: "A", naipe: "spades"},
		{id: 51, index: 13, value: "A", naipe: "hearts"},
		{id: 52, index: 13, value: "A", naipe: "clubs"}
	];
	return pack;
}


function checkClickedKey(sumKeyCode){
	if(sumKeyCode == 98107){
		$('.card-id-1').click();
	}
	if(sumKeyCode == 98111){
		$('.card-id-2').click();
	}
	if(sumKeyCode == 98109){
		$('.card-id-3').click();
	}
	if(sumKeyCode == 98106){
		$('.card-id-4').click();
	}
	if(sumKeyCode == 99107){
		$('.card-id-5').click();
	}
	if(sumKeyCode == 99111){
		$('.card-id-6').click();
	}
	if(sumKeyCode == 99109){
		$('.card-id-7').click();
	}
	if(sumKeyCode == 99106){
		$('.card-id-8').click();
	}
	if(sumKeyCode == 100107){
		$('.card-id-9').click();
	}
	if(sumKeyCode == 100111){
		$('.card-id-10').click();
	}
	if(sumKeyCode == 100109){
		$('.card-id-11').click();
	}
	if(sumKeyCode == 100106){
		$('.card-id-12').click();
	}
	if(sumKeyCode == 101107){
		$('.card-id-13').click();
	}
	if(sumKeyCode == 101111){
		$('.card-id-14').click();
	}
	if(sumKeyCode == 101109){
		$('.card-id-15').click();
	}
	if(sumKeyCode == 101106){
		$('.card-id-16').click();
	}
	if(sumKeyCode == 102107){
		$('.card-id-17').click();
	}
	if(sumKeyCode == 102111){
		$('.card-id-18').click();
	}
	if(sumKeyCode == 102109){
		$('.card-id-19').click();
	}
	if(sumKeyCode == 102106){
		$('.card-id-20').click();
	}
	if(sumKeyCode == 103107){
		$('.card-id-21').click();
	}
	if(sumKeyCode == 103111){
		$('.card-id-22').click();
	}
	if(sumKeyCode == 103109){
		$('.card-id-23').click();
	}
	if(sumKeyCode == 103106){
		$('.card-id-24').click();
	}
	if(sumKeyCode == 104107){
		$('.card-id-25').click();
	}
	if(sumKeyCode == 104111){
		$('.card-id-26').click();
	}
	if(sumKeyCode == 104109){
		$('.card-id-27').click();
	}
	if(sumKeyCode == 104106){
		$('.card-id-28').click();
	}
	if(sumKeyCode == 105107){
		$('.card-id-29').click();
	}
	if(sumKeyCode == 105111){
		$('.card-id-30').click();
	}
	if(sumKeyCode == 105109){
		$('.card-id-31').click();
	}
	if(sumKeyCode == 105106){
		$('.card-id-32').click();
	}
	if(sumKeyCode == 9796107){
		$('.card-id-33').click();
	}
	if(sumKeyCode == 9796111){
		$('.card-id-34').click();
	}
	if(sumKeyCode == 9796109){
		$('.card-id-35').click();
	}
	if(sumKeyCode == 9796106){
		$('.card-id-36').click();
	}
	if(sumKeyCode == 74107){
		$('.card-id-37').click();
	}
	if(sumKeyCode == 74111){
		$('.card-id-38').click();
	}
	if(sumKeyCode == 74109){
		$('.card-id-39').click();
	}
	if(sumKeyCode == 74106){
		$('.card-id-40').click();
	}
	if(sumKeyCode == 81107){
		$('.card-id-41').click();
	}
	if(sumKeyCode == 81111){
		$('.card-id-42').click();
	}
	if(sumKeyCode == 81109){
		$('.card-id-43').click();
	}
	if(sumKeyCode == 81106){
		$('.card-id-44').click();
	}
	if(sumKeyCode == 75107){
		$('.card-id-45').click();
	}
	if(sumKeyCode == 75111){
		$('.card-id-46').click();
	}
	if(sumKeyCode == 75109){
		$('.card-id-47').click();
	}
	if(sumKeyCode == 75106){
		$('.card-id-48').click();
	}
	if(sumKeyCode == 65107){
		$('.card-id-49').click();
	}
	if(sumKeyCode == 65111){
		$('.card-id-50').click();
	}
	if(sumKeyCode == 65109){
		$('.card-id-51').click();
	}
	if(sumKeyCode == 65106){
		$('.card-id-52').click();
	}
	sumKeyCode = '';
}
