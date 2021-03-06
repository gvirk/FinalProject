/// Vineet Dhammi | 300808585 | Last Modified: 20/03/2015 
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ENEMY PLANE CLASS
    var EnemyPlane1 = (function (_super) {
        __extends(EnemyPlane1, _super);
        // CONSTRUCTOR
        function EnemyPlane1() {
            _super.call(this, "enemyPlane1");
            this.sound = "blast";
            this.reset();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        EnemyPlane1.prototype.update = function () {
            this.y += this._dy;
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        EnemyPlane1.prototype.reset = function () {
            /*
            this.y = -this.height;
            this.x = Math.floor(Math.random() * 640);
            this._dy = Math.floor(Math.random() * 5) + 5;
            this._dx = Math.floor(Math.random() * 4) - 2;
            */
            this.visible = true;
            this.x = 1050;
            this.y = Math.floor(Math.random() * 400);
            this._dx = Math.floor(Math.random() * 5) + 5;
            this._dy = Math.floor(Math.random() * 5) - 2;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        EnemyPlane1.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
            /*
            if (this.y >= (480 + this.height)) {
                this.reset();
            }
            */
        };
        return EnemyPlane1;
    })(objects.GameObject);
    objects.EnemyPlane1 = EnemyPlane1;
})(objects || (objects = {}));
//# sourceMappingURL=enemyPlane1.js.map