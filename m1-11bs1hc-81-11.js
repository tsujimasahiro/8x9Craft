function logBlock(block) {
    var blocks = crab.scan();
    console.log("block:" + block.id + ", id:" + block.meta);
}
function testAround() {
    console.log("#isGoal start");
    var blocks = crab.scan();
    logBlock(blocks[1]);
    logBlock(blocks[3]);
    logBlock(blocks[5]);
    var block = crab.inspectDown();
    logBlock(block);
    console.log("#testAround end");
}
testAround();
function isGoal() {
    console.log("#isGoal start");
    var block = crab.inspectDown();
    logBlock(block);
    var ret = block.id == 258 && block.meta == 0;
    console.log("#isGoal end ret=" + ret);
    return ret;
}
function canDig(block) {
    console.log("#canDig start");
    var ret = block.id != 0 && block.id != 7;
    console.log("#canDig end ret=" + ret);
    return ret;
}
function dig() {
    var blocks = crab.scan();
    // console.log(blocks)
    var doDig = false;
    if (canDig(blocks[1])) {
        doDig = true;
    }
    if (canDig(blocks[3])) {
        crab.turnLeft();
        doDig = true;
    }
    if (canDig(blocks[5])) {
        crab.turnRight();
        doDig = true;
    }
    if (doDig) {
        crab.dig();
        crab.forward();
    }
}
function move() {
    console.log("#move start");
    var blocks = crab.scan();
    if (blocks[1].id == 0 && blocks[3].id != 0) {
        crab.forward();
    }
    else if (blocks[3].id == 0) {
        crab.turnLeft();
        crab.forward();
    }
    else if (blocks[5].id == 0) {
        crab.turnRight();
        crab.forward();
    }
    else {
        crab.turnRight();
        crab.turnRight();
    }
    console.log("#move end");
}
function main() {
    console.log("#main start");
    crab.forward();
    while (!isGoal()) {
        dig();
        move();
    }
    console.log("#main end");
}
main();
