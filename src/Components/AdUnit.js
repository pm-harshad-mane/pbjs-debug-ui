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
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {TabPanel, a11yProps} from './TabPanel'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';



// ToDo:
// check hard-coded ids
// add tabs ui for user-friendly and raw JSON versio

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  Accordion: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    padding: '0px',
    width: '100%'
  }, 
  heading: {
    fontSize: theme.typography.pxToRem(15),
    // flexBasis: '33.33%',
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
    width: '100%'
  }
}));

export default function AdUnit(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [displayed, setDisplayed] = React.useState(false);
  // const [pbjsConfig, setPbjsConfig] = React.useState({debug: false});
  const {pbjsNamespace, pbjsAdUnit} = props;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if(isExpanded && !displayed){
      window[pbjsNamespace].que.push(function(){
        setDisplayed(true);
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
              <Tab label="AdServer Targeting" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              Bids Data will be here, create another component
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <SyntaxHighlighter language="javascript" style={docco}>
                {(JSON.stringify(pbjsAdUnit.mediaTypes, undefined, 4))}
              </SyntaxHighlighter>
            </TabPanel>
              
            <TabPanel value={tabValue} index={2}>
              <SyntaxHighlighter language="javascript" style={docco}>
                {(JSON.stringify(pbjsAdUnit.bids, undefined, 4))}
              </SyntaxHighlighter>            
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              AdServer Targeing Data will be here, create another component
            </TabPanel>

          </Paper>


        </AccordionDetails>
      </Accordion>
      )
  }
