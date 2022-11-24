// This function defines the Gem module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the gem
// - `y` - The initial y position of the gem
// - `color` - The colour of the gem
const Monster = function(ctx, x, y, color, gameArea) {

    // This is the sprite sequences of the gem of four colours
    // `green`, `red`, `yellow` and `purple`.
    const sequences = {
        green:  { x: 208.5, y:  0, width: 67, height: 70.25, count: 2, timing: 200, loop: true },
        red:    { x: 625.5, y: 0, width: 67, height: 70.25, count: 2, timing: 200, loop: true },
        yellow: { x: 0, y: 0, width: 67, height: 70.25, count: 2, timing: 200, loop: true },
        purple: { x: 208.5, y: 281, width: 67, height: 70.25, count: 2, timing: 200, loop: true },
        blue: { x: 417, y: 0, width: 67, height: 70.25, count: 2, timing: 200, loop: true },
        orange: { x: 625.5, y: 281, width: 67, height: 70.25, count: 2, timing: 200, loop: true },
        skyblue: { x: 417, y: 281, width: 67, height: 70.25, count: 2, timing: 200, loop: true },
        gray: { x: 0, y: 281, width: 67, height: 70.25, count: 2, timing: 200, loop: true }
    };

    // This is the sprite object of the gem created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the gem sprite here.
    sprite.setSequence(sequences[color])
          .setScale(1)
          .setShadowScale({ x: 0.75, y: 0.2 })
          .useSheet("monster_sprite.png");

    let speed = 230;
    let currentcolor = "black";
    // This is the birth time of the gem for finding its age.
    let birthTime = performance.now();

    // This function sets the color of the gem.
    // - `color` - The colour of the gem which can be
    // `"green"`, `"red"`, `"yellow"` or `"purple"`
    const setColor = function(color) {
        sprite.setSequence(sequences[color]);
        birthTime = performance.now();
        currentcolor = color;
    };

    const setSequences = function(x){
        switch (x) {
            case 1: sprite.setSequence(sequences.green); break;
            case 2: sprite.setSequence(sequences.red);  break;
            case 3: sprite.setSequence(sequences.yellow);  break;
            case 4: sprite.setSequence(sequences.purple);  break;
            case 5: sprite.setSequence(sequences.blue);  break;
            case 6: sprite.setSequence(sequences.orange);  break;
            case 7: sprite.setSequence(sequences.skyblue);  break;
            case 8: sprite.setSequence(sequences.gray);  break;
        };
    }

    const getColor = function(){
        return currentcolor;
    };

    // This function gets the age (in millisecond) of the gem.
    // - `now` - The current timestamp
    const getAge = function(now) {
        return now - birthTime;
    };

    // This function randomizes the gem colour and position.
    // - `area` - The area that the gem should be located in.
    const randomize = function(area) {
        /* Randomize the color */
        const colors = ["green", "red", "yellow", "purple", "blue", "orange", "skyblue", "gray"];
        setColor(colors[Math.floor(Math.random() * 8)]);

        let randomSpawn = Math.floor(Math.random() * 50);
        /* Randomize the position */

        if(randomSpawn >0 && randomSpawn < 10)
            sprite.setXY(40, 15);
        else if(randomSpawn >10 && randomSpawn < 20)
            sprite.setXY(140, 15);
        else if(randomSpawn >20 && randomSpawn < 30)
            sprite.setXY(230, 15);
        else if(randomSpawn >30 && randomSpawn < 40)
            sprite.setXY(330, 15);

    };

    const resetMonster = function(){
        sprite.setXY(-200,300);

    };


    const update = function(time) {

            let { x, y } = sprite.getXY();

            /* Move the player */

            y += speed / 60; 

            sprite.setXY(x, y);
            /* Set the new position if it is within the game area */
            // if (gameArea.isPointInBox(x, y))
            //     sprite.setXY(x, y);

        

        /* Update the sprite object */
        sprite.update(time);
    };

    // The methods are returned as an object here.
    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        setColor: setColor,
        getAge: getAge,
        getBoundingBox: sprite.getBoundingBox,
        randomize: randomize,
        draw: sprite.draw,
        update: update,
        resetMonster: resetMonster,
        getColor: getColor,
        getX: sprite.getX,
        getY: sprite.getY,
        setSequences: setSequences
    };
};
