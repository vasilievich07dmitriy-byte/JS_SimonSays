const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SimonData {
    constructor() {
        this.sequence = [];
        this.userStep = 0;
        this.level = 1;
        
        let savedScore = localStorage.getItem('simon-highscore');
        this.highScore = savedScore ? parseInt(savedScore) : 0;
        
        this.isUserTurn = false;
    }

    resetForNewGame() {
        this.sequence = [];
        this.level = 1;
    }

    prepareNewRound() {
        this.isUserTurn = false;
        this.userStep = 0;
        this.sequence.push(Math.floor(Math.random() * 4));
    }

    checkClick(id) {
        return id === this.sequence[this.userStep];
    }

    advanceStep() {
        this.userStep++;
    }

    isRoundComplete() {
        return this.userStep === this.sequence.length;
    }

    levelUp() {
        this.level++;
        if (this.level > this.highScore) {
            this.highScore = this.level;
            localStorage.setItem('simon-highscore', this.highScore);
        }
    }
}