import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Game from "../../types/Game";
import Match from "../../types/Match";

interface Props {
  matches: Match[];
  game?: Game;
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
    textDecoration: "none",
  },
});

const MatchList: React.FC<Props> = ({ matches, game }) => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        {game && (
          <Toolbar>
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push(`/games/${game.id}/create`)}
            >
              Add a match
            </Button>
          </Toolbar>
        )}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                <TableSortLabel>Players</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel direction="desc" active>
                  Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches
              .slice(rowsPerPage * page, rowsPerPage * (page + 1))
              .map((match, i) => (
                <TableRow
                  key={i}
                  hover
                  className={classes.row}
                  onClick={() =>
                    history.push(`/games/${match.game.id}/matches/${match.id}`)
                  }
                >
                  <TableCell>{match.id}</TableCell>
                  <TableCell>{match.players.length}</TableCell>
                  <TableCell>{formatDate(match.createdAt)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={matches.length}
        rowsPerPageOptions={[5, 10, 25, 50]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MatchList;
