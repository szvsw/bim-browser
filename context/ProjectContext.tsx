import { Project, Schedule } from "@prisma/client";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export type ProjectContextType = {
  project?: Project & {schedules: Schedule[]} | null | undefined
  setProject?: Dispatch<SetStateAction<Project & {schedules: Schedule[]} | null | undefined>>
}

export const ProjectContext = createContext<ProjectContextType>({})
export const ProjectContextProvider: React.FC = ({children}) => {
  const [project,setProject] = useState<Project & {schedules: Schedule[]} | null | undefined>()
  const context: ProjectContextType = {
    project,
    setProject
  }
  return (
    <ProjectContext.Provider value={context}>{children}</ProjectContext.Provider> 
  )
}