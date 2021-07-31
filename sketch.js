var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var brick1,brick2,brick3,brick4;
var brick1img,brick2img,brick3img,brick4img;
var bg,bgimg;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  //pathImg = loadImage("Road.png");
 
  boyImg = loadAnimation("img/OIP1.png","img/OIP2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  //jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  brick1img = loadImage("brick 1.jpg");
  brick2img = loadImage("brick2.jpg");
  brick3img = loadImage("brick3.jpg");
  brick4img = loadImage("brick4.jpg");

bgimg=loadImage("bg1.jpg");

}

function setup(){
  
  createCanvas(displayWidth,displayHeight);
 //Moving background
bg=createSprite(windowWidth/2,windowHeight/2);
bg.addImage("bg",bgimg);
bg.velocityX = -4;
bg.scale=5;
bg.setCollider("rectangle",0,0,100,bg.height);

//creating boy running
boy = createSprite(20,600,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.5;
boy.debug=true;

brick1 = createSprite(350,580,20,20);
brick1.addImage(brick1img)
brick1.scale = 0.7
brick2 = createSprite(450,450,20,20);
brick2.addImage(brick2img)
brick2.scale = 0.4
brick3 = createSprite(750,580,20,20);
brick3.addImage(brick3img)
brick3.scale = 0.7
brick4 = createSprite(1150,580,20,20);
brick4.addImage(brick4img)
brick4.scale = 0.7

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  background("black");
  if(gameState===PLAY){
 
  //boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(bg.x < 0 ){
    bg.x = width/2;
  }
  
    createCash();
    createDiamonds();
    //createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }
    /*else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }*/
    else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        //jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        //jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }

}

function createCash() {
  if (World.frameCount % 60 == 0) {
    var y=Math.round(random(50,500))
  var cash = createSprite(800, y, 10, 10);
  cash.addImage(cashImg);
  cash.scale=0.12;
  //cash.velocityX = -3;
 // cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 120 == 0) {
    var y=Math.round(random(50,500))
  var diamonds = createSprite(600, y, 10, 10);
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
 // diamonds.velocityX = -3;
  //diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(350, 1000),500, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
 // jwellery.velocityX= -3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 240 == 0) {
  var sword = createSprite(windowWidth-100, 500, 10, 10);
  sword.addImage(swordImg);
  sword.scale=0.1;
 // sword.velocityX = -3;
  //sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
function keyPressed(){
  if(keyCode===28){
    console.log("up")
boy.y=boy.y-20
  }
  if(keyCode===29){
    console.log("right")
boy.x=boy.x+20
  } if(keyCode===27){
    console.log("left")
boy.x=boy.x-20
  }
  if(keyCode===30){
    console.log("down")
boy.y=boy.y+20
  }
}