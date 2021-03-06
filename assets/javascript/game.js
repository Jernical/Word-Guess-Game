//GLOBAL VARIABLES
//---------------------------------------
// Used to record how many times a letter can be pressed
var doubleWord = ['a','b','c',
				  'd','e','f',
				  'g','h','i',
				  'j','k','l',
				  'm','n','o',
				  'p','q','r',
				  's','t','u',
				  'v','w','x',
                  'y','z'];
                  
//Holds the all the words
var wordBank =["buckaroo","buzzards","cattle","campfire","cowboy","highnoon","lasso","buckaroo","outlaw", "reward", "wanted", "governer", "arrest", "vest", "boot", "homestead", "sheriff"];

//Holds choosenWord
var choosenWord = "";

//Holds letters in word
var lettersInWord = [];

//Holds number of blanks in word
var numBlanks = 0;

//Holds Blanks and successful guesses
var blanksAndSuccesses =[];

//Holds Wrong guesses
var wrongLetters = [];

//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 9;
var rightGuessCounter = 0;
//FUNCTIONS
//----------------------------------------
function reset()
{
	//Chooses word randombly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 9;
	wrongLetters =[];
	blanksAndSuccesses =[];
	doubleWord = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];
	test=false;
	startGame();
}
function startGame()
{
    // Chooses word randomly from the wordBank
    choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    
    // Splits the choosen word into individual letters
    lettersInWord = choosenWord.split('');
    
    // Get the number of blanks
	numBlanks = lettersInWord.length;
	
    // RESET
	rightGuessCounter = 0;
	guessesLeft = 9;
	wrongLetters =[];
	blanksAndSuccesses =[];
	doubleWord = ['a','b','c',
					  'd','e','f',
					  'g','h','i',
					  'j','k','l',
					  'm','n','o',
					  'p','q','r',
					  's','t','u',
					  'v','w','x',
					  'y','z'];

	//Populate blanks
    for(var i = 0; i< numBlanks; i++)
    
	{
		blanksAndSuccesses.push('_');
		document.getElementById('wordToGuess').textContent = blanksAndSuccesses;
	}

    //Changes Text Content
	document.getElementById('wordToGuess').textContent = blanksAndSuccesses.join(' ');
	document.getElementById('numGuesses').textContent = guessesLeft;
	document.getElementById('winCounter').textContent = winCount;
	document.getElementById('lossCounter').textContent = loseCount;
    document.getElementById('wrongGuesses').textContent = wrongLetters;
}

function compareLetters(userKey)
{
				//If user key exist in choosen word then perform this function 
				if(choosenWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numBlanks; i++)
					{
						//Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							blanksAndSuccesses[i] = userKey;
							document.getElementById('wordToGuess').textContent = blanksAndSuccesses.join(' ');
						}	
					}
				}
				// Wrong Keys
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					// Changes HTML
					document.getElementById('numGuesses').textContent = guessesLeft;
					document.getElementById('wrongGuesses').textContent = wrongLetters;
				}
			
			
		
}
function winLose()
{
	// When number blanks if filled with right words then you win
	if(rightGuessCounter === numBlanks)
	{
		//Counts Wins 
		winCount++;
		//Changes HTML
		document.getElementById('winCounter').textContent = winCount;
		alert('You Win! Yee-Haw! Word was: ' + choosenWord);
		reset();
	}
	// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		// Counts losses
		loseCount++;
		// Changes HTML
		document.getElementById('lossCounter').textContent = loseCount;
		alert('You Lose correct answer was: ' + choosenWord);
		reset();
	}
}

// Initiates the Code
startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < doubleWord.length; i++)
	{	
		if(letterGuessed === doubleWord[i] && test === true)
		{
			var spliceDword = doubleWord.splice(i,1);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}