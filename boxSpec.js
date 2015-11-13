describe("Box", function() {
    beforeEach(function() {
        setUpHTML();
        box = new Box(".box");
    });
    describe("#getPosition", function() {
        it("returns a array of size four", function() {
            expect(box.getPosition().length).toBe(4);
        });
    });
    // specs for moving functions
    describe("moveUp", function() {
        it("returns 0,x if top < 20", function() {
        // box.getPosition = jasmine.createSpy("getPosition() spy").and.ReturnValue([5,5,5,5]);
        spyOn(box, "getPosition").and.returnValue([5,5,5,5]);
            expect(box.moveUp()[1]).toBe(0);
        });
        it("return top - 20 if top >= 20", function() {
        spyOn(box, "getPosition").and.returnValue([5,35,5,5]);
            expect(box.moveUp()[1]).toBe(15);
        });
    });
    describe("moveDown", function() {
        it("returns dom width if down > 20", function() {
        windowHeight = $(window).height();
        spyOn(box, "getPosition").and.returnValue([5,5,5,windowHeight - 5]);
            expect(box.moveDown()[3]).toBe(windowHeight);
        });
        it("return down + 20 if down <= windowHeight - 20", function() {
        spyOn(box, "getPosition").and.returnValue([5,35,5,windowHeight - 35]);
            expect(box.moveDown()[3]).toBe(windowHeight - 15);
        });
    });
    describe("moveLeft", function() {
        it("returns 0,x if left < 20", function() {
        spyOn(box, "getPosition").and.returnValue([5,5,5,5]);
            expect(box.moveLeft()[0]).toBe(0);
        });
        it("return left - 20 if left >= 20", function() {
        spyOn(box, "getPosition").and.returnValue([35,5,5,5]);
            expect(box.moveLeft()[0]).toBe(15);
        });
    });
    describe("moveRight", function() {
        it("returns 0,x if right < 20", function() {
        windowWidth = $(window).width();
        spyOn(box, "getPosition").and.returnValue([5,5,windowWidth + 5,5]);
            expect(box.moveRight()[2]).toBe(windowWidth);
        });
        it("return right + 20 if right < windowWidth + 20", function() {
        spyOn(box, "getPosition").and.returnValue([5,35,windowWidth - 35,5]);
            expect(box.moveRight()[2]).toBe(windowWidth - 15);
        });
    });
});


function setUpHTML() {
    jasmine.getFixtures().set('<style>.box-container { margin: 0 auto; overflow: hidden; width: 100%; min-height: 100%; height: 100%; } .box { background: #6af; box-sizing: border-box; width: 30%; display: inline-block; border: 1px solid; border-radius: 6px; text-align: center; } .center { clear: both; position: absolute; top: 35%; left: 35%; height: 30%; min-height: 30%; }</style><div class="box-container"> <figure class="box center">Move this box</figure> </div>');
}
