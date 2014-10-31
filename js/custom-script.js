var randomNum = 0;
var guesses = [];


function randomNumGen()
{
	return Math.floor((Math.random() * 100) + 1);
}

function gL()
{
	return guesses.length;
}

function showHint()
{
	$('#hint').find('.modal-content').text(randomNum);
	$('#hint').modal('show');
}

function sameCheck()
{
	return guesses.indexOf(guesses[gL() - 1]) < (gL() - 1);
}

function numCheck()
{
	return (guesses[gL() - 1] >= 1 && guesses[gL() - 1] <= 100)
}

function guessCheck()
{
	return gL() < 10;
}

function gameOver()
{
	$('#gameOver').modal('show');
	$('#gameOver').find('.modal-footer').on('click', '.btn-success', gameReset);

}

function gameReset()
{

	randomNum = randomNumGen();
	removeGuesses();
	guesses = [];
	reset();
	$('#gameOver').modal('hide');

}

function removeGuesses()
{
	/*
	for(var x = 0; x < gL(); x++)
	{

	}
	*/

	//var guessList = 
	$('#guesses').find('.dropdown-menu').empty();
	$('#guesses').addClass('beenHid');
	$('#guesses').removeClass('guess-group');
	//console.log(guessList);
	//var childGuess;

	//for(childGuess in guessList)
	//{
	//	guessList.removeChild(childGuess);
	//}
	//guessList.empty();
	//console.log(guessList);
}

function properNumMessage()
{
	//alert("Enter a number between 1 and 100.");
	$('#improper').modal('show');
}

function sameNumMessage()
{
	//alert("Enter a number between 1 and 100.");
	$('#sameNum').modal('show');
}

function addGuess()
{
	//for(var x = 0; x < guesses.length; x++)
	//{
		var guess = $('<li><a href="#">' + guesses[guesses.length - 1] + '</a></li>');
		$('#guesses').find('.dropdown-menu').append(guess);
		$('#guesses').addClass('guess-group');
		$('#guesses').removeClass('beenHid');
		//$('#guesses').fadeToggle();
}

function success()
{
	$('#success').fadeToggle();
	$('body').addClass('success');
}

//function failure()
//{
//	$('#colder').fadeToggle();
//	$('body').addClass('failure');
//}

function reset()
{
	$('#success').hide();
	$('#colder').hide();
	$('#warmer').hide();
	//$('#guesses').hide();
	setTimeout(function(){$('body').removeClass('warmer')}, 1000);
	setTimeout(function(){$('body').removeClass('cooler')}, 1000);
	$('body').removeClass('success');
	//$('#guesses').addClass('hidden');

}

function hot(diff)
{
	return (Math.abs(diff) <= 20);
}

function hotter(diff)
{
	return (Math.abs(diff) < Math.abs(guesses[guesses.length - 2] - randomNum));
}

function warm(diff)
{
	if(diff > 0)
	{
		$('#warmer').find('strong').text("You're warm. Guess again, this time lower.");
		$('#warmer').fadeToggle();
		$('body').addClass('warmer');
	}
	else
	{
		$('#warmer').find('strong').text("You're warm. Guess again, this time higher.")
		$('#warmer').fadeToggle();
		$('body').addClass('warmer');
	}
}

function cold(diff)
{
	if(diff > 0)
	{
		$('#colder').find('strong').text("You're cold. Guess again, this time lower.");
		$('#colder').fadeToggle();
		$('body').addClass('cooler');
	}
	else
	{
		$('#colder').find('strong').text("You're cold. Guess again, this time higher.")
		$('#colder').fadeToggle();
		$('body').addClass('cooler');
	}
}

function warmer(diff)
{
	if(diff > 0)
	{
		$('#warmer').find('strong').text("Getting warmer. Guess again, this time lower.");
		$('#warmer').fadeToggle();
		$('body').addClass('warmer');
	}
	else
	{
		$('#warmer').find('strong').text("Getting warmer. Guess again, this time higher.")
		$('#warmer').fadeToggle();
		$('body').addClass('warmer');
	}
}

function colder(diff)
{
	if(diff > 0)
	{
		$('#colder').find('strong').text("Cooling off. Guess again, this time lower.");
		$('#colder').fadeToggle();
		$('body').addClass('cooler');
	}
	else
	{
		$('#colder').find('strong').text("Cooling off. Guess again, this time higher.")
		$('#colder').fadeToggle();
		$('body').addClass('cooler');
	}
}

function submitAnswer()
{
	//console.log($('#focusedInput').val());
	//setTimeout(function(){reset()}, 2000);
	reset();

	//var answer = +$('#focusedInput').val();
	guesses.push(+$('#focusedInput').val());

	
		
	
	
	//console.log(answer);
	//alert(answer);

	//console.log(randomNum);
	if(numCheck() && !sameCheck())
	{
		addGuess();
		
		var difference = guesses[gL() - 1] - randomNum;

		if(!guessCheck())
		{
			gameOver();
		}

		else if(guesses[gL() - 1] == randomNum)
		{
			success();
		}

		else if(guesses.length == 1)
		{
			if(hot(difference))
			{
				warm(difference);
			}
			else
			{
				cold(difference);
			}
		}

		else
		{
			if(hotter(difference))
			{		
			//Check for hot
				//console.log("guess lower.")
				//$('#colder').find('strong').text("Guess again, this time lower.")
				//failure();
				warmer(difference);
			}

			else
			{
				colder(difference);
				//console.log("guess higher.")
				//$('#colder').find('strong').text("Guess again, this time higher.")
				//failure();
			}
		}

	}

	else
	{
		if(!numCheck())
		{
			properNumMessage();
		}
		else
		{
			sameNumMessage();
		}
	}

	$('#focusedInput').val("");

}

$(document).ready(function()
{
	//alert(randomNumGen());
	//console.log(randomNum);
	randomNum = randomNumGen();


	$('#focusedInput').keydown(function(event){
		//alert(event);

		//event.stopPropagation();
		if(event.keyCode == 13)
		{
			submitAnswer();
		}

		if( (event.keyCode < 48 || event.keyCode > 57)
			&& (event.keyCode != 8)
			&& (event.keyCode < 96 || event.keyCode > 105) 
		  )
		{
			event.preventDefault();
		}

		

	});

	$('#buttons').on('click', '.btn-success', submitAnswer);
	$('#buttons').on('click', '.btn-primary', showHint);
	$('#buttons').on('click', '.btn-danger', gameReset);

});