/*
	AdUnits:
		AdUnit
			Config-Details
		Bids:
			INDEX
			Bidder
			AdID
			CPM
			Message
			Bid Details
			Bidder Params passed
			AdServerTargeting
			Highest Bid ?
			Rendered?
			Latency	
*/

/*
	UI
	AdUnit Name {Accordion}
		Panel 1: BIDS
			Table
				Index
				AdID
				Bidder
				CPM 
				Message
		Panel N: AdServer Targeting
		Panel 3: AdUnit Config
			Code Block
		Panel 3: Bidder Params
			Code Block per bidder
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Paper, Tabs, Tab } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {TabPanel, a11yProps} from './TabPanel'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import BidDetails from './BidDetails';


// ToDo:
// check hard-coded ids
// add tabs ui for user-friendly and raw JSON versio

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  Accordion: {
    // backgroundColor: 'rgba(0, 0, 0, .03)',
    padding: '0px',
    width: '100%'
  }, 
  heading: {
    fontSize: theme.typography.pxToRem(15),
    // flexBasis: '33.33%',
    color: '#333',
    fontWeight: 'bold',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionDetails: {
    padding: '0px'
  },
  tabPanelRoot: {
    // flexGrow: 1
    width: '100%',
    '& .MuiTab-root': {
      padding: '0px'
    }

  }
}));

export default function AdUnit(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [displayed, setDisplayed] = React.useState(false);
  const [pbjsAdUnitTargeting, setPbjsAdUnitTargeting] = React.useState({a: 'bb'});
  const [pbjsAdUnitBidResponses, setPbjsAdUnitBidResponses] = React.useState([]);
  // const [pbjsConfig, setPbjsConfig] = React.useState({debug: false});
  const {pbjsNamespace, pbjsAdUnit} = props;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if(isExpanded /*&& !displayed*/){
      window[pbjsNamespace].que.push(function(){
        // window[pbjsNamespace].onEvent('auctionEnd', function(){
          const temp = window[pbjsNamespace].getAdserverTargetingForAdUnitCode(pbjsAdUnit.code);
          setPbjsAdUnitTargeting( temp );
          // console.log('temp', temp);
          // console.log('pbjsAdUnitTargeting', pbjsAdUnitTargeting);
          const bidResponses = window[pbjsNamespace].getBidResponses();          
          // setPbjsAdUnitBidResponses([...pbjsAdUnitBidResponses, ...bidResponses[pbjsAdUnit.code].bids]); // Merge
          setPbjsAdUnitBidResponses([...bidResponses[pbjsAdUnit.code].bids]); // Replace
          console.log('pbjsAdUnitBidResponses', pbjsAdUnitBidResponses)
          setDisplayed(true);
        // });
      });
    }
  };

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // todo: change panel1 name
  return (
      <Accordion className={classes.Accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.summary}
        >
          <Typography className={classes.heading}>Code: {pbjsAdUnit.code}</Typography>
          <Typography className={classes.secondaryHeading}></Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Paper square className={classes.tabPanelRoot}>
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              aria-label="disabled tabs example"
              variant="fullWidth"
            >
              <Tab label="Bids" {...a11yProps(0)} />
              <Tab label="Media Types" {...a11yProps(1)} />
              <Tab label="Bidder Params" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <BidDetails bidResponses={pbjsAdUnitBidResponses} />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <SyntaxHighlighter language="javascript" style={docco}>
                {(JSON.stringify(pbjsAdUnit.mediaTypes, undefined, 4))}
              </SyntaxHighlighter>
            </TabPanel>
              
            <TabPanel value={tabValue} index={2}>
              These params are passed to bidder:
              <SyntaxHighlighter language="javascript" style={docco}>
                {(JSON.stringify(pbjsAdUnit.bids, undefined, 4))}
              </SyntaxHighlighter>            
            </TabPanel>            

          </Paper>


        </AccordionDetails>
      </Accordion>
      )
  }
