import { Header } from "components/Header";
import { ScheduleList } from "components/ScheduleList";
import { ProjectContext } from "context/ProjectContext";
// import { ScheduleList } from "components/ScheduleList";
// import { useRouter } from "next/router";
import { useContext } from "react";

// TODO: allow for directly visiting page, need to set state based off of router query

export default function Project() {
  // const router = useRouter()
  const projectContext = useContext(ProjectContext)  

  return (
    <>
    <Header/>
    <ScheduleList project={projectContext.project}/>
    </>

  )
}