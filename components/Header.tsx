import Link from "next/link";
import  Button  from "@mui/material/Button";
import  Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { getProjects } from "lib/apiClient";
import { Project } from "@prisma/client";
import  Container  from "@mui/material/Container";
import  Stack  from "@mui/material/Stack";
import  Divider from "@mui/material/Divider";
import { ProjectContext } from "context/ProjectContext";

export const Header: React.FC = () => {
  const projectContext = useContext(ProjectContext)
  const [projects,setProjects] = useState([])
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects()
      setProjects(res)
    }
    fetchProjects()
  }, [setProjects])

  return (
    <>
      <Container sx={{mt: "2rem", ml: "2rem"}}>
      <Typography variant="h2">BIM Data Browser</Typography>

      </Container>
      <Stack sx={{mt:"1rem", ml:"3rem"}} spacing={3} direction="row" divider={<Divider orientation="vertical" flexItem />}>

        
        {projects.map((project: Project)=><Link key={project.id} href={`/project/${project.id}`}><Button onClick={()=>projectContext.setProject ? projectContext.setProject(project) : null} variant={projectContext?.project?.id==project.id ? 'contained' : 'outlined'} >{project.title}</Button></Link>)}
      </Stack>
    </>

  )
}