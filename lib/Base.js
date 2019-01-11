import {GameEntity} from "./GameEntity";

const baseImg = new Image();
baseImg.src = '../images/Base.png';

export class Base extends GameEntity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    draw(context) {
        context.drawImage(baseImg, this.x, this.y, this.w, this.h);
    }
}