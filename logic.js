class SimonLogic {
    constructor(data, ui) {
        this.data = data;
        this.ui = ui;
        
        this.ui.updateDisplays(undefined, this.data.highScore);
        this.bindEvents();
    }

    bindEvents() {
        this.ui.startBtn.onclick = () => this.startGame();
        
        this.ui.buttons.forEach(btn => {
            btn.onclick = (e) => this.handleUserClick(parseInt(e.target.dataset.id));
        });
    }

    async startGame() {
        this.ui.setStartBtnState(true);
        this.data.resetForNewGame();
        this.ui.updateDisplays(this.data.level);
        await this.nextRound();
    }

    async nextRound() {
        this.data.prepareNewRound();
        this.ui.setBoardLocked(true);

        this.ui.setStatus("Ready...");
        await delay(800);
        this.ui.setStatus("Set...");
        await delay(800);
        this.ui.setStatus("Go!");
        await delay(800);
        
        this.ui.setStatus("Запоминай последовательность");
        await this.ui.playSequence(this.data.sequence);

        this.ui.setStatus("Твой ход!");
        this.data.isUserTurn = true;
        this.ui.setBoardLocked(false);
    }

    async handleUserClick(id) {
        if (!this.data.isUserTurn) return;

        this.ui.activateButton(id, 200);

        if (!this.data.checkClick(id)) {
            this.gameOver();
            return;
        }

        this.data.advanceStep();

        if (this.data.isRoundComplete()) {
            this.data.isUserTurn = false;
            this.ui.setBoardLocked(true);
            this.ui.setStatus("Верно!");
            
            this.data.levelUp();
            this.ui.updateDisplays(this.data.level, this.data.highScore);

            await delay(1000);
            await this.nextRound();
        }
    }

    gameOver() {
        this.data.isUserTurn = false;
        this.ui.setBoardLocked(true);
        this.ui.setStatus(`Ошибка! Достигнут уровень: ${this.data.level}`);
        this.ui.setStartBtnState(false, "Начать заново");
    }
}

const gameData = new SimonData();
const gameUI = new SimonUI();
window.game = new SimonLogic(gameData, gameUI);