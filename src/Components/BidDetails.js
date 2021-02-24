import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props; // row ==> bid
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>      
        <TableCell align="left">{row.bidderCode}</TableCell>
        <TableCell align="right">{row.cpm}</TableCell>
        <TableCell align="right">{row.timeToRespond}ms</TableCell>
        <TableCell align="right">{row.size}</TableCell>
        <TableCell align="right">{row.mediaType}</TableCell>
        <TableCell align="right">{row.source}</TableCell>
        <TableCell align="right">{row.statusMessage}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="p" gutterBottom component="div">
                Bid Details:
                <SyntaxHighlighter language="javascript" style={docco}>
                  {(JSON.stringify(row, undefined, 4))}
                </SyntaxHighlighter>
              </Typography>              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

const tableClasses = makeStyles({
  root: {
    '& .MuiTableCell-root': {
      padding: '0px'
    }
  }
});

export default function BidDetails(props) {
  const classes = tableClasses();
  const {bidResponses} = props;

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell >Bidder</TableCell>
            <TableCell align="right">CPM</TableCell>
            <TableCell align="right">Latency</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">MediaType</TableCell>
            <TableCell align="right">Source</TableCell>            
            <TableCell align="right">Message</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {bidResponses.map((bid) => (
            <Row key={bid.adId} row={bid} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}