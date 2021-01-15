var hotairballon,backimg,ballonimg,database,hotairballonPosition;

function preload(){
  backimg = loadImage("images/HotAirBallon-01.png")
  ballonimg = loadImage("images/HotAirBallon-02.png")
}

function setup(){
    database = firebase.database();
    console.log("database");

    createCanvas(1400,650);
    hotairballon = createSprite(250,250,10,10);
    hotairballon.addImage(ballonimg)
    hotairballon.shapeColor = "red";

   var hotairballonPosition = database.ref('ballon/position');
   hotairballonPosition.on("value",readPosition,showError);
}

function draw(){
    background(backimg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){ 
    database.ref('ballon/position').set({
         'x': position.x + x ,
          'y': position.y + y }) 
        } 
    
    function readPosition(data){
         position = data.val(); 
         console.log(position.x); 
         hotairballon.x = position.x;
          hotairballon.y = position.y; 
        } 
          
          function showError(){ 
              console.log("Error in writing to the database"); }

