
//sounds
// const pew = new Audio('../sounds/pew.wav');
// pew.volume = 0.2; 

// const nextLevel = new Audio('../sounds/next-level.wav');
// nextLevel.volume = 0.4; 

// const chime = new Audio('../sounds/chime.wav');
// chime.volume = 0.4; 

//images
import {GameOver} from "./GameOver";
import {Meteors} from "./Meteors";
import {Cannon} from "./Cannon";

const crossImage = new Image();
crossImage.src = '../images/crosshairs.svg';

export class Game {
    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.cannonXArray = [0, 275, 550];
        this.cannonObjs = [];
        this.firedMissiles = [];
        this.baseCount = 6;
        this.baseXArray = [50, 125, 225, 375, 450, 525];
        this.baseObjArray = [];
        this.meteorArray = [];
        this.explosionArray = [];
        this.playerScore = 0;
        this.waveCount = 1;
        this.active = false;
        this.paused = false;
        this.isGameOver = false;
        this.gameOverLoop;
    }

    gameLoop() {
        this.context.clearRect(0, 0, this.width, this.height);

        //text on canvas
        this.drawScore();
        this.drawWave();
        this.drawPlayerBaseCount();
        this.drawPlayerMissileCount();

        //cannon
        this.manageCannons();

        //bases
        this.manageBases();

        //meteors
        this.manageMeteors();

        //missiles
        this.manageMissiles();

        //crosshairs
        this.triggerCrosshair();

        //explosions
        this.manageExplosions();

        //generate waves
        this.nextWave();

        //detect gameover
        // this.gameOver();

        if (this.paused === false && this.isGameOver === false) {
            this.animate();
        }
    }

    animate() {
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    startGame() {
        this.animate();
        this.initWave();
    }

    initWave() {
        this.populateMeteors(10);
        this.meteorsPickTarget();
        this.populateBases();
        this.populateCannons();
        this.cannonObjs.forEach(cannon => cannon.populateMissiles(20));
    }

    nextWave() {
        if (this.meteorArray.length === 0 &&
            this.baseObjArray.length > 0 &&
            this.cannonObjs.length > 0 && this.waveCount === 1) {
            this.populateMeteors(15);
            this.meteorsPickTarget();
            this.cannonObjs.forEach(cannon => cannon.populateMissiles(5));
            this.waveCount += 1;
            // nextLevel.play();
            // setTimeout(chime.play(), 4000);
            document.querySelector('#game').style.backgroundImage = "url('../images/background-imgs/city-of-dawn-green.jpg')";
        } else if (this.meteorArray.length === 0 &&
            this.baseObjArray.length > 0 &&
            this.cannonObjs.length > 0 && this.waveCount === 2) {
            this.populateMeteors(25);
            this.meteorsPickTarget();
            this.cannonObjs.forEach(cannon => cannon.populateMissiles(5));
            this.waveCount += 1;
            // nextLevel.play();
            // setTimeout(chime.play(), 4000);
            document.querySelector('#game').style.backgroundImage = "url('../images/background-imgs/city-of-dawn-red.jpg')";
        } else if (this.meteorArray.length === 0 &&
            this.baseObjArray.length > 0 &&
            this.cannonObjs.length > 0 && this.waveCount === 3) {
            this.populateMeteors(25);
            this.meteorsPickTarget();
            this.cannonObjs.forEach(cannon => cannon.populateMissiles(5));
            this.waveCount += 1;
            // nextLevel.play();
            // setTimeout(chime.play(), 4000);
            document.querySelector('#game').style.backgroundImage = "url('../images/background-imgs/city-of-dawn-purple.jpg')";
        } else if (this.meteorArray.length === 0 &&
            this.baseObjArray.length > 0 &&
            this.cannonObjs.length > 0 && this.waveCount >=4) {
            console.log('next-inf');
            this.populateMeteors(50);
            this.meteorsPickTarget();
            this.cannonObjs.forEach(cannon => cannon.populateMissiles(5));
            this.waveCount += 1;
            // nextLevel.play();
            // setTimeout(chime.play(), 4000);
            document.querySelector('#game').style.backgroundImage = "url('../images/background-imgs/city-of-dawn-orange.jpg')";
        }
    }

    keepScore() {
        this.playerScore += 100;
    }

    drawToScreen(font, color, content, x, y) {
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(content, x, y);
    }

    drawScore() {
        this.drawToScreen('20px Monospace', '#2E9DD1', 'Score: ' + this.playerScore, 8, 20);
    }

    drawWave() {
        this.drawToScreen('20px Monospace', '#2E9DD1', 'Wave: ' + this.waveCount, 8, 45);
    }

    drawPlayerBaseCount() {
        this.drawToScreen('20px Monospace', '#2E9DD1', 'Bases: ' + this.baseCount, 495, 20);
    }

    drawPlayerMissileCount() {
        this.cannonObjs.forEach((cannon, i) => {
            const y = i * 20 + 20;
            this.drawToScreen('20px Monospace', '#DB4AE2', 'Missiles: ' + cannon.ammo.length, 235, y);
        })
    }

    gameOver() {
        if (this.baseCount === 0 || this.cannon.w === 0) {
            this.meteorArray.forEach((meteor) => {
                meteor.x += meteor.dx * 7;
                meteor.y += meteor.dy * 7;
            });
            this.drawGameOver();
            if (this.meteorArray.length <= 0 && this.explosionArray.length <= 0) {
                this.paused = true;
                this.isGameOver = true;
                this.gameOverLoop = new GameOver(this.playerScore, this.baseCount, this.cannon.ammo.length);
                const total = this.gameOverLoop.totalScores();
                this.gameOverLoop.total = total;
                this.endLoop();
            }
        }
    }

    drawGameOver() {
        this.drawToScreen('80px Monospace', '#2E9DD1', 'GAME OVER', 90, 300);
    }

    endLoop() {
        this.context.clearRect(0, 0, this.width, this.height);

        this.drawGameOver();
        this.gameOverLoop.drawScore(this.context);
        this.gameOverLoop.moveScore();

        if (this.gameOverLoop.scoreObj.hasArrived) {
            this.gameOverLoop.drawBaseCount(this.context);
            this.gameOverLoop.moveBaseCount();
            this.gameOverLoop.addScores();
        }

        if (this.gameOverLoop.baseCountObj.x < 10) {
            this.gameOverLoop.drawMissileCount(this.context);
            this.gameOverLoop.moveMissileCount();
            this.gameOverLoop.addScores();
        }

        requestAnimationFrame(this.endLoop.bind(this));
    }

    clicked(mouseX, mouseY) {
        if (mouseY < 505 && !this.paused) {
            if(mouseX <= 150) {
                const missile = this.cannonObjs[0].fireMissile(mouseX, mouseY);
                this.firedMissiles.push(missile);
            } else if (mouseX > 150 && mouseX < 450) {
                const missile = this.cannonObjs[1].fireMissile(mouseX, mouseY);
                this.firedMissiles.push(missile);
            } else if (mouseX >= 450) {
                const missile = this.cannonObjs[2].fireMissile(mouseX, mouseY);
                this.firedMissiles.push(missile);
            }
        }
    }

    triggerCrosshair() {
        this.cannonObjs.forEach(cannon => {
            cannon.firedArray.forEach(missile => {
                if(!missile.hasArrived) {
                    this.drawCrosshair(missile.targetX - 7.5, missile.targetY - 7.5);
                }
            });
        })
    }

    drawCrosshair(x, y) {
        this.context.drawImage(crossImage, x, y, 15, 15);
    }

    populateMeteors(amount) {
        for (let i = 0; i < amount; i++) {
            this.meteorArray.push(new Meteors((Math.floor(Math.random() * 600)) ,(Math.floor(Math.random() * -810)) , 3));
        }
    }

    meteorsPickTarget() {
        const targetArray = this.baseXArray.map((baseX) => {
            return baseX + 15;
        });
        //adds cannon to targetArray
        // targetArray.push(this.cannon.x + (this.cannon.w / 2));

        this.cannonObjs.forEach(cannon => targetArray.push(cannon.x + (cannon.w / 2)));
        //meteors are assigned random targets
        this.meteorArray.forEach((meteor) => {
            meteor.targetX = targetArray[Math.floor(Math.random() * targetArray.length)];
            meteor.targetY = 550;
        });
    }

    manageMeteors() {
        this.meteorArray.forEach((meteor, i) => {
            meteor.draw(this.context);
            meteor.move();
            this.meteorsColliding(meteor);
            this.meteorsExploding(meteor, i);
        });
    }

    meteorsColliding(meteor) {
        this.explosionArray.forEach((explosion) => {
            if (meteor.y <= (explosion.y + explosion.radius) &&
                meteor.y >= (explosion.y - explosion.radius) &&
                meteor.x <= (explosion.x + explosion.radius) &&
                meteor.x >= (explosion.x - explosion.radius)) {
                meteor.hasCollided = true;
            }
        });
    }

    meteorsExploding(meteor, i) {
        if (meteor.hasArrived === true) {
            this.explosionArray.push(meteor.explode());
            this.meteorArray.splice(i, 1);
        }	else if (meteor.hasCollided === true) {
            this.explosionArray.push(meteor.explode());
            this.meteorArray.splice(i, 1);
            this.keepScore();
        }
    }

    populateBases() {
        this.baseXArray.forEach((baseX) => {
            this.baseObjArray.push(new Base(baseX, 550, 30, 45));
        });
    }

    manageBases() {
        this.baseObjArray.forEach((base, i) => {
            base.draw(this.context);
            this.basesDestroyed(base, i);
        });
    }

    basesDestroyed(base, i) {
        this.explosionArray.forEach((explosion) => {
            if (base &&
                base.y <= (explosion.y + explosion.radius) &&
                base.y >= (explosion.y - explosion.radius) &&
                base.x <= (explosion.x + explosion.radius) &&
                base.x >= (explosion.x - explosion.radius)) {
                this.baseObjArray.splice(i, 1);
                this.baseCount -= 1;
            }
        });
    }

    populateCannons() {
        this.cannonXArray.forEach((cannonX) => {
            this.cannonObjs.push(new Cannon(cannonX, 545, 50, 50));
        });
    }

    manageCannons() {
        this.cannonObjs.forEach((cannon, i) => {
            cannon.draw(this.context);
            this.cannonsDestroyed(cannon);
        });
    }

    cannonsDestroyed(cannon) {
        this.explosionArray.forEach((explosion) => {
            if (cannon.y <= (explosion.y + explosion.radius) &&
                cannon.y >= (explosion.y - explosion.radius) &&
                cannon.x <= (explosion.x + explosion.radius) &&
                cannon.x >= (explosion.x - explosion.radius)) {

                cannon.deactivate();
            }
        });
    }

    manageMissiles() {
        this.cannonObjs.forEach(cannon => {

            if (cannon.hasAmmo === true ) {
                this.firedMissiles.forEach((missile, i) => {
                    missile.draw(this.context);
                    missile.drawTrail(this.context);
                    this.missileExplode(missile, i);
                });
            }

        })
    }

    missileExplode(missile, i) {
        if (missile.hasArrived === true) {
            this.explosionArray.push(missile.explode());
            this.firedMissiles.splice(i, 1);
        }
    }

    manageExplosions() {
        this.explosionArray.forEach((explosion, i) => {
            explosion.draw(this.context);
            if (explosion.isExploded === false) {
                explosion.explode();
            } else {
                explosion.implode();
            }
            if (explosion.isExploded === true &&
                explosion.radius === explosion.minRadius) {
                this.explosionArray.splice(i, 1);
            }
        });
    }
}