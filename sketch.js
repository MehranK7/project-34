
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,slab,ground;
var slab_con,slab_con2,slab_con3;
var rope2,bg_img,rope3,ball_img,hoop_img,slab_img;
var hoop,ball;
var mute_btn;
var score_sound,crowd_sound,bk_sound,begin_sound,air,cut_sound;
var score=0,sad_sound,star1,star2,blower,blower2,ballcollected= false;


var button,button2,button3;

function preload(){
  bg_img= loadImage('background.jpg');
  ball_img=loadImage('basketball.png');
  hoop_img=loadImage('basketball hoop.png')
  star_img = loadImage('star.png');
  slab_img= loadImage('images.png');

  bk_sound=loadSound('back_loop.mp3');
  crowd_sound=loadSound('crowd.mp3');
  begin_sound=loadSound('refreewhistle.mp3');
  score_sound=loadSound('score.mp3');
  air = loadSound("air.wav");
  cut_sound = loadSound('rope_cut.mp3');
  sad_sound=loadSound('sad.mp3');

  

}

function setup() {
  createCanvas(600,700);

  bk_sound.play();
  bk_sound.setVolume(0.3)
  begin_sound.play();


  ballcollected=false
  engine = Engine.create();
  world = engine.world;
  

  button = createImg('cut_btn.png');
  button.position(100,115);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);

   button3 = createImg('cut_btn.png');
   button3.position(90,40);
   button3.size(50,50);
   button3.mouseClicked(drop3);

   rope = new Rope(7,{x:115,y:120});
   rope2 = new Rope(7,{x:500,y:90});
   rope3 = new Rope(7,{x:90,y:40});

   mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  

  ground = new Ground(300,height,width,20,);

  hoop=createSprite(width/5-80,200,100,100);
  hoop.addImage(hoop_img);
  hoop.scale=0.56;
  hoop.velocityY=1

  ball=createSprite(width-80,350,100,100);
  ball.addImage(ball_img);
  ball.scale=0.2;

  blower = createImg('baloon2.png');
  blower.position(250,305);
  blower.size(120,120);
  blower.mouseClicked(airblow);

  blower2 = createImg('balloon.png');
  blower2.position(143,167);
  blower2.size(120,120);
  blower2.mouseClicked(airblow2);

//slab=createSprite(300,300,50,50);
  
  slab = Bodies.circle(300,300,20);
  
  star = createSprite(400,50,20,20);
  star.addImage(star_img);
  star.scale=0.02;

  star2 = createSprite(100,430,20,20);
  star2.addImage(star_img);
  star2.scale=0.02;
 
  Matter.Composite.add(rope.body,slab);

  slab_con = new Link(rope,slab);
  slab_con2 = new Link(rope2,slab);
  slab_con3 = new Link(rope3,slab);

  //World.add(world,slab);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textAlign(CENTER);
  textSize(50)

}


function draw() 

{
  
  background(51);
  image(bg_img,0,0,width,height);
  push();
  imageMode(CENTER);
  if(slab!=null){
    image(slab_img,slab.position.x,slab.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  ground.show();
  
  if (hoop.y>650){
    hoop.velocityY=-1;
  }
  if (hoop.y<50){
    hoop.velocityY=1;
  }


  if(collide(slab,ball,80)==true)
  {
    ball.visible=false;
    ball.x=1000;
    push();
    //image(ball_img,slab.position.x,slab.position.y,70,70);
    pop();
    score+=1;
    ballcollected=true

    score_sound.play();
    
  }

  if(ballcollected===true){
    image(ball_img,slab.position.x,slab.position.y,70,70);
  }


  if(collide(slab,hoop,80)==true&& ballcollected===true)
  {
    crowd_sound.play();
    score_sound.play();
    console.log("wou win");
    hoop.visible=false
    blower.visible=false
    blower2.visible
    button.visible=false
    button2.visible=false
    button3.visible=false

    fill(0);
  textSize(100);
  text("You win",200,200);
    window.location.reload();
  }


  if(collide(slab,hoop,80)==true&& ballcollected===false)
  {
    hoop.visible=false;
    blower.visible=false;
    blower2.visible=false;
    button.visible=false;
    button2.visible=false;
    button3.visible=false;

    sad_sound.play();
    sad_sound.setVolume(0.25);


    fill(0);
  textSize(100);
  text("You lose",200,200);

  window.location.reload();

  }

  if(slab.position.y>=700)
  {
    hoop.visible=false;
    blower.visible=false;
    blower2.visible=false;
    button.visible=false;
    button2.visible=false;
    button3.visible=false;

    sad_sound.play();
    sad_sound.setVolume(0.25);


    fill(0);
  textSize(100);
  text("You lose",200,200);

  window.location.reload();

  }





  if(collide(slab,star,20)==true)
   {
     star.visible = false;
     score+=3;
     star.x=1000;
     score_sound.play();
     
   }

   if(collide(slab,star2,40)==true)
   {
     star2.visible= false;
     score+=3.25;
     star2.x=1000;
     score_sound.play();
   }   


  fill(0);
  textSize(25);
  text("score:",50,25);
  text(score,100,25)

  Engine.update(engine);
  drawSprites();
}



function mute()
{
  if(bk_sound.isPlaying())
     {
      bk_sound.stop();
     }
     else{
      bk_sound .play();
     }
}

function drop()
{
  cut_sound.play();
  rope.break();
  slab_con.dettach();
  slab_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  slab_con2.dettach();
  slab_con2 = null; 
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  slab_con3.dettach();
  slab_con3 = null; 


}


function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }

   }

function airblow()
{
  Matter.Body.applyForce(slab,{x:0,y:0},{x:0,y:-0.03});
  air.play();
  air.setVolume(0.75);
}

function airblow2()
{
  Matter.Body.applyForce(slab,{x:0,y:0},{x:0.03,y:0});
  air.play();
  air.setVolume(0.75);
}