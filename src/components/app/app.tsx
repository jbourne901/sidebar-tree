import React,{useState, useRef} from 'react';
import './app.css';
import ICoord from "../../types/coord";
import LeftPanel from "../left-panel";

function noOp(e: Event) {
    e.stopPropagation();
    e.preventDefault();
}

const App = () =>{
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const [startWidth, setStartWidth] = useState<number|undefined>(undefined);
  const [startDragX, setStartDragX] = useState<number|undefined>(undefined);
  const [transition, setTransition] = useState<string>("");
  const [width, setWidth] = useState<number|undefined>(undefined);


  const getMousePos = (x:number, y: number) => {
    const pos: ICoord = {x,y};
    return pos;
  }
  const startDrag = (pos: ICoord) => {
    let w=10;
    let trn="none";

    if(ref2.current) {
      w = ref2.current.clientWidth;
      trn = window.getComputedStyle(ref2.current).getPropertyValue("transition");      
    }
    if(ref1.current) {
      ref1.current.addEventListener("selectstart", noOp);
    }
    setStartWidth(w);
    setStartDragX(pos.x);
    console.log(`startWidth = ${w} start drag x = ${pos.x}`)  
    setTransition(trn);    
  }

  const stopDrag = () => {
    if(ref1.current) {
      ref1.current.removeEventListener("selectstart", noOp);
    }      
    setStartWidth(undefined);
    setStartDragX(undefined);
    return false;
  }

  const dragging = (pos: ICoord) => {
     let w = width;
     if(startWidth && startDragX!==undefined) {
       const delta = pos.x - startDragX;
       w = startWidth + delta;
       console.log(`dragging x = ${pos.x} delta = ${delta} w=${w} prevwidth=${ref2.current?.clientWidth}`)
       setWidth(w);       
     }
  }

  const mouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const pos = getMousePos(e.clientX, e.clientY);
    startDrag(pos);
  }
  const mouseUp = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(`mouse up x = ${e.clientX} width = ${ref2?.current?.clientWidth}`)
    stopDrag();
  }
  const mouseMove = (e: React.MouseEvent<HTMLElement>) => {    
    const pos = getMousePos(e.clientX, e.clientY);
    dragging(pos);
  }
  const touchStart = (e: React.TouchEvent<HTMLElement>) => {
    e.preventDefault();
    const pos = getMousePos(e.touches[0].clientX, e.touches[0].clientY);
    startDrag(pos);
  }
  const touchEnd = (e: React.TouchEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();    
    stopDrag();
  }
  const touchMove = (e: React.TouchEvent<HTMLElement>) => {
    const pos = getMousePos(e.touches[0].clientX, e.touches[0].clientY);
    dragging(pos);
  }

  let left;
  console.log(`width=${width}`)
  if(width) {
    left = (<div className="app-panel-left" style={{width}} ref={ref2}>
              <LeftPanel />
            </div>
          );
  } else {
    left = (<div className="app-panel-left" ref={ref2}>
              <LeftPanel />
            </div>
          );
  }

  const ctl = (
    <>
      {left}

      <div  className="splitter"
            onMouseDown = {(e) => mouseDown(e)}
            onTouchStart = {(e) => touchStart(e)}
      >
      </div>

      <div className="panel-right">
        right panel
      </div>    
    </>
  );

  let app;
  if(startWidth) {
    app = ( <div style = { {transition: "none !important"} }
              className="app" ref={ref1}
              onMouseMove = {(e) => mouseMove(e)}
              onMouseUp = {(e) => mouseUp(e)}
              onTouchMove = {(e) => touchMove(e)}
              onTouchEnd = {(e) => touchEnd(e)}                
            >
              {ctl}
            </div>
          );
  } else {
    app = ( <div style = { {transition} }
              className="app" ref={ref1}
            >
              {ctl}
            </div>
          );
  }

  return app;
}

export default App;
