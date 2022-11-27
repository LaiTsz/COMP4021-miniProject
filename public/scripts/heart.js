// This function defines the Gem module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the gem
// - `y` - The initial y position of the gem
// - `color` - The colour of the gem
const Heart = function(ctx, x, y) {

    // This is the sprite sequences of the gem of four colours
    // `green`, `red`, `yellow` and `purple`.
    const sequences = {
        heartt: { x: 0, y: 30, width: 292, height: 255, count: 3, timing: 700, loop: true }
    };

    // This is the sprite object of the gem created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the gem sprite here.
    sprite.setSequence(sequences.heartt)
          .setScale(0.1)
          .setShadowScale({ x: 0.75, y: 0.2 })
          .useSheet("life_sprite.png");



        sprite.setXY(x, y);
    const resetHeart = function(){
        sprite.setXY(-100,100);
    
    };

    // The methods are returned as an object here.
    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getX: sprite.getX,
        getY: sprite.getY,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update,
        resetHeart: resetHeart
    };
};
