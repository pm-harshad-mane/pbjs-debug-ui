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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {TabPanel, a11yProps} from './TabPanel'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

var beautify_html = require('js-beautify').html;

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },

    '& SyntaxHighlighter': {
      width: '100%'
    }
  },
  tabPanelRoot: {
    flex: 1,
    width: '100%',
    '& .MuiTab-root': {
      padding: '0px'
    }
  },
  editor: {
    width: '100%',
    overflow: 'scroll'
  }
});

function Row(props) {
  const { row } = props; // row ==> bid
  const [open, setOpen] = React.useState(false);
  // const [ ad, setAd ] = React.useState('');
  const classes = useRowStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>

              <Paper square className={classes.tabPanelRoot}>
                <Tabs
                  value={tabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleTabChange}
                  aria-label="disabled tabs example"
                  variant="fullWidth"
                >
                  <Tab label="Bidder Params" {...a11yProps(0)} />
                  <Tab label="Targeting" {...a11yProps(1)} />
                  <Tab label="Bid Details" {...a11yProps(2)} />
                  <Tab label="Ad Creative" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                  <SyntaxHighlighter language="json" style={docco}>
                    {(JSON.stringify(row.params, undefined, 4))}
                  </SyntaxHighlighter>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <SyntaxHighlighter language="json" style={docco}>
                    {(JSON.stringify(row.adserverTargeting, undefined, 4))}
                  </SyntaxHighlighter>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <SyntaxHighlighter language="json" style={docco}>
                    {(JSON.stringify((function(){
                      const rowCopy = Object.assign({}, row);
                      delete rowCopy.ad;
                      return rowCopy;
                    })(), undefined, 4))}
                  </SyntaxHighlighter>
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                  <Paper square className={classes.tabPanelRoot}>
                  <SyntaxHighlighter language="vbscriptHtml" wrapLongLines={true} style={docco}>                    
                    {beautify_html(row.ad.replace(/></g, '>\n<'))}
                  </SyntaxHighlighter>
                  </Paper>
                </TabPanel>
              </Paper>                            
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const tableClasses = makeStyles({
  root: {
    width: '100%' ,
    overflow: 'scroll',
    '& .MuiTableCell-root': {
      padding: '0px'
    }
  }
});

//  TODO: add PB winning bid status and bid rendered status use Icons with text on hover

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