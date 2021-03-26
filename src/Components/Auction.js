import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Paper, Tabs, Tab } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {TabPanel, a11yProps} from './TabPanel';
import AdUnit from './AdUnit';


// ToDo:
// Check hard-coded ids

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    '& .MuiButtonBase-root': {
      backgroundColor: 'white'
    }
  },
  Accordion: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    padding: '0px'
  }, 
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: '#333',
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
    overflow: 'scroll'
  }
}));

export default function Auction(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {pbjsNamespace, index, auctionData} = props;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);    
  };


  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // return (    

  //     <Accordion className={classes.Accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
  //       <AccordionSummary
  //         expandIcon={<ExpandMoreIcon />}
  //         aria-controls="panel1bh-content"
  //         id="panel1bh-header"
  //         className={classes.summary}
  //       >
  //         <Typography className={classes.heading}>Auction {index}</Typography>
  //         <Typography className={classes.secondaryHeading}></Typography>
  //       </AccordionSummary>
  //       <AccordionDetails className={classes.accordionDetails}>
  //         Auctions go here....
  //       </AccordionDetails>
  //     </Accordion>
  //     )

  // {pbjsAdUnits.map((adUnit,index)=>{
  //           return <AdUnit pbjsNamespace={pbjsNamespace} pbjsAdUnit={adUnit} key={adUnit.code} />
  //         })}

  return (
    <Paper square className={classes.tabPanelRoot}>
      <Tabs
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Summary" {...a11yProps(0)} />
        <Tab label="Ad-Units" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        Summary
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <div className={classes.adUnitWrapper}>
          {auctionData._end.adUnits.map((adUnit,index)=>{
            return <AdUnit pbjsNamespace={pbjsNamespace} pbjsAdUnit={adUnit} key={adUnit.code} />
          })}           
        </div>
      </TabPanel>            
    </Paper>
  )
  }