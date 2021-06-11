class Player{
constructor(){
    this.index = null;
    this.distance = 0;
    this.name= null;
    }
    //read playerCount from database
    getCount(){
        database.ref("playerCount").on("value",(data)=>{
            playerCount = data.val();
        })
    }
   // update player names
    update() {
        var playerIndex = "players/player" + this.index
        database.ref(playerIndex).set({
            name: this.name,
            distance : this.distance
       })
    }
    
    //update count in database
    updateCount(count) {
        database.ref("/").update({
        playerCount : count
    })
    }
    
   
   static getPlayerInfo() {
        database.ref("players").on("value",(data)=>{
            allPlayers = data.val();
        })
    }

}