/// Vineet Dhammi | 300808585 | Last Modified: 20/03/2015 
/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/island.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/plane.ts" />
/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/label.ts" />
/*
module states {

    export class GamePlay1 {
        // Game Objects
        public game: createjs.Container;
        public scoreboard: objects.ScoreBoard;
        public plane: objects.Plane;
        public island: objects.Island;
        public powerPlanet: objects.PowerPlanet;
        public clouds: objects.Cloud[] = [];
        public ocean: objects.Ocean;

        public shield: boolean = false;

        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();


            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);

            //Island object
            this.island = new objects.Island();
            this.game.addChild(this.island);

            //power planet object
            this.powerPlanet = new objects.PowerPlanet();
            this.game.addChild(this.powerPlanet);

            //Plane object
            this.plane = new objects.Plane();
            this.game.addChild(this.plane);

            //Cloud object
            for (var cloud = 2; cloud >= 0; cloud--) {
                this.clouds[cloud] = new objects.Cloud();
                this.game.addChild(this.clouds[cloud]);
            }
            


            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor


        // DISTANCE CHECKING METHOD
        public distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } //Distance Method

        // CHECK COLLISION METHOD
        public checkCollision(collider: objects.GameObject) {
            if (this.scoreboard.active) {
                var planePosition: createjs.Point = new createjs.Point(this.plane.x, this.plane.y);
                var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
                var theDistance = this.distance(planePosition, objectPosition);
                if (theDistance < ((this.plane.height * 0.5) + (collider.height * 0.5))) {
                    if (collider.isColliding != true) {
                        createjs.Sound.play(collider.sound);
                        if (collider.name == "cloud") {
                            this.scoreboard.lives--;
                        }
                        if (collider.name == "island") {
                            this.scoreboard.score += 100;
                            this.island.visible = false;
                            
                        }

                        if (collider.name == "powerPlanet") {
                            this.scoreboard.lives++;
                            this.powerPlanet.visible = false;

                        }
                    }
                    collider.isColliding = true;
                } else {
                    collider.isColliding = false;
                }
            }
        } // checkCollision Method

        public update() {

            this.ocean.update();

            this.island.update();

            this.powerPlanet.update();
            
            if(flagNewPlane)
                this.plane.updateNewPlane();
            else
                this.plane.update();

            for (var cloud = 2; cloud >= 0; cloud--) {
                this.clouds[cloud].update();

                this.checkCollision(this.clouds[cloud]);
            }



            this.checkCollision(this.island);
            this.checkCollision(this.powerPlanet);

            this.scoreboard.update();

            if (this.scoreboard.lives < 1) {
                this.scoreboard.active = false;
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method

    } // GamePlay Class


} // States Module



*/
var states;
(function (states) {
    var GamePlay1 = (function () {
        //public shield: Shield;
        //public shieldImg: HTMLImageElement;
        function GamePlay1() {
            this.clouds = [];
            this.flagBullet = false;
            this.flagShield = false;
            this.explosions = [];
            // Instantiate Game Container
            this.game = new createjs.Container();
            this.flagRepeat = 0;
            //Stage1 background object
            this.stage1 = new objects.Stage1();
            this.game.addChild(this.stage1);
            //Island object
            this.island = new objects.Island();
            this.game.addChild(this.island);
            //power planet object
            this.powerPlanet = new objects.PowerPlanet();
            this.game.addChild(this.powerPlanet);
            //Plane object
            this.plane = new objects.Plane();
            this.game.addChild(this.plane);
            for (var cloud = 2; cloud >= 0; cloud--) {
                this.clouds[cloud] = new objects.Cloud();
                this.game.addChild(this.clouds[cloud]);
            }
            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game, 0, 3);
            this.explosionImg = assetLoader.getResult('explosionOriginal');
            //this.shieldImg = <HTMLImageElement> assetLoader.getResult('shieldSpriteSheet');
            // Add Game Container to Stage
            stage.addChild(this.game);
            this.assignControls();
        } // Constructor
        // DISTANCE CHECKING METHOD
        GamePlay1.prototype.distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }; //Distance Method
        // CHECK COLLISION METHOD
        GamePlay1.prototype.checkCollision = function (collider) {
            if (this.scoreboard.active) {
                var planePosition = new createjs.Point(this.plane.x, this.plane.y);
                var objectPosition = new createjs.Point(collider.x, collider.y);
                var theDistance = this.distance(planePosition, objectPosition);
                if (theDistance < ((this.plane.height * 0.5) + (collider.height * 0.5))) {
                    if (collider.isColliding != true) {
                        if (collider.name == "cloud") {
                            if (flagPower)
                                flagPower = false;
                            else {
                                createjs.Sound.play(collider.sound);
                                this.scoreboard.lives--;
                                //show explosion
                                //alert("");
                                var explosion = new Explosion(this.explosionImg);
                                explosion.x = this.plane.x;
                                explosion.y = this.plane.y;
                                this.plane.reset();
                                //alert(explosion.x);
                                this.explosions.push(explosion);
                                this.game.addChild(explosion);
                            }
                        }
                        if (collider.name == "island") {
                            createjs.Sound.play(collider.sound);
                            this.scoreboard.score += 100;
                            this.island.visible = false;
                        }
                        if (collider.name == "powerPlanet") {
                            //this.scoreboard.lives++;
                            createjs.Sound.play(collider.sound);
                            flagPower = true;
                            this.powerPlanet.visible = false;
                        }
                    }
                    collider.isColliding = true;
                }
                else {
                    collider.isColliding = false;
                }
            }
        }; // checkCollision Method
        // CHECK COLLISION WITH ENEMY METHOD
        GamePlay1.prototype.checkCollisionWithEnemy = function (collider) {
            if (this.scoreboard.active) {
                for (var cloud = 2; cloud >= 0; cloud--) {
                    var cloudPosition = new createjs.Point(this.clouds[cloud].x, this.clouds[cloud].y);
                    var objectPosition = new createjs.Point(collider.x, collider.y);
                    var theDistance = this.distance(cloudPosition, objectPosition);
                    if (theDistance < ((this.clouds[cloud].height * 0.5) + (collider.height * 0.5))) {
                        if (collider.isColliding != true) {
                            createjs.Sound.play(collider.sound);
                        }
                        collider.isColliding = true;
                    }
                    else {
                        collider.isColliding = false;
                    }
                }
            }
        }; // checkCollisionWithEnemy Method
        GamePlay1.prototype.update = function () {
            this.stage1.update();
            this.island.update();
            //alert("y" +this.plane.y);
            //this.bullet.update(this.plane.x,this.plane.y);
            this.powerPlanet.update();
            if (flagNewPlane)
                this.plane.updateNewPlane();
            else
                this.plane.update(controls);
            for (var cloud = 2; cloud >= 0; cloud--) {
                this.clouds[cloud].update();
                this.checkCollision(this.clouds[cloud]);
            }
            for (var i = 0; i < this.explosions.length; i++) {
                var explosion = this.explosions[i];
                if (explosion.currentAnimationFrame == explosion.LastFrame) {
                    this.removeElement(explosion, this.explosions);
                }
            }
            //if (this.shield.currentAnimationFrame == this.shield.LastFrame) {
            //    this.removeShield(this.shield);
            //}
            this.checkCollision(this.island);
            this.checkCollision(this.powerPlanet);
            this.scoreboard.update();
            //stage 1 complete
            if (flagStage1) {
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                lives = this.scoreboard.lives;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_PLAY_1_OVER;
                stateChanged = true;
            }
            if (this.scoreboard.lives < 1) {
                this.scoreboard.active = false;
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            }
            stage.update(); // Refreshes our stage
        }; // Update Method
        GamePlay1.prototype.removeElement = function (el, arr) {
            this.game.removeChild(el);
            var index = arr.indexOf(el);
            arr.splice(index, 1);
        };
        GamePlay1.prototype.removeShield = function (el) {
            this.game.removeChild(el);
        };
        GamePlay1.prototype.assignControls = function () {
            // Binds key actions
            window.onkeydown = this.onControlDown;
            window.onkeyup = this.onControlUp;
        };
        GamePlay1.prototype.onControlDown = function (e) {
            switch (e.which) {
                case keys.LEFT:
                case keys.A:
                    controls.left = true;
                    controls.lTally++;
                    controls.rTally = 0;
                    break;
                case keys.RIGHT:
                case keys.D:
                    controls.right = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;
                case keys.UP:
                case keys.W:
                    controls.up = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;
                case keys.DOWN:
                case keys.S:
                    controls.down = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;
                case keys.SPACEBAR:
                    controls.spacebar = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;
            }
        };
        GamePlay1.prototype.timeLoop = function () {
            //alert(this.flagRepeat);
            this.flagRepeat++;
            alert(this.flagRepeat);
            if (this.flagRepeat == 1) {
                alert(this.flagRepeat);
                clearInterval(this.timer);
                this.flagRepeat = 0;
            }
        };
        GamePlay1.prototype.onControlUp = function (e) {
            switch (e.which) {
                case keys.LEFT:
                case keys.A:
                    controls.left = false;
                    break;
                case keys.RIGHT:
                case keys.D:
                    controls.right = false;
                    break;
                case keys.W:
                case keys.UP:
                    controls.up = false;
                    break;
                case keys.S:
                case keys.DOWN:
                    controls.down = false;
                    break;
                case keys.SPACEBAR:
                    controls.spacebar = false;
                    this.flagRepeat = 0;
                    break;
            }
        };
        return GamePlay1;
    })();
    states.GamePlay1 = GamePlay1; // GamePlay Class
})(states || (states = {})); // States Module
//# sourceMappingURL=gameplay1.js.map