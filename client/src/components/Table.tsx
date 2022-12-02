import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface TableProps {
  rows: {
    name: string;
    films: [];
  }[];
  callBack: (name: string) => void;
}

const Table = ({ rows, callBack }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right"># of Films</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ name, films }) => {
            return (
              <TableRow
                // TODO Add unique ID
                key={name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  callBack(name);
                }}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">{films.length.toString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
