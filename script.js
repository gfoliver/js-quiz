var currentQuestion = 0

const questions = [
	{
		id: 0,
		level: "easy",
		title: "First Question",
		body: "Do you want to play ?",
		answer: "yes"
	},
	{
		id: 1,
		level: "medium",
		title: "Second Question",
		body: "Each one of the current alternatives is the correct sequence to Lorem ? <br> a) Dolor <br> b) Ipsum <br> c) Amet <br> d) book <br> e) Sit <br>",
		answer: "b"
	},
]

const colors = {
	levels: {
		easy: ["#62d8e2", "#4cea3f", "#5292ef", "#52c729"],
		medium: ["#e3e412", "#f5a51b", "#bb28ef"],
		hard: ["#ef2828"]
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getColorByLevel(currentQuestionLevel) {
	console.log('running getColorByLevel')
	let availableColors = colors.levels[currentQuestionLevel]
	shuffle(availableColors)
	return availableColors[0]
}

function startGame() {
	console.log('running startGame')
	callQuestion(currentQuestion)
}

function endMessage(won) {
	console.log('running endMessage')

	$('.questions-wrapper').append(`
		<h1 class="end-message ${won ? 'won' : 'lost'}">${won ? 'Congratulations! you\'ve Won the Quiz' : 'Try again next time :)'}</h1>
	`)

	setTimeout(function() {
		let canRestart = confirm('Do you want to play again ?')
		if (canRestart)
			restartGame(false, null, true)
		else 
			alert('ok then')
	}, 1000)
}

function restartGame(showMessage, won, start) {
	console.log('running restartGame')
	currentQuestion = 0

	$('.single-question').addClass('no-opacity')
	$('.end-message').addClass('no-opacity')
	setTimeout(function() {
		$('.single-question').remove()
		$('.end-message').remove()

		if (showMessage) {
			if (won)
				endMessage(true)
			else
				endMessage(false)
		}

		if (start)
			startGame()

	},600)
}

function callQuestion(n) {
	console.log('running callQuestion')
	askQuestion(questions[n])
}

function toggleBody(id) {
	console.log('running toggleBody')
	toggleIcon(id)
	$(`#${id}-body`).slideToggle()
}

function toggleIcon(id) {
	console.log('running toggleIcon')
	$(`#expand-${id}`).toggleClass('open')
}

function askQuestion(question) {
	console.log('running askQuestion')
	let questionColor = getColorByLevel(question.level)
	$('.questions-wrapper').append(`
		<div id="${question.id}" class="single-question" style="box-shadow: 5px 5px ${questionColor};">
			<div class="question-header">
				<h2 class="question-title">${question.title}</h2>
				<span class="expand" id="expand-${question.id}" onclick="toggleBody(${question.id})">
					<div class="bar"></div>
					<div class="bar"></div>
				</span>
			</div>
			<div class="question-body collapse" id="${question.id}-body">
				<hr style="border-color: ${questionColor};">
				<h4>${question.body}</h4>
				<div class="form-group d-flex">
					<input type="text" class="form-control" id="question-${question.id}-answer">
					<input type="submit" onclick="submitAnswer(${question.id})" value="SUBMIT ANSWER" class="btn submit-answer" style="background-color: ${questionColor}">
				</div>
			</div>
		</div>`)
	
	setTimeout(function() {
		$(`#${question.id}`).addClass('slide-right')
	}, 400)
}

function checkAnswer(id) {
	console.log('running checkAnswer')
	let userAnswer = $(`#question-${id}-answer`).val()
	if (questions[id].answer == userAnswer)
		return true
	else
		return false
}

function endGame(won) {
	console.log('running endGame')
	if (won) {
		restartGame(true, true, false)
	} else {
		restartGame(true, false, false)
	}
}

function nextQuestion() {
	console.log('running nextQuestion')
	currentQuestion++
	if (currentQuestion >= questions.length)
		endGame(true)
	else
		callQuestion(currentQuestion)
}

function submitAnswer(id) {
	console.log('running submitAnswer')

	if (checkAnswer(id)) {
		nextQuestion()
	} else {
		endGame(false)
	}
}

document.addEventListener('DOMContentLoaded', function() {
	startGame()
})