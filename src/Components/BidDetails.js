import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Tabs, Tab } from '@material-ui/core';

import {TabPanel, a11yProps} from './TabPanel'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {html as beautify_html} from 'js-beautify';

// TODO: can we avoid using js-beautify, it is 136KB in size 30% of the build

SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('xml', xml);


const useRowStyles = makeStyles({
  root: {
    width: '100%',
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
    flexGrow: 1,
    width: '100%',
    overflow: 'scroll',
    maxHeight: '270px',
  }
});

function Row(props) {
  const { row, pbjsAdUnit } = props; // row ==> bid
  const [open, setOpen] = React.useState(false);
  // const [ ad, setAd ] = React.useState('');
  const classes = useRowStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  let bidderReceivedInfo = pbjsAdUnit.bids.find(bid => bid.bidder === row.bidderCode) || {};

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.bidderCode + (row.source === "s2s"? " (s2s)" : "")}</TableCell>
        <TableCell align="right">{(row.cpm||0).toFixed(2)}</TableCell>
        <TableCell align="right">{row.timeToRespond}ms</TableCell>
        <TableCell align="center">{row.size}</TableCell>
      </TableRow>
      <TableRow  className={classes.root}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, width: '100%'}} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit style={{width: '100%'}}>
                <Tabs
                  centered
                  value={tabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleTabChange}
                  style={{width: '100%'}}
                >
                  <Tab label="Bidder received data" {...a11yProps(0)} />
                  <Tab label="Bid Details" {...a11yProps(1)} />
                  <Tab label="Ad Creative" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={tabValue} index={0} style={{width: '700px'}}>
                  <SyntaxHighlighter language="json" wrapLongLines={true} style={docco} className={classes.editor}>
                    {(JSON.stringify(bidderReceivedInfo, undefined, 4))}
                  </SyntaxHighlighter>
                </TabPanel>
                <TabPanel value={tabValue} index={1} style={{width: '700px'}}>
                  <SyntaxHighlighter language="json" wrapLongLines={true} style={docco}>
                    {(JSON.stringify((function(){
                      const rowCopy = Object.assign({}, row);
                      delete rowCopy.ad;
                      return rowCopy;
                    })(), undefined, 4))}
                  </SyntaxHighlighter>
                </TabPanel>
                <TabPanel value={tabValue} index={2} style={{width: '700px'}}>
                  <SyntaxHighlighter language="xml" wrapLongLines={true} style={docco} >                    
                    {beautify_html(row.ad.replace(/></g, '>\n<'))}
                  </SyntaxHighlighter>
                </TabPanel>
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

// TODO: Add PB winning bid status and bid rendered status use Icons with text on hover
// TODO: Use Data Tables with sort options, https://material-ui.com/components/tables/#data-table
// TODO: Add fixed header, https://material-ui.com/components/tables/#fixed-header
// TODO: Remove MediaType, Message from Table

export default function BidDetails(props) {
  const classes = tableClasses();
  const {bidResponses, pbjsAdUnit} = props;

  // sort bidResponses by cpm

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell >Bidder</TableCell>
            <TableCell align="right">CPM</TableCell>
            <TableCell align="right">Latency</TableCell>
            <TableCell align="center">Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bidResponses.map((bid) => (
            <Row key={bid.adId} row={bid} pbjsAdUnit={pbjsAdUnit} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}