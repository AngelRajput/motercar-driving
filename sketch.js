
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var road,roadImage;
var car,car_driving;
var ground,groundImage;

var construction,constructionGroup,constructionImage;


function preload(){

 roadImage = loadImage("track.png");
 carImage= loadImage("car.jpg");
constructionImage = loadImage("construction.jpg");

}

function setup() {
createCanvas(800, 400);

road= createSprite(50,200,10,40);
road.addImage("track.png",roadImage);
road.scale = 3.5
road.x = road.width/2;
road.velocityX = -4;

car = createSprite(100,340,20,50);
car.addImage("car.jpg",carImage);
car.scale = 0.6;

ground = createSprite(400,350,800,10);
ground.velocityX = -4;
ground.x = ground.width/2;
ground.visible = false;

constructionGroup = new Group();

}

function draw() {
  background(255);
  
if (keyDown("RIGHT_ARROW")) {
    car.velocityX = 3;
    car.velocityY = 0;
    }
    
    if (keyDown("LEFT_ARROW")) {
     car.velocityX = -3;
     carvelocityY = 0;
    }
    
    if (keyDown("UP_ARROW")) {
      car.velocityX = 0;
      car.velocityY = -3;
    }
    
    if (keyDown("DOWN_ARROW")){
      car.velocityX = 0;
      car.velocityY = 3;
    }

 if(constructionGroup.isTouching(car)){
    gameState = END;
 }

if(ground.x < 0){
  ground.x = ground.width/2;
}

if(road.x < 100){
  road.x = road.width/2;
}

car.collide(ground);
  spawnconstruction();

  drawSprites();

if (gameState === END) {
      
    road.velocityX = 0;
    car.velocityX = 0;
    car.velocityY = 0;
    constructionGroup.setVelocityXEach(0);

   textSize (50);
   fill("red");
   text("*GAME OVER* !!",150,150);
 }
}

function spawnconstruction(){
    if (frameCount % 350 === 0) {
        var construction= createSprite(600,250,40,10);
      construction.y = Math.round(random(70,170));
        construction.addImage(constructionImage);
       construction.scale = 0.3;
       construction.velocityX = -3;
    
       construction.lifetime = 200;
    
        construction.depth = car.depth;
        car.depth = car.depth + 1;
    
        constructionGroup.add(construction);
    }
}

