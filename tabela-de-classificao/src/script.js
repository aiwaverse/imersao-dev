class Player{
  constructor(name, wins=0, losses=0, draws=0){
    this.name = name;
    this.wins = wins;
    this.losses = losses;
    this.draws = draws;
    this.points = 0;
  }
  addWin(){
    ++this.wins;
    this.pointsCalculator();
  }
  addLoss(){
    ++this.losses;
  }
  addDraw(){
    ++this.draws;
    this.pointsCalculator;
  }
  pointsCalculator(){
    this.points = this.wins * 3 + this.draws;
  }
  generateHTMLTable(){
    let html = ""
    html += "<tr>";
    html += "<td>" + this.name + "</td>";
    html += "<td>" + this.wins + "</td>";
    html += "<td>" + this.draws + "</td>";
    html += "<td>" + this.losses + "</td>"
    html += "<td>" + this.points + "</td>";
    html += "<td><button onClick='" + this.name.toLowerCase() + "Player.addWin();showPlayersOnScreen(players);'>Vitória</button></td>"
    html += "<td><button onClick='" + this.name.toLowerCase() + "Player.addDraw();showPlayersOnScreen(players);'>Empate</button></td>"
    html += "<td><button onClick='" + this.name.toLowerCase() + "Player.addLoss();showPlayersOnScreen(players);'>Derrota</button></td>"
    html += "</tr>";
    return html;
  }
}

function showPlayersOnScreen(players){
  let playerTable = document.getElementById("tabelaJogadores");
  let html = ""
  for (let player of players){
    player.pointsCalculator();
    html += player.generateHTMLTable();
  }
  playerTable.innerHTML = html;
}

let agathaPlayer = new Player("Agatha", 4, 3, 3);
let lunaPlayer = new Player("Luna", 3, 4, 3);
let players = [agathaPlayer, lunaPlayer]
showPlayersOnScreen(players);