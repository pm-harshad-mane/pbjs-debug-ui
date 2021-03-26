import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Paper, Tabs, Tab } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {TabPanel, a11yProps} from './TabPanel';
import Auction from './Auction';

// ToDo:
// Check hard-coded ids

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'    
  },
  Accordion: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    padding: '0px'
  }, 
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: '#ff6f00',
    fontWeight: 'bold'    
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionDetails: {
    padding: '0px'
  },
  tabPanelRoot: {
    flexGrow: 1,
    maxHeight: '300px',
    overflow: 'scroll',
    padding: '0px'
  },

  auctionWrapper: {
    width: '100%',
    padding: '0px'
  }
}));

export default function Auctions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const {pbjsNamespace} = props;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);    
  };

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (    

      <Accordion className={classes.Accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.summary}
        >
          <Typography className={classes.heading}>Auctions</Typography>
          <Typography className={classes.secondaryHeading}></Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Paper square className={classes.tabPanelRoot}>
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >              
              {window[pbjsNamespace]._pbjsDebugUI._auctions.map((auction,index)=>{
                return <Tab label={"Auction " + (index+1)} {...a11yProps(index)} />
              })}           
            </Tabs>
            {window[pbjsNamespace]._pbjsDebugUI._auctions.map((auction,index)=>{
              return <TabPanel className={classes.auctionWrapper} value={tabValue} index={index}><Auction pbjsNamespace={pbjsNamespace} auctionData={auction} key={auction.auctionId} /></TabPanel>
            })}            
          </Paper>
        </AccordionDetails>
      </Accordion>
      )
  }