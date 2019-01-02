const GameEntity = require('./GameEntity.js');
const Missile = require('./Missile.js');

const cannonImg = new Image();
cannonImg.src = '../images/Cannon.png';

module.exports = class Cannon extends GameEntity {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.center = this.w / 2 + this.x;
    this.ammo = [];
    this.firedArray = [];
    this.hasAmmo = false;   
  }

  draw(context) {
    context.drawImage(cannonImg, this.x, this.y, this.w, this.h);
  }

  populateMissiles(amount) {
    this.hasAmmo = true; 
    for (let i = 0; i < amount; i++) {
      this.ammo.push(new Missile(this.center, 550, 5, 5, this.center));
    }
  }

  fireMissile(mouseX, mouseY) {
    const firedMissile = this.ammo.pop();

    firedMissile.targetX = mouseX;
    firedMissile.targetY = mouseY;
    firedMissile.setVelocity();
    
    // this.firedArray.push(firedMissile);
    return firedMissile;
  }

  deactivate() {
    this.ammo = [];
    this.hasAmmo = false
    this.h = 0;
  }
};