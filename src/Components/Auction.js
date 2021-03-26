import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Paper, Tabs, Tab, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader } from '@material-ui/core';
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
    overflow: 'scroll',
    width: '100%',
    padding: '0px'
  },
  auctionWrapper: {
    width: '100%',
  },
  ListItem: {
    paddingTop: '0px',
    paddingBottom: '0px',

    '& .MuiTypography-root': {
      fontSize: 'inherit'
    }    
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

  function createSummaryList(){

    let auctionEndData = auctionData._end;

    let ListItemsData = [      
      {title: 'Auction timeout', value: (auctionEndData.timeout) + 'ms'},
      {title: 'Auction fiinished in', value: (auctionEndData.auctionEnd - auctionEndData.auctionStart) + 'ms'},
      {title: 'Number of AdUnits', value: auctionEndData.adUnits.length},
      {title: 'Total bid requests sent', value: auctionEndData.bidderRequests.length},
      {title: 'Total bids received', value: auctionEndData.bidsReceived.length},
      {title: 'Total no-bids received', value: auctionEndData.noBids.length},
    ];

    return(
      <List>
        {ListItemsData.map((listItem,index)=>{
          return (
            <ListItem className={classes.ListItem}>                  
              <ListItemText primary={listItem.title} />
              <ListItemSecondaryAction>
                {listItem.value}
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    )
  }


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
        {createSummaryList()}
      </TabPanel>
      <TabPanel value={tabValue} index={1} style={{maxHeight: 'auto'}}>
        <div className={classes.auctionWrapper}>
          {auctionData._end.adUnits.map((adUnit,index)=>{
            return <AdUnit pbjsNamespace={pbjsNamespace} auctionData={auctionData} pbjsAdUnit={adUnit} key={adUnit.code} />
          })}           
        </div>
      </TabPanel>            
    </Paper>
  )
  }