var PLAY = 1;
var END = 0;
var gameState = PLAY;
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var score = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImage =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
  
   path=createSprite(200,200);
 path.addImage(pathImg);
 path.velocityY = 4;
    
boy = createSprite(70,330,20,20);
boy.addAnimation("sahilRunning",boyImg);
boy.scale=0.08;
  
   gameOver = createSprite(200,100);
  
    gameOver.addImage(endImage);

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

 
  if(gameState === PLAY){
     background(0);
  
    gameOver.visible = false;
    
    // Moving background

 boy.x = World.mouseX;
  


//creating boy running

  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      score = score + 10
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      score = score + 1000
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      score = score + 100
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
         gameState = END;
    }
  }

 
  
    
  }
  else if (gameState === END){
    
    gameOver.visible = true;
    
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();

    path.velocityY = 0;
   boy.destroy();
   
  
   
  }
  
 // boy.debug=true;
   boy.setCollider("circle",0,0,700);
   drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ score,150,30);   
    
 

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
 
}


