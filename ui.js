class SimonUI {
    constructor() {
        this.levelEl = document.getElementById('level');
        this.highScoreEl = document.getElementById('highScore');
        this.statusEl = document.getElementById('status');
        this.startBtn = document.getElementById('startBtn');
        this.board = document.getElementById('board');
        this.buttons = document.querySelectorAll('.color-btn');
    }

    updateDisplays(level, highScore) {
        if (level !== undefined) this.levelEl.innerText = level;
        if (highScore !== undefined) this.highScoreEl.innerText = highScore;
    }

    setStatus(text) {
        this.statusEl.innerText = text;
    }

    setBoardLocked(locked) {
        if (locked) {
            this.board.classList.add('locked');
        } else {
            this.board.classList.remove('locked');
        }
    }

    setStartBtnState(disabled, text) {
        this.startBtn.disabled = disabled;
        if (text) this.startBtn.innerText = text;
    }

    async activateButton(id, duration = 500) {
        let btn = document.getElementById(`btn${id}`);
        btn.classList.add('active');
        
        if (duration > 0) {
            await delay(duration);
            btn.classList.remove('active');
        }
    }

    async playSequence(sequence) {
        for (let i = 0; i < sequence.length; i++) {
            let id = sequence[i];
            await delay(400);
            await this.activateButton(id, 500);
        }
    }
}