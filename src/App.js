import './App.css';
import React, { useEffect } from "react";

function Cell({ cell, dim }) {
  return (<div 
    className="cell"
    style={{
      position: "absolute",
      top: cell.y * dim,
      left: cell.x * dim,
      width: dim,
      height: dim,
      background: cell.c
    }}
  >
  </div>);
}

function makeLine(c) {
  return [
    { x: 15, y: 2, c },
    { x: 15, y: 3, c },
    { x: 15, y: 4, c },
    { x: 15, y: 5, c }
  ];
}

function makeBox(c) {
  return [
    { x: 15, y: 2, c },
    { x: 16, y: 2, c },
    { x: 15, y: 3, c },
    { x: 16, y: 3, c }
  ];
}

function makeZ(c) {
  return [
    { x: 15, y: 2, c },
    { x: 15, y: 3, c },
    { x: 16, y: 3, c },
    { x: 16, y: 4, c }
  ];
}

function makeL(c) {
  return [
    { x: 15, y: 2, c },
    { x: 15, y: 3, c },
    { x: 15, y: 4, c },
    { x: 16, y: 4, c }
  ];
}

function makeTank(c) {
  return [
    { x: 15, y: 2, c },
    { x: 16, y: 2, c },
    { x: 17, y: 2, c },
    { x: 16, y: 3, c }
  ];
}

function App() {
  const w = 30;
  const h = 50;
  const dim = 10;

  const [ tiles, setTiles ] = React.useState(makeL('yellow'));
  // console.log("tile", tiles)
  useEffect(() => {
    const interval = setInterval(()=> {
      setTiles((prevState) => {
        prevState.forEach(tile => {
          if (tile.y === 51) {
            clearInterval(interval);
          }
        })
        return prevState.map((obj) => ({
          ...obj, y: obj.y+1
        }))
      })
    }, 100);
  }, [])


  return (
    <div className="root">
      {/* <h1>Tetris</h1>
      <div>The shapes fall from top to bottom.</div>
      <div>Add code to make a random shape appear and then fall towards the bottom.</div> */}
      <div className="gamecontainer" style={{ 
        position: "relative",
        width: w * dim,
        height: (h + 1) * dim
       }}>
         {
            tiles.map((it, i) => {
              return (
                <Cell cell={it} key={i} dim={dim}/>
              );
            })
         }
      </div>
    </div>
  );
}

export default App;
