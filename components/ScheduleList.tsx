import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Table  from "@mui/material/Table";
import {Project, Schedule } from '@prisma/client'
import { useState } from "react";
import TableContainer  from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

type ScheduleProps = {
  project: Project & {schedules: Schedule[]} | null | undefined;
}

export const ScheduleList: React.FC<ScheduleProps> = ({project})  => {
  const [schedule,setSchedule] = useState<Schedule | null | undefined>()
  //TODO: Fix styling, schedule table should not be in button group!
  return (
    <>
      <Stack sx={{mt:"1rem", ml:"3rem"}} spacing={3} divider={<Divider flexItem />}>
       <Box>
        <ButtonGroup orientation="vertical">
          {project?.schedules.map((schedule: Schedule)=><Button onClick={() => setSchedule(schedule)}>{schedule.title}</Button>)}
          {schedule && GenerateTable(schedule)}
        </ButtonGroup>
      </Box>
      </Stack>
    </>
  )

}

export default function GenerateTable(schedule: Schedule) {
  const headings = schedule.headings ?? []
  const data = schedule.data ?? []
  console.log(data)
  return (
    <Box sx={{border:"1px solid white", p: "2rem", m:"2rem"}}>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            {headings.map((heading)=><TableCell align="left">{heading}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry,i: number) => (
            <TableRow
              key={`data-table-row-${i}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              {headings.map((heading)=><TableCell align="left">{entry[heading]}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}