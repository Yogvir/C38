class Game {
  constructor() {}
  //read the gameState from database
  getState() {
    database.ref("gameState").on("value", function (data) {
      gameState = data.val();
    });
  }

  //update gameState to database
  updateState(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  start() {
    if (gameState === 0) {
      player = new Player();
      player.getCount();
      form = new Form();
      form.display();
    }
    car1 = createSprite(100, 200);
    car1.addImage("c1", car1img);
    car2 = createSprite(300, 200);
    car2.addImage("c2", car2img);
    car3 = createSprite(500, 200);
    car3.addImage("c3", car3img);
    car4 = createSprite(700, 200);
    car4.addImage("c4", car4img);
    cars = [car1, car2, car3, car4];
  }

  play() {
    form.Hide();

    Player.getPlayerInfo();

    if (allPlayers != undefined) {
      background(groundimg);
      image(trackimg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      //index of array to access each element
      var index = 0;
      //initialize x to 0
      var x = 175;
      var y;
      for (var plr in allPlayers) {
        index = index + 1;
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;
        if (index === player.index) {
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;
        }
      }
    }
    //increment of the distance travelled
    if (keyIsDown(UP_ARROW) && player.index != null) {
      player.distance += 50;
      player.update();
    }

    if (player.distance > 4000) {
      gameState = 2;
    }

    drawSprites();
  }
  end() {
    console.log("Game end");
  }
}
