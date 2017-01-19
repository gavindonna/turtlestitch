/* Sprite */
// modified SpriteMorph turtlestitch functions

SpriteMorph.prototype.origForward = SpriteMorph.prototype.forward;
SpriteMorph.prototype.forward = function (steps) {
    oldx = this.xPosition();
    oldy = this.yPosition();
    this.origForward(steps);
    if (!cmdCache.hasSteps())
        cmdCache.initPosition(oldx, oldy);
    cmdCache.addMoveTo(this.xPosition() , this.yPosition() , this.isDown);
    this.reDrawTrails();
};

SpriteMorph.prototype.origGotoXY = SpriteMorph.prototype.gotoXY;
SpriteMorph.prototype.gotoXY = function (x, y, justMe) {
    oldx = this.xPosition();
    oldy = this.yPosition();
    console.log("jump in place - don't add.");
    this.origGotoXY(x, y, justMe);
    if ( Math.abs(this.xPosition()-oldx)<=1 && Math.abs(this.yPosition()-oldy)<=1 ) {
		console.log("jump in place - don't add.");
    } else {
        if (!cmdCache.hasSteps())
            cmdCache.initPosition(oldx, oldy);
        cmdCache.addMoveTo(this.xPosition() , this.yPosition() , this.isDown);
        this.reDrawTrails();
	}
};

SpriteMorph.prototype.origClear = SpriteMorph.prototype.clear;
SpriteMorph.prototype.clear = function () {
    this.origClear();
    cmdCache.clear();
    this.reDrawTrails();
};

SpriteMorph.prototype.reDrawTrails = function () {
    this.parent.clearPenTrails();
    reDraw(this.parent.penTrails());
};

/* Stage */
// modified StageMorph turtlestitch functions

StageMorph.prototype.referencePos = null;
StageMorph.prototype.mouseScroll = function (y, x) {
    if (y > 0) {
        cmdCache.zoomOut();
    } else if (y < 0) {
        cmdCache.zoomIn();
    }
    
    this.clearPenTrails();
    reDraw(this.penTrails());
};
