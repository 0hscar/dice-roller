import React, { useState } from "react";
import "./App.css";

interface DiceOptions {
  sides: number;
  label: string;
}

const diceOptions: DiceOptions[] = [
  { sides: 4, label: "d4" },
  { sides: 6, label: "d6" },
  { sides: 8, label: "d8" },
  { sides: 10, label: "d10" },
  { sides: 12, label: "d12" },
  { sides: 20, label: "d20" },
];

function App() {
  const [result, setResult] = useState<number[]>([]);
  const [currentDice, setCurrentDice] = useState<number>(6);
  const [history, setHistory] = useState<number[][]>([]);

  const rollDice = (count: number) => {
    const results = Array.from(
      { length: count },
      () => Math.floor(Math.random() * currentDice) + 1,
    );
    setResult(results);
    setHistory((prev) => [results, ...prev]);
  };

  return (
    <div className="App">
      <h1>Dice Roller</h1>
      <div className="dice-options">
        {diceOptions.map((dice) => (
          <button
            key={dice.sides}
            onClick={() => setCurrentDice(dice.sides)}
            className={currentDice === dice.sides ? "active" : ""}
          >
            {dice.label}
          </button>
        ))}
      </div>
      <div className="roll-controls">
        <button onClick={() => rollDice(1)}>Roll 1</button>
        <button onClick={() => rollDice(2)}>Roll 2</button>
        <button onClick={() => rollDice(3)}>Roll 3</button>
        <button onClick={() => rollDice(4)}>Roll 4</button>
        <button onClick={() => rollDice(5)}>Roll 5</button>
      </div>
      <div className="result">
        {result.length > 0 && (
          <div>
            <h2>Current Roll</h2>
            <p>Results: {result.join(", ")}</p>
            <p>Total: {result.reduce((acc, num) => acc + num, 0)}</p>
          </div>
        )}
      </div>
      <div className="history">
        <h2>History</h2>
        {history.length > 0 ? (
          history.map((roll, index) => (
            <div key={index}>
              <p>
                Roll {index + 1}: {roll.join(", ")} (Total:{" "}
                {roll.reduce((acc, num) => acc + num, 0)})
              </p>
            </div>
          ))
        ) : (
          <p>No history yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
