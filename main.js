const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SimonGame {
    constructor() {
        this.sequence = [];
        this.userStep = 0;
        this.level = 1;
        
        let savedScore = localStorage.getItem('simon-highscore');
        this.highScore = savedScore ? parseInt(savedScore) : 0;
        
        this.isUserTurn = false;

        this.levelEl = document.getElementById('level');
        this.highScoreEl = document.getElementById('highScore');
        this.statusEl = document.getElementById('status');
        this.startBtn = document.getElementById('startBtn');
        this.board = document.getElementById('board');
        this.buttons = document.querySelectorAll('.color-btn');

        this.highScoreEl.innerText = this.highScore;

        this.startBtn.onclick = () => this.startGame();

        this.buttons.forEach(btn => {
            btn.onclick = (e) => this.handleUserClick(parseInt(e.target.dataset.id));
        });
    }

    async startGame() {
        this.startBtn.disabled = true;
        this.sequence = [];
        this.level = 1;
        this.levelEl.innerText = this.level;
        await this.nextRound();
    }

    async nextRound() {
        this.isUserTurn = false;
        this.userStep = 0;
        this.board.classList.add('locked');

        this.sequence.push(Math.floor(Math.random() * 4));

        this.statusEl.innerText = "Ready...";
        await delay(800);
        this.statusEl.innerText = "Set...";
        await delay(800);
        this.statusEl.innerText = "Go!";
        await delay(800);
        
        this.statusEl.innerText = "Запоминай последовательность";
        await this.playSequence();

        this.statusEl.innerText = "Твой ход!";
        this.isUserTurn = true;
        this.board.classList.remove('locked');
    }

    async playSequence() {
        for (let i = 0; i < this.sequence.length; i++) {
            let id = this.sequence[i];
            await delay(400); 
            
            let btn = document.getElementById(`btn${id}`);
            btn.classList.add('active');
            
            await delay(500); 
            btn.classList.remove('active');
        }
    }

    async handleUserClick(id) {
        if (!this.isUserTurn) return;

        let btn = document.getElementById(`btn${id}`);
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 200);

        if (id !== this.sequence[this.userStep]) {
            this.gameOver();
            return;
        }

        this.userStep++;

        if (this.userStep === this.sequence.length) {
            this.isUserTurn = false;
            this.board.classList.add('locked');
            this.statusEl.innerText = "Верно!";
            this.level++;
            this.levelEl.innerText = this.level;

            if (this.level > this.highScore) {
                this.highScore = this.level;
                this.highScoreEl.innerText = this.highScore;
                localStorage.setItem('simon-highscore', this.highScore);
            }

            await delay(1000);
            await this.nextRound();
        }
    }

    gameOver() {
        this.isUserTurn = false;
        this.board.classList.add('locked');
        this.statusEl.innerText = `Ошибка! Достигнут уровень: ${this.level}`;
        this.startBtn.disabled = false;
        this.startBtn.innerText = "Начать заново";
    }
}

window.game = new SimonGame();