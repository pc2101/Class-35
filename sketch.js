var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);


  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";

// ref- reference( refer to location of database value)
  var hypnoticBallPosition = database.ref('Ball/Position');
  //  updates changes
  //.on() creates a listener which keeps listening to the changes in the database.
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    
    if(position!==undefined){
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
  }

  function writePosition(x,y){
      //.set() is used to set the value in the database
    database.ref('Ball/Position').set({
      'x': position.x + x ,
      'y': position.y + y
    })
  }

  function readPosition(data){
    position = data.val();
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
  }
  
  function showError(){
    console.log("Error in writing to the database");
  }
  