const { assert } = require('chai');

global.Audio = class {};

const Base = require('../lib/Base.js');
const Cannon = require('../lib/Cannon.js');
const Game = require('../lib/Game.js');
const GameEntity = require('../lib/GameEntity.js');
const Missile = require('../lib/Missile.js'); 
const Meteors = require('../lib/Meteors.js');
const Explosion = require('../lib/Explosion.js'); 

describe('game unit testing', () => {

	it('should instantiate our good friend, Game', () => {
		const game = new Game();

		assert.isFunction(Game);
		assert.isObject(game);
	});

	it('should take parameters for context, width and height', () => {
		const	game = new Game('foo' , 100, 100);

		assert.equal(game.context, 'foo');
		assert.equal(game.width, 100);
		assert.equal(game.height, 100);
	});

	it('should be able to instantiate base and cannon', () => {
		const game = new Game();

		assert.isObject(game.cannon);
	});

	it('should have a baseCount of 6', () => {
		const game = new Game();

		assert.equal(game.baseCount, 6);
	});

	it('should have an array of bases', () => {
		const game = new Game();

		assert.deepEqual(game.baseXArray, [50, 125, 200, 375, 450, 525]);
	});

		it('should have the arrays of meteorArray, baseObjArray, explosionArray and crosshairArray', () => {
		const game = new Game();

		assert.deepEqual(game.meteorArray, []);
		assert.deepEqual(game.baseObjArray, []);
		assert.deepEqual(game.explosionArray, []);
		assert.deepEqual(game.crosshairArray, []);
	});

	it('should have a playerScore with a default of 0', () => {
		const game = new Game();

		assert.equal(game.playerScore, 0);
	});

	it.skip('should have a game loop', () => {
		const game = new Game();

		// assert.equal(game. , );
	});

	it.skip('should start the game', () => {
		const game = new Game();

		// assert.equal(game. , );
	});

	it.skip('should be a to end the game with a gameOver function', () => {
		const game = new Game();

		// assert.equal(game. , );
	});

	it.skip('should initialize by populating Missiles, Meteors, Bases and pick meteor targets', () => {
		const game = new Game();

		// assert.equal(game. , );
	});

	it.skip('should shoot a missile, push a crossImage and play a sound on click', () => {
		const game = new Game();

		// assert.equal(game. , );
	});

	it.skip('should populate Bases into the base array', () => {
		const game = new Game();

		// assert.equal(game. , );
	});

	it.skip('should populate Meteors into the meteor array', () => {
		const game = new Game();

	// assert.equal(game. , );
	});

	it.skip('should pick meteor targets and push the target into meteor target array', () => {
		const game = new Game();

	// assert.equal(game. , );
	});

	it.skip('should detect if meteors are colliding with other objects', () => {
		const game = new Game();

		// assert.equal(game. , );
	});

	it.skip('should make meteors explode', () => {
		const game = new Game();

		// assert.equal(game. , );
	});

	it.skip('should destroy cannons and bases', () => {
		const game = new Game();

		// assert.equal(game. , );
	});

	it.skip('should explode missiles', () => {
		const game = new Game();

		// assert.equal(game. , );
	});

});