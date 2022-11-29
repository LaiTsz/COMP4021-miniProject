// This function defines the Player module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the player
// - `y` - The initial y position of the player
// - `gameArea` - The bounding box of the game area
const Bullet = function(ctx, x, y, gameArea) {

          const sequences = {
            /* Idling sprite sequences for facing different directions */
            idleLeft:  { x: 400, y: 400, width: 200, height: 200, count: 3, timing: 200, loop: false },
            idleUp:    { x: 400, y: 200, width: 200, height: 200, count: 3, timing: 200, loop: false },
            idleRight: { x: 400, y: 0, width: 200, height: 200, count: 3, timing: 200, loop: false },
            idleDown:  { x: 400, y: 600, width: 200, height: 200, count: 3, timing: 200, loop: false },
            idlefirst:  { x: 436, y: 7, width: 17, height: 65, count: 4, timing: 300, loop: true },
    
            /* Moving sprite sequences for facing different directions */
            moveLeft:  { x: 0, y: 400, width: 200, height: 200, count: 3, timing: 200, loop: false },
            moveUp:    { x: 0, y: 200, width: 200, height: 200, count: 3, timing: 200, loop: false },
            moveRight: { x: 0, y: 0, width: 200, height: 200, count: 3, timing: 200, loop: false },
            moveDown:  { x: 0, y: 600, width: 200, height: 200, count: 3, timing: 200, loop: false }
        };
    
        // This is the sprite object of the player created from the Sprite module.
        const sprite = Sprite(ctx, x, y);
    
        // The sprite object is configured for the player sprite here.
        sprite.setSequence(sequences.idlefirst)
              .setScale(0.5)
              .setShadowScale({ x: 0.75, y: 0.20 })
              .useSheet("bullet_sprite.png");

    // This is the moving direction, which can be a number from 0 to 4:
    // - `0` - not moving
    // - `1` - moving to the left
    // - `2` - moving up
    // - `3` - moving to the right
    // - `4` - moving down
    let direction = 0;

    // This is the moving speed (pixels per second) of the player
    let speed = 150;

    // This function sets the player's moving direction.
    // - `dir` - the moving direction (1: Left, 2: Up, 3: Right, 4: Down)
    const move = function(dir) {
        if (dir >= 1 && dir <= 4 && dir != direction) {
            switch (dir) {
                case 1: sprite.setSequence(sequences.idlefirst); speed = 150; break;
                case 2: sprite.setSequence(sequences.idlefirst); speed = 180; break;
                case 3: sprite.setSequence(sequences.idlefirst); speed = 150; break;
                case 4: sprite.setSequence(sequences.idlefirst); speed = 180; break;
            }
            direction = dir;
        }
    };

    // This function stops the player from moving.
    // - `dir` - the moving direction when the player is stopped (1: Left, 2: Up, 3: Right, 4: Down)
    const stop = function(dir) {
        if (direction == dir) {
            switch (dir) {
                case 1: sprite.setSequence(sequences.idlefirst); break;
                case 2: sprite.setSequence(sequences.idlefirst); break;
                case 3: sprite.setSequence(sequences.idlefirst); break;
                case 4: sprite.setSequence(sequences.idlefirst); break;
            }
            direction = 0;
        }
    };

    // This function speeds up the player.
    const speedUp = function() {
        speed = 350;
    };

    // This function slows down the player.
    const slowDown = function() {
        speed = 150;
    };
    //-------------------------------------------------------------

    //----------------------------------------------------------------------
    // This function updates the player depending on his movement.
    // - `time` - The timestamp when this function is called
    const update = function(time,player_x,player_y) {
        if (direction != 0) {
            let { x, y } = sprite.getXY();

            /* Move the player */
            switch (direction) {
                case 1: x -= speed / 30; break;
                case 2: y -= speed / 30; break;
                case 3: x += speed / 30; break;
                case 4: y += speed / 30; break;
            }

            /* Set the new position if it is within the game area */
            if (gameArea.isPointInBox(x, y))
                sprite.setXY(x, y);
            

                // console.log(player_y);
                // console.log(y);
            //if (y <= -180){
                 sprite.setXY(player_x,player_y - 30);
                 //currentbullet += 1;
                 //console.log(currentbullet);
            //}
                


        }

        /* Update the sprite object */
        sprite.update(time);
    };

    const resetBullet = function(){
        sprite.setXY(-300,-200);
    };

    const update1 = function(time) {

        if (direction != 0) {
            let { x, y } = sprite.getXY();

            /* Move the player */
            switch (direction) {
                case 1: x -= speed / 30; break;
                case 2: y -= speed / 30; break;
                case 3: x += speed / 30; break;
                case 4: y += speed / 30; break;
            }

            /* Set the new position if it is within the game area */
            if (gameArea.isPointInBox(x, y))
                sprite.setXY(x, y);

        }

        /* Update the sprite object */
        sprite.update(time);
    };

    // The methods are returned as an object here.
    return {
        move: move,
        stop: stop,
        speedUp: speedUp,
        slowDown: slowDown,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        getXY: sprite.getXY,
        getX: sprite.getX,
        getY: sprite.getY,
        setXY: sprite.setXY,
        update: update,
        update1: update1,
        resetBullet: resetBullet
    };
};
