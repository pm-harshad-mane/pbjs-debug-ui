import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Paper, Tabs, Tab, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {TabPanel, a11yProps} from './TabPanel'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


SyntaxHighlighter.registerLanguage('javascript', js);

// ToDo:
// check hard-coded ids

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

  ListItem: {
    paddingTop: '0px',
    paddingBottom: '0px',

    '& .MuiTypography-root': {
      fontSize: 'inherit'
    }    
  },

  tabPanelRootForEditor: {
    flexGrow: 1,
    width: '100%',
    maxHeight: '270px',
    overflow: 'scroll'
  },

  verticalTabsRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 300,

    '& .MuiTab-wrapper': {
      alignItems: 'flex-start'
    }
  },
  verticalTabsLabel: {
    borderRight: '1px solid dodgerblue',
    textTransform: 'none'
  },
  verticalTabsTabPanel: {
    width: '70%'
  }
}));

export default function Config(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [displayed, setDisplayed] = React.useState(false);
  const [pbjsConfig, setPbjsConfig] = React.useState({debug: false});
  const {pbjsNamespace} = props;
  const [pbjsVersion, setPbjsVersion] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if(isExpanded && !displayed){
      window[pbjsNamespace].que.push(function(){
        let _pbjsConfig = window[pbjsNamespace].getConfig();
        // remove properties starting with "_"
        let displayPbjsConfig = Object.keys(_pbjsConfig).filter(key => key.indexOf("_") !== 0).reduce((prev, key) => {
            prev[key] = _pbjsConfig[key];
            return prev  
        }, {});
        setPbjsConfig(displayPbjsConfig);    
        setPbjsVersion(window[pbjsNamespace].version);
        setDisplayed(true);
      });
    }
  };

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function createTab(index, childComponent){
    return(
      <TabPanel value={tabValue} index={index} className={classes.verticalTabsTabPanel}>
        {childComponent}
      </TabPanel>
    )
  }

  function createBasicList(){
    let ListItemsData = [
      {title: 'Prebid Version', value: pbjsVersion},
      {title: 'Bidder Timeout', value: pbjsConfig.bidderTimeout+'ms'},
      {title: 'Enable Send All Bids', value: pbjsConfig.enableSendAllBids ? 'true' : 'false'},
      {title: 'Use Bid Cache', value: pbjsConfig.useBidCache ? 'true' : 'false'},
      {title: 'COPPA', value: pbjsConfig.coppa ? 'true' : 'false'},
      {title: 'Price Granularity', value: pbjsConfig.priceGranularity},
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

  function createSyntaxHighlighter(data){
    return(
      <SyntaxHighlighter language="javascript" style={docco} wrapLongLines={true} className={classes.tabPanelRootForEditor}>
        {(JSON.stringify(data, undefined, 4))}
      </SyntaxHighlighter>
    );
  }

  function createTitleTab(title, index){
    return <Tab label={title} {...a11yProps({index})} className={classes.verticalTabsLabel} />    
  }

  let theTabs = [
    {tabTitle: "Basic *", childComponent: createBasicList()},
    {tabTitle: "S2S", childComponent: createSyntaxHighlighter(pbjsConfig.s2sConfig)},
    {tabTitle: "Instream", childComponent: createSyntaxHighlighter(pbjsConfig.instreamTracking)},
    {tabTitle: "UserSync", childComponent: createSyntaxHighlighter(pbjsConfig.userSync)},
    {tabTitle: "Auction Options", childComponent: createSyntaxHighlighter(pbjsConfig.auctionOptions)},
    {tabTitle: "Real Time Data", childComponent: createSyntaxHighlighter(pbjsConfig.realTimeData || {})},
    {tabTitle: "SCHAIN", childComponent: createSyntaxHighlighter(pbjsConfig.schain || {})},
    {tabTitle: "RAW JSON", childComponent: createSyntaxHighlighter(pbjsConfig)},
  ];

  return (    

      <Accordion className={classes.Accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.summary}
        >
          <Typography className={classes.heading}>Prebid Config</Typography>
          <Typography className={classes.secondaryHeading}></Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
            <div className={classes.verticalTabsRoot}>            
              <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              >
                {theTabs.map((tab,index)=>{
                  return createTitleTab(tab.tabTitle, index)
                })}
              </Tabs>
              {theTabs.map((tab,index)=>{
                return createTab(index, tab.childComponent)
              })}              
            </div>
        </AccordionDetails>
      </Accordion>
      )
  }