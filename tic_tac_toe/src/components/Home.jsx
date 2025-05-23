import { useEffect, useRef, useState } from "react";
import styles from "../styles/home.module.css";
import Button from "react-bootstrap/Button";

export function Home() {
  const [turn, setTurn] = useState("X");
  const prevTurn = useRef();
  const [grid, setGrid] = useState({
    grid1: { disabled: false, value: "" },
    grid2: { disabled: false, value: "" },
    grid3: { disabled: false, value: "" },
    grid4: { disabled: false, value: "" },
    grid5: { disabled: false, value: "" },
    grid6: { disabled: false, value: "" },
    grid7: { disabled: false, value: "" },
    grid8: { disabled: false, value: "" },
    grid9: { disabled: false, value: "" },
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const combinations = [
    ["grid1", "grid2", "grid3"],
    ["grid4", "grid5", "grid6"],
    ["grid7", "grid8", "grid9"],
    ["grid1", "grid4", "grid7"],
    ["grid2", "grid5", "grid8"],
    ["grid3", "grid6", "grid9"],
    ["grid1", "grid5", "grid9"],
    ["grid3", "grid5", "grid7"],
  ];
  const [winningCombination, setWinningCombination] = useState([]);

  function click(ch) {
    prevTurn.current = turn;
    if (turn === "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
    setGrid((i) => ({ ...i, [ch]: { disabled: true, value: turn } }));
  }

  useEffect(() => {
    for (let i = 0; i < combinations.length; i++) {
      if (
        grid[combinations[i][0]].value != "" &&
        grid[combinations[i][0]].value === grid[combinations[i][1]].value &&
        grid[combinations[i][1]].value === grid[combinations[i][2]].value
      ) {
        setIsCompleted(true);
        setWinningCombination(combinations[i]);
        setGrid((value) => {
          let newGrid = {};
          for (let key in value) {
            newGrid[key] = { ...value[key], disabled: true };
          }
          return newGrid;
        });
        break;
      }
    }
    let flag = true;
    for (let key in grid) {
      if (grid[key].value == "") {
        flag = false;
        break;
      }
    }
    if (flag) {
      setIsDraw(true);
    }
  }, [grid]);

  function reset() {
    window.location.reload();
  }

  return (
    <>
      <div className={styles.header}>Tic Tac Toe</div>
      {isDraw && !isCompleted ? (
        <div className={styles.turnDisplayer} style={{ color: "yellow" }}>
          Draw
        </div>
      ) : isCompleted ? (
        <div className={`${styles.turnDisplayer} ${styles.win}`}>
          {prevTurn.current} Won
        </div>
      ) : (
        <div className={styles.turnDisplayer}>{turn}'s turn</div>
      )}
      <div className={styles.content}>
        <div
          className={`${styles.gridSquare} ${
            winningCombination.includes("grid1") && styles.highlight
          }`}
          onClick={() => click("grid1")}
        >
          <button className={styles.gridButton} disabled={grid.grid1.disabled}>
            {grid.grid1.value}
          </button>
        </div>
        <div
          className={`${styles.gridSquare} ${
            winningCombination.includes("grid2") && styles.highlight
          }`}
          onClick={() => click("grid2")}
        >
          <button className={styles.gridButton} disabled={grid.grid2.disabled}>
            {grid.grid2.value}
          </button>
        </div>
        <div
          className={`${styles.gridSquare} ${
            winningCombination.includes("grid3") && styles.highlight
          }`}
          onClick={() => click("grid3")}
        >
          <button className={styles.gridButton} disabled={grid.grid3.disabled}>
            {grid.grid3.value}
          </button>
        </div>
        <div
          className={`${styles.gridSquare} ${
            winningCombination.includes("grid4") && styles.highlight
          }`}
          onClick={() => click("grid4")}
        >
          <button className={styles.gridButton} disabled={grid.grid4.disabled}>
            {grid.grid4.value}
          </button>
        </div>
        <div
          className={`${styles.gridSquare} ${
            winningCombination.includes("grid5") && styles.highlight
          }`}
          onClick={() => click("grid5")}
        >
          <button className={styles.gridButton} disabled={grid.grid5.disabled}>
            {grid.grid5.value}
          </button>
        </div>
        <div
          className={`${styles.gridSquare} ${
            winningCombination.includes("grid6") && styles.highlight
          }`}
          onClick={() => click("grid6")}
        >
          <button className={styles.gridButton} disabled={grid.grid6.disabled}>
            {grid.grid6.value}
          </button>
        </div>
        <div
          className={`${styles.gridSquare} ${
            winningCombination.includes("grid7") && styles.highlight
          }`}
          onClick={() => click("grid7")}
        >
          <button className={styles.gridButton} disabled={grid.grid7.disabled}>
            {grid.grid7.value}
          </button>
        </div>
        <div
          className={`${styles.gridSquare} ${
            winningCombination.includes("grid8") && styles.highlight
          }`}
          onClick={() => click("grid8")}
        >
          <button className={styles.gridButton} disabled={grid.grid8.disabled}>
            {grid.grid8.value}
          </button>
        </div>
        <div
          className={`${styles.gridSquare} ${
            winningCombination.includes("grid9") && styles.highlight
          }`}
          onClick={() => click("grid9")}
        >
          <button className={styles.gridButton} disabled={grid.grid9.disabled}>
            {grid.grid9.value}
          </button>
        </div>
      </div>
      <div className={styles.resetButtonDiv}>
        <Button
          variant="info"
          style={{
            width: 200,
            fontSize: 25,
            backgroundColor: "#3498db",
            color: "white",
          }}
          onClick={reset}
        >
          Reset
        </Button>
      </div>
    </>
  );
}
