const wordsContainer = document.getElementById('words-container') as HTMLElement;
const input = document.getElementById('input') as HTMLInputElement;
const scoreDisplay = document.getElementById('score') as HTMLElement;

const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew"];
let activeWords: { word: string, element: HTMLElement, position: number }[] = [];
let score = 0;
let gameInterval: ReturnType<typeof setInterval>;

function addWord() {
    const word = words[Math.floor(Math.random() * words.length)];
    const wordElement = document.createElement('div');
    wordElement.className = 'word';
    wordElement.textContent = word;
    wordsContainer.appendChild(wordElement);

    activeWords.push({ word, element: wordElement, position: 0 });
}

function updateWords() {
    activeWords.forEach((item, index) => {
        item.position += 1;
        item.element.style.top = `${item.position * 5}px`;

        if (item.position * 5 > wordsContainer.clientHeight) {
            gameOver();
        }
    });
}

function checkInput() {
    const inputValue = input.value.trim();
    const wordIndex = activeWords.findIndex(item => item.word === inputValue);

    if (wordIndex !== -1) {
        wordsContainer.removeChild(activeWords[wordIndex].element);
        activeWords.splice(wordIndex, 1);
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
        input.value = '';
    }
}

function gameOver() {
    clearInterval(gameInterval);
    alert('Game Over');
    resetGame();
}

function resetGame() {
    activeWords.forEach(item => {
        wordsContainer.removeChild(item.element);
    });
    activeWords = [];
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    input.value = '';
    startGame();
}

function startGame() {
    gameInterval = setInterval(() => {
        addWord();
        updateWords();
    }, 1000);
}

input.addEventListener('input', checkInput);
startGame();
