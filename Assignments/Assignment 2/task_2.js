const player1dice = document.getElementById("player1");
const player2dice = document.getElementById("player2");
const btn = document.getElementById("btn");
const winner = document.getElementById("winner");

btn.addEventListener("click", () => {
  let player1 = Math.floor(Math.random() * 6 + 1);
  let player2 = Math.floor(Math.random() * 6 + 1);
  console.log(player1,player2);

  if (player1 > player2) {
    winner.innerText = `🏆 Winner is player1 `;
    winner.style.color = "rgb(104, 240, 104)";
  } else if (player1 < player2) {
    winner.innerText = `🏆 Winner is player2`;
    winner.style.color = "rgb(104, 240, 104)";
  } else if (player1 === player2) {
    winner.innerText = "🎯 match draw";
    winner.style.color = "rgb(238, 43, 43)";
  }

  player1dice.src=`images/dice${player1}.png`;
  player2dice.src=`images/dice${player2}.png`;
  
});

