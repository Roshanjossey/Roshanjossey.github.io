function Box(element) {
    this.leftBoundary = 0;
    this.topBoundary = 0;
    this.rightBoundary = 0;
    this.bottomBoundary = 0;
    // this.position = $(element).position();
    this.height = $(element).outerHeight();
    this.width = $(element).outerWidth();

    this.getPosition = function() {
        this.position = $(element).position();
        this.leftBoundary = this.position.left;
        this.rightBoundary = this.leftBoundary + this.width;
            this.topBoundary = this.position.top;
        this.bottomBoundary = this.topBoundary + this.height;
        return([this.leftBoundary, this.topBoundary, this.rightBoundary, this.bottomBoundary]);
    }
    this.moveUp = function() {
        currentPosition = this.getPosition()
            currentPosition[1] = Math.max(0, currentPosition[1] - 20)
            this.topBoundary = currentPosition[1];
        this.bottomBoundary = this.topBoundary + this.height;
            return(currentPosition)
    }
    this.moveDown= function() {
        currentPosition = this.getPosition()
            currentPosition[3] = Math.min($(window).height(), currentPosition[3] + 20)
            this.bottomBoundary = currentPosition[3];
        this.topBoundary = this.bottomBoundary - this.height;
            return(currentPosition)
    }
    this.moveRight = function() {
        currentPosition = this.getPosition()
            currentPosition[2] = Math.min($(window).width(), currentPosition[2] + 20)
            this.rightBoundary = currentPosition[2];
        this.leftBoundary = this.rightBoundary - this.width;
            return(currentPosition)
    }
    this.moveLeft = function() {
        currentPosition = this.getPosition()
            currentPosition[0] = Math.max(0, currentPosition[0] - 20)
            this.leftBoundary = currentPosition[0];
        this.rightBoundary = this.leftBoundary + this.width;
            return(currentPosition)
    }
    this.move = function() {
        $(element).animate({top: this.topBoundary + "px", left: this.leftBoundary + "px"}, 100);
    }
    this.centerAlign = function() {
        $(element).css({"top": "35%", "left": "35%", "height": "30%", "min-height": "30%", "width": "30%"});
    }

    this.moveBox = function(key) {
        switch(key.which) {
            case 37: this.moveLeft();
                     this.move();
                     console.log("left");
                     break;
            case 38: this.moveUp();
                     this.move();
                     break;
            case 39: this.moveRight();
                     this.move();
                     break;
            case 40: this.moveDown();
                     this.move();
                     break;
        }
        key.preventDefault();
    };
}

$(document).ready(function(){
    var box  = new Box(".box");
    $(document).keydown(function (key) { box.moveBox(key); } );
    $(window).on("resize", box.centerAlign());
});
