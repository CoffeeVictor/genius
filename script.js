let blue = document.querySelector("#blue")
let yellow = document.querySelector("#yellow")
let red = document.querySelector("#red")
let green = document.querySelector("#green")
let newGameBtn = document.querySelector(".new-game-btn")
let maxScoreEl = document.querySelector(".max-score")
let scoreEl = document.querySelector(".score")

let maxScore = 0;

let game = {
    score: 0,
    order: [],
    playedOrder: []
}

maxScoreEl.innerHTML = maxScore;

const colors = ['green', 'yellow', 'red', 'blue']

newGameBtn.onclick = () => {
    setTimeout(() => {playAudio(0)}, 0)
    resetGame()
    newStage()
}

green.onclick = () => {
    setTimeout(() => {playAudio(1)},0)
    addToSequence(0)
    //green.classList.add('lit')
    //green.classList.remove('lit')
}
yellow.onclick = () => {
    setTimeout(() => {playAudio(2)},0)
    addToSequence(1)
    //yellow.classList.add('lit')
    //yellow.classList.remove('lit')
}
red.onclick = () => {
    setTimeout(() => {playAudio(3)},0)
    addToSequence(2)
    //red.classList.add('lit')
    //red.classList.remove('lit')
}
blue.onclick = () => {
    setTimeout(() => {playAudio(4)},0)
    addToSequence(3)
    //blue.classList.add('lit')
    //blue.classList.remove('lit')
}

function playAudio(idx) {
    const audio = new Audio(`/assets/note0${idx}.wav`)

    audio.play()

}

function addToSequence(number) {
    game.playedOrder.push(number)

    for(let i = 0; i < game.playedOrder.length; i++) {
        if(game.order[i] !== game.playedOrder[i]) {
            return gameOver()
        }
    }

    if(game.order.length === game.playedOrder.length) {
        maxScore = Math.max(++game.score, maxScore)
        maxScoreEl.innerHTML = maxScore;
        newStage()
    }
}

async function newStage() {
    getNewColor()
    await sleep(750)
    playColorSequence([...game.order])
    game.playedOrder = [];
}

function gameOver() {

    document.querySelector('.message-container').classList.remove('invisible')

    scoreEl.innerHTML = `Pontuação: ${game.score}`
}

function resetGame() {
    document.querySelector('.message-container').classList.add('invisible')

    game = {
        score: 0,
        order: [],
        playedOrder: []
    }
}

function getNewColor() {

    const newColor = Math.floor(Math.random() * 4)

    game.order.push(newColor)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playColorSequence(sequence) {

    if(sequence.length > 0) {
        const color = sequence.shift();
        const button = document.querySelector('#' + colors[color]);
        playAudio(color + 1)
        button.classList.add('lit')
        await sleep(500)
        button.classList.remove('lit')
        await sleep(100)
        playColorSequence(sequence)
    }
}

//window.alert('Lembre de ligar o som ;) Bom jogo!')