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
    var GamePlay2 = (function () {
        function GamePlay2() {
            this.rocket = [];
            this.enemyRocket = [];
            this.clouds = [];
            this.flagRocket = false;
            this.shield = false;
            this.explosions = [];
            // Instantiate Game Container
            this.game = new createjs.Container();
            this.flagRepeat = 0;
            //flagNewPlane = true;
            //Stage2 background
            this.stage2 = new objects.Stage2();
            this.game.addChild(this.stage2);
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
            //Enemy plane 1 object
            this.enemyPlane1 = new objects.EnemyPlane1();
            this.game.addChild(this.enemyPlane1);
            //Enemy plane 2 object
            this.enemyPlane2 = new objects.EnemyPlane2();
            this.game.addChild(this.enemyPlane2);
            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game, currentScore, lives);
            this.explosionImg = assetLoader.getResult('explosionOriginal');
            // Add Game Container to Stage
            stage.addChild(this.game);
            this.assignControls();
        } // Constructor
        // DISTANCE CHECKING METHOD
        GamePlay2.prototype.distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }; //Distance Method
        // CHECK COLLISION METHOD
        GamePlay2.prototype.checkCollision = function (collider) {
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
                            createjs.Sound.play(collider.sound);
                            flagPower = true;
                            this.powerPlanet.visible = false;
                        }
                        if (collider.name == "enemyPlane1" && this.enemyPlane1.visible) {
                            if (flagPower)
                                flagPower = false;
                            else {
                                createjs.Sound.play(collider.sound);
                                //show explosion
                                this.scoreboard.lives--;
                                var explosion = new Explosion(this.explosionImg);
                                explosion.x = this.plane.x;
                                explosion.y = this.plane.y;
                                this.enemyPlane1.visible = false;
                                this.plane.reset();
                                this.explosions.push(explosion);
                                this.game.addChild(explosion);
                            }
                        }
                        if (collider.name == "enemyPlane2" && this.enemyPlane2.visible) {
                            if (flagPower)
                                flagPower = false;
                            else {
                                //show explosion
                                createjs.Sound.play(collider.sound);
                                this.scoreboard.lives--;
                                var explosion = new Explosion(this.explosionImg);
                                explosion.x = this.plane.x;
                                explosion.y = this.plane.y;
                                this.enemyPlane2.visible = false;
                                this.plane.reset();
                                this.explosions.push(explosion);
                                this.game.addChild(explosion);
                            }
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
        GamePlay2.prototype.checkCollisionWithEnemy = function (collider) {
            /*
            if (this.scoreboard.active) {
                //for (var cloud = 2; cloud >= 0; cloud--) {
                if (this.enemyPlane1.visible) {
                    var enemy1: createjs.Point = new createjs.Point(this.enemyPlane1.x, this.enemyPlane1.y);

                    var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
                    var theDistance = this.distance(enemy1, objectPosition);
                    if (theDistance < ((this.enemyPlane1.height * 0.5) + (collider.height * 0.5))) {
                        if (collider.isColliding != true) {
                            createjs.Sound.play(collider.sound);
                            //Write code here for collossion of rocket with enemy.
                            this.enemyPlane1.visible = false;
                            
                        }
                        collider.isColliding = true;
                    } else {
                        collider.isColliding = false;
                    }
                    //}
                }
            }
            */
            if (this.scoreboard.active) {
                for (var tmpRocket = 0; tmpRocket < this.rocket.length; tmpRocket++) {
                    if (collider.visible) {
                        var rocketFire = new createjs.Point(this.rocket[tmpRocket].x, this.rocket[tmpRocket].y);
                        var objectPosition = new createjs.Point(collider.x, collider.y);
                        var theDistance = this.distance(rocketFire, objectPosition);
                        if (theDistance < ((this.rocket[tmpRocket].height * 0.5) + (collider.height * 0.5))) {
                            if (collider.isColliding != true) {
                                createjs.Sound.play(collider.sound);
                                this.scoreboard.score += 200;
                                //Write code here for collossion of rocket with enemy.
                                collider.visible = false;
                                var explosion = new Explosion(this.explosionImg);
                                explosion.x = this.rocket[tmpRocket].x;
                                explosion.y = this.rocket[tmpRocket].y - 20;
                                this.game.removeChild(this.rocket[tmpRocket]);
                                //var index = this.rocket.indexOf(thtmpRocket);
                                this.rocket.splice(tmpRocket, 1);
                                //alert(explosion.x);
                                this.explosions.push(explosion);
                                this.game.addChild(explosion);
                            }
                            collider.isColliding = true;
                        }
                        else {
                            collider.isColliding = false;
                        }
                    }
                }
            }
        }; // checkCollisionWithEnemy Method
        GamePlay2.prototype.update = function () {
            if (gamePlay1Loop == 0) {
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
            else {
                this.stage2.update();
                this.island.update();
                //alert("y" +this.plane.y);
                //this.bullet.update(this.plane.x,this.plane.y);
                this.powerPlanet.update();
                if (flagNewPlane)
                    this.plane.updateNewPlane();
                else
                    this.plane.update(controls);
                //spacebar firing start
                if (controls.spacebar == true) {
                    if (this.flagRepeat == 0) {
                        console.log("spacebar");
                        this.rocket.push(new objects.Rocket(this.plane.x, this.plane.y));
                        this.game.addChild(this.rocket[this.rocket.length - 1]);
                        this.flagRocket = true;
                        this.flagRepeat = 1;
                    }
                    else if (this.flagRepeat > 30) {
                        this.flagRepeat = 0;
                    }
                    else
                        this.flagRepeat++;
                }
                if (controls.spacebar == false && this.flagRepeat < 30) {
                    this.flagRepeat++;
                }
                if (this.flagRocket) {
                    for (var i = 0; i < this.rocket.length; i++) {
                        this.rocket[i].update();
                    }
                }
                //enemy rocket firing at random number
                if (this.enemyPlane2.visible) {
                    var x = Math.floor((Math.random() * 100) + 1);
                    if (x == 1) {
                        this.enemyRocket.push(new objects.EnemyRocket(this.enemyPlane2.x, this.enemyPlane2.y));
                        this.game.addChild(this.enemyRocket[this.enemyRocket.length - 1]);
                    }
                }
                for (var i = 0; i < this.enemyRocket.length; i++) {
                    this.enemyRocket[i].update();
                }
                for (var cloud = 2; cloud >= 0; cloud--) {
                    this.clouds[cloud].update();
                    this.checkCollision(this.clouds[cloud]);
                }
                this.enemyPlane1.update();
                this.enemyPlane2.update();
                this.checkCollisionWithEnemy(this.enemyPlane1);
                this.checkCollisionWithEnemy(this.enemyPlane2);
                this.checkCollision(this.island);
                this.checkCollision(this.powerPlanet);
                this.checkCollision(this.enemyPlane1);
                this.checkCollision(this.enemyPlane2);
                this.scoreboard.update();
                //stage2 complete
                if (flagStage2) {
                    createjs.Sound.stop();
                    currentScore = this.scoreboard.score;
                    lives = this.scoreboard.lives;
                    if (currentScore > highScore) {
                        highScore = currentScore;
                    }
                    this.game.removeAllChildren();
                    stage.removeChild(this.game);
                    currentState = constants.GAME_PLAY_2_OVER;
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
                for (var i = 0; i < this.explosions.length; i++) {
                    var explosion = this.explosions[i];
                    if (explosion.currentAnimationFrame == explosion.LastFrame) {
                        this.removeElement(explosion, this.explosions);
                    }
                }
                stage.update(); // Refreshes our stage
            }
        }; // Update Method
        GamePlay2.prototype.removeElement = function (el, arr) {
            this.game.removeChild(el);
            var index = arr.indexOf(el);
            arr.splice(index, 1);
        };
        GamePlay2.prototype.assignControls = function () {
            // Binds key actions
            window.onkeydown = this.onControlDown;
            window.onkeyup = this.onControlUp;
        };
        GamePlay2.prototype.onControlDown = function (e) {
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
        GamePlay2.prototype.timeLoop = function () {
            //alert(this.flagRepeat);
            this.flagRepeat++;
            //alert(this.flagRepeat);
            if (this.flagRepeat == 1) {
                //  alert(this.flagRepeat);
                clearInterval(this.timer);
                this.flagRepeat = 0;
            }
        };
        GamePlay2.prototype.onControlUp = function (e) {
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
        return GamePlay2;
    })();
    states.GamePlay2 = GamePlay2; // GamePlay Class
})(states || (states = {})); // States Module 
//# sourceMappingURL=gamePlay2.js.map