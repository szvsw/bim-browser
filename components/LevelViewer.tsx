import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Level, Project } from "@prisma/client";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import p5Types from "p5"; //Import this for typechecking and intellisense
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

type LevelViewerProps = {
  project: Project & {levels: Level[]} | null | undefined;
}
export const LevelViewer: React.FC<LevelViewerProps> = ({project}) => {
  const [selectedLevel,setSelectedLevel] = useState<Level | null | undefined>()
  selectedLevel?.rooms?.map(( room )=>(console.log(room)))


  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const canv = p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    canv.position(-1, -1);
    canv.style("z-index", -2);
    // canv.style("display", "block");
  }
  
  const draw = (p5: p5Types) => {

    const xVals = selectedLevel.rooms.map( (room)=>
      room.edges.map( (edge)=>
        [edge[0][0],edge[1][0]]
        )
      .reduce((a,b)=>a.concat(b),[]).reduce((a,b)=>a.concat(b),[])).reduce((a,b)=>a.concat(b),[])
      console.log(xVals)
    const xMin = Math.min.apply(null,xVals)
    const xMax = Math.max.apply(null,xVals)
    const xWidth = xMax-xMin

    const yVals = selectedLevel.rooms.map( (room)=>
      room.edges.map( (edge)=>
        [edge[0][1],edge[1][1]]
        )
      .reduce((a,b)=>a.concat(b),[]).reduce((a,b)=>a.concat(b),[])).reduce((a,b)=>a.concat(b),[])
    const yMin = Math.min.apply(null,yVals)
    const yMax = Math.max.apply(null,yVals)



    p5.background(0)
    p5.push()
    p5.translate(p5.width*0.4,p5.height*0.2)
    const scaleFactor = 1/xWidth*(p5.width - p5.width*0.5)
    selectedLevel.rooms.map((room)=>{
      const { location, name, number} = room
      p5.stroke(255)
      p5.noFill()
      room.edges.map((edge)=>{
        const start = edge[0]
        const end = edge[1]
        console.log((start[0]-xMin)*scaleFactor,(start[1]-yMin)*scaleFactor,(end[0]-xMin)*scaleFactor,(end[1]-yMin)*scaleFactor)
        p5.line((start[0]-xMin)*scaleFactor,(start[1]-yMin)*scaleFactor,(end[0]-xMin)*scaleFactor,(end[1]-yMin)*scaleFactor)
      })
      p5.noStroke()
      p5.fill(255)
      p5.text(name,(location[0]-xMin)*scaleFactor,(location[1]-yMin)*scaleFactor)
    })
    p5.pop()
  }



	return (
    <Stack sx={{mt:"1rem", ml:"3rem"}} direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
       <Box>
        <ButtonGroup orientation="vertical">
          {project?.levels?.map((level: Level)=><Button key={level.name} onClick={() => setSelectedLevel(level)}>{level.name}</Button>)}
        </ButtonGroup>
      </Box>
      {selectedLevel && <><Typography>Level map goes here.</Typography>
      <Sketch
        setup={setup}
        draw={(p5: p5Types) => {
          p5.noLoop();
        }}
        mouseClicked={draw}
        // mouseWheel={handleWheelZoom}
        // mouseDragged={moveMap}
        // mouseReleased={() => (lastPosRef.current = null)}
        // keyPressed={handleZoom}
        windowResized={(p5: p5Types) => {
          p5.resizeCanvas(p5.windowWidth, p5.windowHeight);}}
      />
      
      </>}
    </Stack>

  )
}