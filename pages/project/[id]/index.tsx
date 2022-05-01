import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Header } from "components/Header";
import { LevelViewer } from "components/LevelViewer";
import { ScheduleList } from "components/ScheduleList";
import { ProjectContext } from "context/ProjectContext";
import { useContext, useState } from "react";

// TODO: allow for directly visiting page, need to set state based off of router query

export default function Project() {
  // const router = useRouter()
  const projectContext = useContext(ProjectContext)  
  const [displayTab, setDisplayTab] = useState("Levels")

  return (
    <>
    <Header/>
    {projectContext.project && (
      <Stack sx={{ml: "2rem",mt:"1rem"}} direction="row">
        <Button variant={displayTab=="Levels" ? 'outlined' : 'text'} onClick={()=>setDisplayTab("Levels")}>Levels</Button>
        <Button variant={displayTab=="Schedules" ? 'outlined': 'text'} onClick={()=>setDisplayTab("Schedules")}>Schedules</Button>
      </Stack>
    )}
    {(displayTab=='Schedules' && <ScheduleList project={projectContext.project}/>)}
    {(displayTab=='Levels' && <LevelViewer project={projectContext.project}/>)}
    </>

  )
}