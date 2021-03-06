import {GameEntity} from "./GameEntity";

export class Projectile extends GameEntity {
    constructor(x, y, w, h) {
        super(...arguments);
        this.dx = 0;
        this.dy = 0;
        this.targetX = undefined;
        this.targetY = undefined;
        this.hasArrived = false;
    }
}