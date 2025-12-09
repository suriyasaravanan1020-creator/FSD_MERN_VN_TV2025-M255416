import React, { useEffect, useState } from "react";

function DiceGame() {
  const [result, setResult] = useState("Let`s play");
  const [player1, setP1] = useState(1);
  const [player2, setP2] = useState(1);

  const roll = () => {
    let p1 = Math.floor(Math.random() * 6) + 1;
    let p2 = Math.floor(Math.random() * 6) + 1;
    setP1(p1);
    setP2(p2);

    if (p1 > p2) {
      setResult("🏆 Winner is player1");
    } else if (p1 < p2) {
      setResult("🏆 Winner is player2");
    } else if (p1 == p2) {
      setResult("🎯 match draw");
    }
  };
  useEffect(() => {
    console.log("this is dice game");
  });

  return (
    <div className="gap-3" style={{ height: "auto" }}>
      <h1 id="winner" style={{ width: "auto" }}>
        {result}
      </h1>
      <div
        className=" d-flex justify-content-center flex-row"
        style={{ width: "300px", margin: "auto" }}
      >
        <div
          className="d-flex flex-column justify-content-center gap-3"
          style={{ width: "200px", height: "auto" }}
        >
          <h2>player 1</h2>
          <img
            className="d-flex align-item-center"
            id="player1"
            src={`./images/dice${player1}.png`}
            alt="dice"
            style={{ width: "50px", margin: "auto" }}
          />
        </div>
        <div
          className="d-flex flex-column justify-content-center gap-3 "
          style={{ width: "200px", height: "auto" }}
        >
          <h2>player 2</h2>
          <img
            className="d-flex justify-content-center"
            id="player2"
            src={`./images/dice${player2}.png`}
            style={{ width: "50px", margin: "auto" }}
          />
        </div>
      </div>
      <button
        className="btn bg-info text-white d-flex justify-content-center mx-auto my-4"
        onClick={roll}
      >
        ROLL DICE
      </button>
    </div>
  );
}

export default DiceGame;
