import './App.css';
import React, { useEffect, useCallback, useState } from "react";

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

const Tiles = ({ tiles, dim }) => (
  tiles && Array.isArray(tiles) ?
    tiles.map((it, i) => {
      return (
        <Cell cell={it} key={i} dim={dim}/>
      );
    }) : null
)

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

const shapesFunList = [
  makeLine,
  makeBox,
  makeZ,
  makeTank
];

const colors = [
  'red',
  'yellow',
  'green',
  'teal'
];

const MAX_RANDOM_NUMBER = shapesFunList.length;

const getRandomShapeAndColor = () => {
  const random = Math.floor(Math.random() * MAX_RANDOM_NUMBER);
  return {
    shapeFn: shapesFunList[random],
    color: colors[random]
  };
}

function App() {
  const w = 30;
  const h = 50;
  const dim = 10;

  const initTile = makeL('yellow');
  const [ tileCount, setTileCount ] = useState(0);
  const [ tiles, setTiles ] = useState(initTile);
  const [ reachedTilesSet, setReachedTilesSet] = useState([[]]);

  const memoizedSetNewRandomShape = useCallback(
    () => {
      const {shapeFn, color } = getRandomShapeAndColor();
      setTiles(shapeFn(color));
    }, []);

  const memoizedSetReachedTiles = (newTiles) => {
    setReachedTilesSet([
      ...reachedTilesSet,
      newTiles
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTiles((prevState) => {
        prevState.forEach(tile => {
          if (tile.y === 51) {
            setTileCount(tileCount+1);
            memoizedSetNewRandomShape();
            memoizedSetReachedTiles(prevState);
            clearInterval(interval);
          }
        })
        return prevState.map((obj) => ({
          ...obj, y: obj.y+1
        }))
      })
    }, 100);
  }, [tileCount])


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
         <div>
          <Tiles tiles={tiles} dim={dim} />
         </div>
         <div>
          {
            reachedTilesSet?.map((rTiles, i) => (
              <div key={`tileset_${i}`}>
                <Tiles key={`reachedTile_${i}`} tiles={rTiles} dim={dim} />
              </div>
            ))
          }
         </div>
      </div>
    </div>
  );
}

export default App;
