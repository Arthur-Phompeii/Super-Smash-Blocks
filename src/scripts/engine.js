/* const state é onde definimos as váriaveis */
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        life: 3,
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
        lifeId: setInterval (gameOver)
    }
};

/* Função que controla o tempo */
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        playSound("GameOver");
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.mp3`)
    audio.volume = 0.7;  // adjust volume to 70%
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {square.classList.remove("enemy");
});
        
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

/* Adiciona o evento de clique */
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit-2");
            }
            else if (randomSquare.id != state.values.hitPosition) {
                state.values.life--;
                state.view.lives.textContent = state.values.life;
                state.values.hitPosition = null;
                playSound("hit-1");
            };
        });
    });
} 

function gameOver() {
    if (state.values.life <= 0) {
        playSound("GameOver");
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.lifeId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        location.forceGet()
    };
}

/* Função que nicializa e chama as outras funções/variáveis */
function initialize() {
    addListenerHitBox();
    gameOver();
    alert("Para recomeçar o jogo recarregue a página ou aperte f5")
}

initialize();