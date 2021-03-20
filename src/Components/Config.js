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
// add tabs ui for user-friendly and raw JSON versio

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
    width: '100%'
  },
  tabPanelRootForEditor: {
    flexGrow: 1,
    width: '100%',
    maxHeight: '300px',
    overflow: 'scroll'
  },
  ListItem: {
      paddingTop: '0px',
      paddingBottom: '0px'
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
          <Paper square className={classes.tabPanelRoot}>
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              aria-label="disabled tabs example"
              variant="fullWidth"
            >
              <Tab label="Config" {...a11yProps(0)} />
              <Tab label="Raw JSON" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>            
              <List>
                <ListItem className={classes.ListItem}>                  
                  <ListItemText primary="Prebid Version" />
                  <ListItemSecondaryAction>
                    {pbjsVersion}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.ListItem}>                  
                  <ListItemText primary="Bidder Timeout" />
                  <ListItemSecondaryAction>
                    {pbjsConfig.bidderTimeout}ms
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.ListItem}>                  
                  <ListItemText primary="Bidder Timeout Buffer" />
                  <ListItemSecondaryAction>
                    {pbjsConfig.timeoutBuffer}ms
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.ListItem}>
                  <ListItemText primary="Enable Send All Bids" />
                  <ListItemSecondaryAction>
                    {pbjsConfig.enableSendAllBids ? 'true' : 'false'}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.ListItem}>
                  <ListItemText primary="Use Bid Cache" />
                  <ListItemSecondaryAction>
                    {pbjsConfig.useBidCache ? 'true' : 'false'}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.ListItem}>                  
                  <ListItemText primary="Price Granularity" />
                  <ListItemSecondaryAction>
                    {pbjsConfig.priceGranularity}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Paper square className={classes.tabPanelRootForEditor}>
              <SyntaxHighlighter language="javascript" style={docco}>
                {(JSON.stringify(pbjsConfig, undefined, 4))}
              </SyntaxHighlighter>
              </Paper>
            </TabPanel>            
          </Paper>
        </AccordionDetails>
      </Accordion>
      )
  }