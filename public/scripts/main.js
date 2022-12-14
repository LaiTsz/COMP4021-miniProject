let clientScore=0;
let gameStartTime = 0; 
let clientX=0;
let clientY=0;
let coinX=0;
let coinY=0;
let life_player1 = 2;
let life_player2 = 2;
let endGame = 0;
let heartPos = [{x:0,y:0},{x:0,y:0}];
let clientHeartPos=[{x:0,y:0},{x:0,y:0}];
let bulletPos = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
let clientBulletPos=[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
let monsterPos = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
let clientMonsterPos=[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
var requestid;
let bulletscount = 0;

let scorePlayerOne = 0;
let scorePlayerTwo = 0;
let active = 0;
let nextbullet = 0;
let nextMonster = 0;
let speedOfShoot = 1000;
let timeToStart = 3;
let noFirstBullet = 0;
let textshow = 0;
let   monsterKill = 0;

const clientPos=(function(){
    const updateClientScore=function(score){
        clientScore=score;
    };
    const updateClientPos=function(x,y){
        clientX=x;
        clientY=y
    };
    const updateCoinPos=function(x,y){
        coinX=x;
        coinY=y
    };
    const updateHeart=function(arrayOfHeart){
        clientHeartPos = arrayOfHeart;
    }
    const updateBullet=function(arrayOfBullet){
        clientBulletPos = arrayOfBullet;
    }
    const updateMonster=function(arrayOfMonster){
        clientMonsterPos = arrayOfMonster;
    }
    const reduceClientLife=function(){
        life_player2--;
    }
    const updateColor=function(color,nextMonster){
        monster[nextMonster].setColor(color);
    }
    const startTheGame=function(){
        //gameStart();
        //console.log("start the game");
        $("#game-start").hide();
        //gameStart();
        
clientScore=0;
clientX=0;
clientY=0;
 coinX=0;
 coinY=0;
 life_player1 = 2;
 life_player2 = 2;
endGame = 0;
 heartPos = [{x:0,y:0},{x:0,y:0}];
 clientHeartPos=[{x:0,y:0},{x:0,y:0}];
 bulletPos = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
 clientBulletPos=[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
 monsterPos = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
 clientMonsterPos=[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];
 gameStartTime = 0; 
 textshow = 0;
  bulletscount = 0;
  monsterKill = 0;

  scorePlayerOne = 0;
  scorePlayerTwo = 0;
  active = 0;
  nextbullet = 0;
  nextMonster = 0;
  speedOfShoot = 1000;
  timeToStart = 3;
  noFirstBullet = 0;
  $("#player1-score").text(0);
  $("#player2-score").text(0);
  context.clearRect(0, 0, cv.width, cv.height);
  status_context.clearRect(0, 0, cvc.width, cvc.height);
  right_context.clearRect(0, 0, cvcc.width, cvcc.height);

  hearts[0].setXY(30,15);
  hearts[1].setXY(60,15);
  heartsClone[0].setXY(685,15);
  heartsClone[1].setXY(715,15);

  for(let i=0;i<10;i++){
    if(i<1){
        player.resetPlayer();
        player.draw();

        //monster[0].update(now);
        coin.resetCoin();
        coin.draw();
    }
    if(i<4){
        if(i<2){
            //hearts[i].resetHeart();
            hearts[i].draw();}
    }
    if(i<8){
        bullets[i].resetBullet();
        bullets[i].draw();
    }
    monsters[i].resetMonster();
    monster[i].resetMonster();
    monsters[i].draw();
    monster[i].draw();
}

sounds.background.play();
sounds.plane.play();
sounds.background.currentTime = 0
  requestAnimationFrame(doFrame);
//   doFrame();
    }

    return {updateClientPos,updateCoinPos,updateHeart,updateBullet,updateMonster,updateClientScore,reduceClientLife,updateColor,startTheGame};
})();
    
    // Socket value
        function passValue(now){
            if(now != 404)
                {
                    // monster[nextMonster].setColor(monsters[nextMonster].getColor());
                    Socket.colorUpdate(monsters[nextMonster].getColor(),now);
                }
            else{
                Socket.scoreUpdate(scorePlayerOne);
                Socket.heartPositionUpdate(heartPos);
                Socket.bulletPositionUpdate(bulletPos);
                Socket.monsterPositionUpdate(monsterPos);
                heartPos = [];
                bulletPos = [];
                monsterPos = [];
               Socket.playerPositionUpdate(player.getX(),player.getY())
               Socket.coinPositionUpdate(coin.getX(),coin.getY())
               for(let i = 0;i<10;i++){
                    if(i<1){
                        $("#player2-score").text(clientScore);
                        playerClone.setXY(clientX,clientY);
                        coinClone.setXY(coinX,coinY);
                    }
                    if(i<4){
                        if(i<2){
                            heartPos.push({x:hearts[i].getX(),y:hearts[i].getY()})
                            heartsClone[i].setXY(clientHeartPos[i].x+655,clientHeartPos[i].y);
                        }
            
                    }
                    if(i<8){
                        bulletPos.push({x:bullets[i].getX(),y:bullets[i].getY()})
                        bulletsClone[i].setXY(clientBulletPos[i].x,clientBulletPos[i].y);
                    }
                    // if(monsters[i].getColor()!="black"){
                    //     monster[i].setColor(monsters[i].getColor());
                    // }

                    //     //console.log(monsters[i].getColor());
                        

                    //     monster[i].update(now);
                    monsterPos.push({x:monsters[i].getX(),y:monsters[i].getY()})
                    monster[i].setXY(clientMonsterPos[i].x,clientMonsterPos[i].y);
                }
            }
        }

        // Socket value



        /* Get the canvas and 2D context */
        // const cv = $("canvas").get(0);
        // const context = cv.getContext("2d");

        const cv = document.getElementById('left_canvas');
        const context = cv.getContext('2d');

        const cvc = document.getElementById('status_bar');
        const status_context = cvc.getContext('2d');

        const cvcc = document.getElementById('right_canvas');
        const right_context = cvcc.getContext('2d');
        

        /* Create the sounds */
        const sounds = {
            background: new Audio("starwar_background.mp3"),
            collect: new Audio("hit4.wav"),
            gameover: new Audio("diplomatic_notification_01.wav"),
            plane: new Audio("USA_scout_plane_Moving.wav"),
            fire : new Audio("shoot_sound_2.wav"),
            damage: new Audio("damage.wav")
        };

        const totalGameTime = 60;   // Total game time in seconds
        const gemMaxAge = 3000;     // The maximum age of the gems in milliseconds
     // The timestamp when the game starts
        let collectedGems = 0;      // The number of gems collected in the game
        


        /* Create the game area */
        const gameArea = BoundingBox(context, 60, 30, 600, 360);
        const gameAreaOfPlayer = BoundingBox(context, 100, 45, 570, 315);
        const gameAreaOfCoin = BoundingBox(context, 100, 45, 210, 340);
        const gameAreatest = BoundingBox(context, 60, 30, 570, 330);
        const gameAreabullet = BoundingBox(context, -2000, -2000, 2570, 2330);


        const gameAreaOfPlayerr = BoundingBox(right_context, 100, 45, 570, 315);
        const gameAreaOfCoinn = BoundingBox(right_context, 100, 45, 210, 340);
        const gameAreabullett = BoundingBox(right_context, -2000, -2000, 2570, 2330);

        /* Create the sprites in the game */
        const player = Player(context, 180, 400, gameAreaOfPlayer); // The player
        const gem = Gem(context, 427, 350, "green");        // The gem
        const monster = [Monster(right_context,-400,100,"green",gameAreabullett),
                        Monster(right_context,-400,100,"green",gameAreabullett),
                        Monster(right_context,-400,100,"green",gameAreabullett),
                        Monster(right_context,-400,100,"green",gameAreabullett),
                        Monster(right_context,-400,100,"green",gameAreabullett),
                        Monster(right_context,-400,100,"green",gameAreabullett),
                        Monster(right_context,-400,100,"green",gameAreabullett),
                        Monster(right_context,-400,100,"green",gameAreabullett),
                        Monster(right_context,-400,100,"green",gameAreabullett),
                        Monster(right_context,-400,100,"green",gameAreabullett),
                        Monster(right_context,-400,100,"green",gameAreabullett)];
        const coin = Coin(context,-400,-400,"coin");

        const hearts = [
        Heart(status_context, 30, 15),
        Heart(status_context, 60, 15)];

        const blackholes = [
        Blackhole(context, 45, 30),
        Blackhole(context, 145, 30),
        Blackhole(context, 235, 30),
        Blackhole(context, 335, 30)];

        const bullets = [
        Bullet(context, -300, 200, gameAreabullet),
        Bullet(context, -300, 200, gameAreabullet),
        Bullet(context, -300, 200, gameAreabullet),
        Bullet(context, -300, 200, gameAreabullet),
        Bullet(context, -300, 200, gameAreabullet),
        Bullet(context, -300, 200, gameAreabullet),
        Bullet(context, -300, 200, gameAreabullet),
        Bullet(context, -300, 200, gameAreabullet)];

        const monsters = [
        Monster(context, -200, -340, "none", gameAreabullet),
        Monster(context, -200, -300, "none", gameAreabullet),
        Monster(context, -200, -300, "none", gameAreabullet),
        Monster(context, -200, -300, "none", gameAreabullet),
        Monster(context, -200, -300, "none", gameAreabullet),
        Monster(context, -200, -240, "none", gameAreabullet),
        Monster(context, -200, -240, "none", gameAreabullet),
        Monster(context, -200, -240, "none", gameAreabullet),
        Monster(context, -200, -240, "none", gameAreabullet),
        Monster(context, -200, -240, "none", gameAreabullet)];

        const heartsClone = [
            Heart(status_context, 685, 15),
            Heart(status_context, 715, 15)];
        
        const blackholesClone = [
            Blackhole(right_context, 45, 30),
            Blackhole(right_context, 145, 30),
            Blackhole(right_context, 235, 30),
            Blackhole(right_context, 335, 30)];
        
            const bulletsClone = [
            Bullet(right_context, -300, 200, gameAreabullett),
            Bullet(right_context, -300, 200, gameAreabullett),
            Bullet(right_context, -300, 200, gameAreabullett),
            Bullet(right_context, -300, 200, gameAreabullett),
            Bullet(right_context, -300, 200, gameAreabullett),
            Bullet(right_context, -300, 200, gameAreabullett),
            Bullet(right_context, -300, 200, gameAreabullett),
            Bullet(right_context, -300, 200, gameAreabullett)];
        
            const monstersClone = [
            Monster(right_context -2000, 340, "none", gameAreabullett),
            Monster(right_context, -2000, 300, "none", gameAreabullett),
            Monster(right_context, -2000, 300, "none", gameAreabullett),
            Monster(right_context, -2000, 300, "none", gameAreabullett),
            Monster(right_context, -2000, 300, "none", gameAreabullett),
            Monster(right_context, -2000, 240, "none", gameAreabullett),
            Monster(right_context, -2000, 240, "none", gameAreabullett),
            Monster(right_context, -2000, 240, "none", gameAreabullett),
            Monster(right_context, -2000, 240, "none", gameAreabullett),
            Monster(right_context, -2000, 240, "none", gameAreabullett)];
        
            const playerClone = Player(right_context, 180, 400, gameAreaOfPlayerr);
            const coinClone = Coin(right_context,-400,-400,"coin");

    function setBulletFromPlayer(now){
        if(noFirstBullet == 0)
            noFirstBullet = 1;
        
        else
            sounds.fire.play();
            

            bullets[nextbullet].update(now,player.getX(),player.getY());
            nextbullet += 1;
            if(nextbullet == 8)
                nextbullet = 0;

                //console.log(speedOfShoot);
                if(endGame == 0)
                setTimeout(setBulletFromPlayer, speedOfShoot);
            
    }

    function delayOfSpawn(now){
        monsters[nextMonster].randomize(gameArea);
        passValue(nextMonster);
        
        nextMonster += 1;
        if(nextMonster == 10)
            nextMonster = 0;
            if(endGame == 0)
            setTimeout(delayOfSpawn, 400);
    }
    function delayOfSpawnCoin(now){
        coin.randomize(gameAreaOfCoin);
        if(endGame == 0)
        setTimeout(delayOfSpawnCoin,(Math.floor(Math.random() * 3))*6000);
        
    }

        /* The main processing of the game */
        function doFrame(now) {

            //console.log(monstersClone[0].getX());

            if (gameStartTime == 0) gameStartTime = now;

            //console.log(gameStartTime);
            /* Update the time remaining */
            const gameTimeSoFar = now - gameStartTime;
            const timeRemaining = Math.ceil((totalGameTime * 1000 - gameTimeSoFar) / 1000);

            $("#time-remaining").text(timeRemaining);

            if (coin.getAge(now) > gemMaxAge)
                coin.resetCoin();
            /* TODO */
            /* Handle the game over situation here */
            if (timeRemaining <= 0){
                $("#game-wait").hide();
                endGame=1;
                Socket.scoreRanking(collectedGems);
                for(let i = 0;i<2;i++){
                    hearts[i].resetHeart();
                    heartsClone[i].resetHeart();
                    hearts[i].update(now);
                    heartsClone[i].update(now);
                    hearts[i].draw();
                    heartsClone[i].draw();
                }
                if(scorePlayerOne < clientScore){
                    Socket.scoreRanking(scorePlayerOne);
                    $("#final-gems").text("You have "+scorePlayerOne+ " scores");
                    $("#lifee").text("Your remaining life is "+life_player1);
                    $("#killmonster").text("You killed "+monsterKill+ " monster(s)");
                    $("#game-over").show();
                    
                }else if(scorePlayerOne == clientScore){
                    Socket.scoreRanking(scorePlayerOne);
                    $("#final-gems").text("You have "+scorePlayerOne+ " scores");
                    $("#lifee").text("Your remaining life is "+life_player1);
                    $("#killmonster").text("You killed "+monsterKill+ " monster(s)");
                    $("#game-over").show();
                }else{
                    Socket.scoreRanking(scorePlayerOne);
                    $("#final-gems").text("You have "+scorePlayerOne+ " scores");
                    $("#lifee").text("Your remaining life is "+life_player1);
                    $("#killmonster").text("You killed "+monsterKill+ " monster(s)");
                    $("#game-over").show();
                }
                sounds.plane.pause();
                sounds.background.pause();
                sounds.fire.pause();
                sounds.collect.pause();
                sounds.gameover.play();
            }

            if(active == 0){
                active = 1;
                setTimeout(delayOfSpawn, 1000);
                setTimeout(delayOfSpawnCoin, (Math.floor(Math.random() * 3))*6000);
                setBulletFromPlayer(now);
            }

            /* Update the sprites */
            for(let i=0;i<10;i++){
                if(i<1){
                    gem.update(now);
                    player.update(now);
                    //monster[0].update(now);
                    coin.update(now);
                }
                if(i<4){
                    if(i<2)
                        hearts[i].update(now);
                    blackholes[i].update(now);
                }
                if(i<8){
                    bullets[i].update1(now);
                    bullets[i].move(2);
                }
                monsters[i].update(now);
                monster[i].update(now);
            }
            passValue(404);

            for(let i=0;i<10;i++){ //update clone
                if(i<1){
                    playerClone.update(now);
                    coinClone.update(now);
                }
                if(i<4){
                    if(i<2)
                        heartsClone[i].update(now);
                    blackholesClone[i].update(now);
                }
                if(i<8){
                    bulletsClone[i].update1(now);
                    bulletsClone[i].move(2);
                }
                monster[i].update(now);
                //if(i<1)
                //monstersClone[i].update(now);
            }

            /* TODO */
            /* Randomize the gem and collect the gem here */
            if (gem.getAge(now) > gemMaxAge)
                gem.randomize(gameArea);

    

            const bulletx = [bullets[0].getX(),bullets[1].getX(),
                            bullets[2].getX(),bullets[3].getX(),
                            bullets[4].getX(),bullets[5].getX(),
                            bullets[6].getX(),bullets[7].getX()]
            const bullety = [bullets[0].getY(),bullets[1].getY(),
                            bullets[2].getY(),bullets[3].getY(),
                            bullets[4].getY(),bullets[5].getY(),
                            bullets[6].getY(),bullets[7].getY()]

            const monstersboxs = [
        monsterBox0 = monsters[0].getBoundingBox(),
        monsterBox1 = monsters[1].getBoundingBox(),
        monsterBox2 = monsters[2].getBoundingBox(),
        monsterBox3 = monsters[3].getBoundingBox(),
        monsterBox4 = monsters[4].getBoundingBox(),
        monsterBox5 = monsters[5].getBoundingBox(),
        monsterBox6 = monsters[6].getBoundingBox(),
        monsterBox7 = monsters[7].getBoundingBox(),
        monsterBox8 = monsters[8].getBoundingBox(),
        monsterBox9 = monsters[9].getBoundingBox()
       ];
       const playerbox = player.getBoundingBox();
       const coinBox = coin.getBoundingBox();
       const xx = player.getX();
       const yy = player.getY();
       const coinx = coin.getX();
       const coiny = coin.getY();

       if (playerbox.isPointInBox(coinx,coiny)) {
                        scorePlayerOne+=5;
                        $("#player1-score").text(scorePlayerOne);
                        sounds.collect.currentTime = 0;
                        sounds.background.pause();
                        sounds.collect.play();
                        sounds.background.play();
                        coin.resetCoin();
                    }
            
            for(let i = 0;i < 10;i++){
                if ((monstersboxs[i].isPointInBox(xx-25,yy) || monstersboxs[i].isPointInBox(xx+25,yy)) && life_player1 != 0) {
                        collectedGems++;
                        sounds.damage.currentTime = 0;
                        sounds.background.pause();
                        sounds.damage.play();
                        sounds.background.play();
                        monsters[i].resetMonster();
                        monster[i].resetMonster();
                        Socket.hitMonster();
                        life_player1--;
                    }
                for(let y = 0;y<8;y++){
                    if (monstersboxs[i].isPointInBox(bulletx[y],bullety[y])) {
                        monsterKill++;
                        scorePlayerOne++;
                        $("#player1-score").text(scorePlayerOne);
                        collectedGems++;
                        sounds.collect.currentTime = 0;
                        sounds.background.pause();
                        sounds.collect.play();
                        sounds.background.play();
                        monsters[i].resetMonster();
                        bullets[y].resetBullet();
                    }
                }
            }
            if(life_player1 == 1)
                hearts[1].resetHeart();
            if(life_player1 <= 0 && life_player2<=0) {
                $("#game-wait").hide();
                endGame = 1;
            
                for(let i = 0;i<2;i++){
                    hearts[i].resetHeart();
                    heartsClone[i].resetHeart();
                    hearts[i].update(now);
                    heartsClone[i].update(now);
                    hearts[i].draw();
                    heartsClone[i].draw();
                } 
                if(life_player1 <= 0){
                    Socket.scoreRanking(scorePlayerOne);
                    $("#final-gems").text("You have "+scorePlayerOne+ " scores");
                    $("#lifee").text("Your remaining life is "+life_player1);
                    $("#killmonster").text("You killed "+monsterKill+ " monster(s)");
                    $("#game-over").show();
                    
                }else{
                    Socket.scoreRanking(scorePlayerOne);
                    $("#final-gems").text("You have "+scorePlayerOne+ " scores");
                    $("#lifee").text("Your remaining life is "+life_player1);
                    $("#killmonster").text("You killed "+monsterKill+ " monster(s)");
                    $("#game-over").show();
                }
                
                sounds.plane.pause();
                sounds.background.pause();
                sounds.fire.pause();
                sounds.collect.pause();
                sounds.gameover.play();
                //console.log("END")
            }
            else if(life_player1 <= 0){
                sounds.fire.pause();
                sounds.plane.pause();
                for(let i = 0;i<2;i++){
                    hearts[i].resetHeart();
                    heartsClone[i].resetHeart();
                    hearts[i].update(now);
                    heartsClone[i].update(now);
                    hearts[i].draw();
                    heartsClone[i].draw();
                } 
                for(let i=0;i<10;i++){
                    if(i<1){
                        player.setXY(2000,2000);
                        player.draw();
                
                        //monster[0].update(now);
                        coin.resetCoin();
                        coin.draw();
                    }
                    if(i<4){
                        if(i<2){
                            hearts[i].resetHeart();
                            hearts[i].draw();}
                    }
                    if(i<8){
                        bullets[i].resetBullet();
                        bullets[i].draw();
                    }
                    monsters[i].resetMonster();
                    monsters[i].draw();
                }
                if(textshow == 0){
                    console.log("test");
                    textshow = 1;
                    $("#game-wait").show();
                }
                
            }

            /* Clear the screen */
            context.clearRect(0, 0, cv.width, cv.height);
            status_context.clearRect(0, 0, cvc.width, cvc.height);
            right_context.clearRect(0, 0, cvcc.width, cvcc.height);

            /* Draw the sprites */





           for(let i = 0;i<10;i++){
                if(i<1){
                    monster[0].draw();
                    player.draw();
                    coin.draw();
                }
                if(i<4){
                    if(i<2)
                        hearts[i].draw();
                    blackholes[i].draw();
                }
                if(i<8){
                    bullets[i].draw();
                }
                monsters[i].draw();
            }
            blackholesClone[0].draw();
            blackholesClone[1].draw();
            blackholesClone[2].draw();
            blackholesClone[3].draw();
if(life_player2 > 0){
            for(let i = 0;i<10;i++){
                if(i<1){
                    playerClone.draw();
                    coinClone.draw();
                }
                if(i<4){
                    if(i<2)
                        heartsClone[i].draw();
                    blackholesClone[i].draw();
                }
                if(i<8){
                    bulletsClone[i].draw();
                }
                monster[i].draw();
            }
        }
            if(endGame == 0){
                requestAnimationFrame(doFrame);
            }
            // if(life_player1 == 0) 
            //     cancelAnimationFrame(requestid);

            /* Process the next frame */
            // requestAnimationFrame(doFrame);
        }

        /* Handle the start of the game */
       

        

        const gameStart=function() {
            /* Hide the start screen */
            $("#game-start").hide();
            sounds.background.play();
            sounds.plane.play();
            //firstbullet();


            /* Handle the keydown of arrow keys and spacebar */
            $(document).on("keydown", function(event) {

                /* TODO */
                /* Handle the key down */
                switch (event.keyCode) {
                    
                    case 37: player.move(1); break;
                    case 38: player.move(2); break;
                    case 39: player.move(3); break;
                    case 40: player.move(4); break;
                    case 32: player.speedUp(); 
                    for(let i = 0;i<8;i++){
                        bullets[i].speedUp();
                    }
                    speedOfShoot = 400;break;
                }


            });

            /* Handle the keyup of arrow keys and spacebar */
            $(document).on("keyup", function(event) {


                /* TODO */
                /* Handle the key up */
                switch (event.keyCode) {
                    case 37: player.stop(1); break;
                    case 38: player.stop(2); break;
                    case 39: player.stop(3); break;
                    case 40: player.stop(4); break;
                    case 32: player.slowDown();
                    for(let i = 0;i<8;i++){
                        bullets[i].slowDown();
                    }
                    speedOfShoot = 1000;break;
                }

            });

            gem.randomize(gameArea);

            /* Start the game */
            requestid = requestAnimationFrame(doFrame);
        };
    

    UI.initialize();

    // Validate the signin
    Authentication.validate(
        () => {
            SignInForm.hide();
            $("#game-wait").hide();
            console.log("sign in success");
            Socket.connect();
        },
        () => { SignInForm.show();
            }
    );