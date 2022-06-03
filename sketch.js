var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var score = 0;
var som;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  som = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  som.loop();

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3
}

function draw() {
  background(200);
  drawSprites();

  if(gameState==="play"){
    score = score + Math.round(frameRate()/60);
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
    ghost.velocityY = -10;
    }
    ghost.velocityY +=1
    if(keyDown("right")){
    ghost.x +=3;
    }
    if(keyDown("left")){
    ghost.x -=3;
    }
    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    }
    createdoors();
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      gameState = "end"
    }
  }
  if(gameState==="end"){
    fill("yellow");
    textSize(30);
    text("Você Perdeu",200,250);
    tower.velocityY = 0;
    doorsGroup.setVelocityYEach(0);
    climbersGroup.setVelocityYEach(0);
    invisibleBlockGroup.setVelocityYEach(0);
    ghost.destroy();
  }
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Pontuação: "+score,20,30);
}
function createdoors(){
  if(frameCount%240===0){
    door = createSprite(200,-50);
    door.x = Math.round(random(120,400));
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);
    climber = createSprite(200,10);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    ghost.depth = door.depth;
    ghost.depth +=1;
    invisibleBlock = createSprite(200,15,climber.width,2);
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
  }
}