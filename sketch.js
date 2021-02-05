 var bg;
 var prince;
 var castle,tower,shooter,fireball,Efireball;
 var ci,ti,si,fi,Prince2,Prince1,idle;
 var fbg,eg,Efbg;
 var edge;
 var sheild,javlinimg,javlin,jg;
 var plifes,tlifes;
 var blast,blast1;
 
 function preload(){
 bg = loadImage("images/bg1.png");
 ci = loadImage("images/castle.png");
 ti  = loadImage("images/Tower.png");
 si = loadImage("images/shooter.png");
 fi = loadImage("images/fireball.png");
 Prince1 = loadAnimation("images/Prince1/13.gif","images/Prince1/12.gif","images/Prince1/11.gif","images/Prince1/10.gif",
 "images/Prince1/9.gif","images/Prince1/8.gif","images/Prince1/7.gif","images/Prince1/6.gif","images/Prince1/5.gif","images/Prince1/4.gif",
 "images/Prince1/3.gif","images/Prince1/2.gif");
 
 Prince2 = loadAnimation("images/Prince2/13.gif","images/Prince2/12.gif","images/Prince2/11.gif","images/Prince2/10.gif",
 "images/Prince2/9.gif","images/Prince2/8.gif","images/Prince2/7.gif","images/Prince2/6.gif","images/Prince2/5.gif","images/Prince2/4.gif",
 "images/Prince2/3.gif","images/Prince2/2.gif");
 
 idle = loadAnimation("images/Prince - Copy.PNG")
 sheild = loadImage("images/sheild.png");
 javlinimg = loadImage("images/javlin.png");
 blast = loadAnimation("images/Blast/0.png","images/Blast/6.png","images/Blast/5.png","images/Blast/4.png","images/Blast/3.png",
                       "images/Blast/2.png","images/Blast/1.png","images/Blast/0.png");
}
 
 function setup(){
     var canvas = createCanvas(1200,600);
     prince = createSprite(0,325);
     prince.addAnimation("prince",idle);
     prince.scale = 0.5;
     tower = createSprite(308,278,20,20);
     tower.addImage("tower",ti);
     tower.scale = 0.7;
     shooter = createSprite(tower.x+20,tower.y-2,20,20);
     shooter.addImage("shooter",si);
     shooter.scale = 0.4;
     fbg = new Group();
     jg = new Group();
     plifes = 5;
     tlifes = 5;
     castle = createSprite(1170,180,20,20);
     castle.addImage("castle",ci);
     castle.scale = 0.5;
     prince.debug = true;
     prince.setCollider("rectangle",20,0,50,prince.height);
 }
 
 function draw(){
     background(bg);
     edge = createEdgeSprites();
     prince.bounceOff(edge);
     prince.velocityX = 0;
     prince.velocityY = 0;

     if(! keyIsDown(90)){
         // 87 = up
     if(keyDown(87)){
         prince.velocityY = -5;
     }
     if(! keyDown(87)){
        prince.addAnimation("prince",idle);
     }
     // 83 = down
     if(keyDown(83)){
         prince.velocityY = 5;
     }
     if(! keyDown(83)){
        prince.addAnimation("prince",idle);
     }
     if(keyDown(68)){
         prince.velocityX = 5;
         prince.addAnimation("prince",Prince1);
         prince.setCollider("rectangle",20,0,50,prince.height);
     }else{
        prince.changeAnimation("prince",idle);
     }
     if(keyDown(65)){
         prince.velocityX = -5;
         prince.addAnimation("prince",Prince2);
         prince.setCollider("rectangle",-20,0,50,prince.height);
     }else{
         prince.changeAnimation("prince",idle);
     }
 }
 
 for (var i = 0; i<fbg.length; i++){
     if(prince.isTouching(fbg.get(i))){
         fbg.get(i).destroy();
         if(! keyIsDown(90)){
         death();
         }
     }
     }

for (var i = 0; i<jg.length; i++){
    if(tower.isTouching(jg.get(i))){
    jg.get(i).destroy();
    tlifes = tlifes-1;
    }
}

if(tlifes<=0){
    tower.destroy();
    if(shooter)
    shooter.destroy();
    
    shooter = null;
    blast1 = createSprite(tower.x,tower.y,10,10);
    blast1.addAnimation("blast",blast);
   }

   if(shooter){
     shooter.pointTo(prince.x,prince.y);
 }
     drawSprites();

     if(frameCount%30===0 && shooter!==null){
         shoot();
     }
 //    textSize(24);
 //    fill(0,255,255);
 //    text("X:"+mouseX+","+"Y:"+mouseY,mouseX,mouseY);

     //90 === z;
     if(keyIsDown(90)){
         imageMode(CENTER);
         image(sheild,prince.x,prince.y,35,40);
     }
 }
 
 function shoot(){
     fireball = createSprite(shooter.x,shooter.y,20,20);
     fireball.lifetime = 100;
     fireball.addImage("fireball",fi);
     fireball.scale = 0.15;
     fireball.velocityX = 8;
     fireball.velocityY = 8;
     fireball.rotateToDirection=true;
     fireball.pointTo(prince.x,prince.y);
     fireball.depth = shooter.depth-1;
     fbg.add(fireball);
}
 
 function death(){
  plifes = plifes-1;
  if(plifes>=0){
  respawn();
  console.log(plifes);
 }
 }
 
 function respawn(){
  prince.x = 0
  prince.y = 325;
 }
 
 function thro(){
     javlin = createSprite(prince.x,prince.y,20,20);
     javlin.lifetime = 100;
     javlin.addImage(javlinimg);
     javlin.scale = 0.15;
     javlin.velocityX = 8;
     javlin.velocityY = 8;
     javlin.rotateToDirection=true;
     javlin.pointTo(World.mouseX,World.mouseY);
     jg.add(javlin);
 }
 
 function keyPressed(){
    if(keyCode===71){
        thro();
    }
 }