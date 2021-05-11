import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Paper, Tabs, Tab } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {TabPanel, a11yProps} from './TabPanel';
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
  tabPanelRoot: {
    flexGrow: 1,
    maxHeight: '300px',
    overflow: 'scroll'
  }
}));

function getLogs(pbjsNamespace, typeOfLog){
  if(window[pbjsNamespace]._pbjsDebugUI._debug){
    return window[pbjsNamespace]._pbjsDebugUI._debug.filter(e => e.type === typeOfLog).map(e => e.arguments);
  }
  return [];
}

export default function Errors(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
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
          <Typography className={classes.heading}>Errors and Warnings</Typography>
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
              <Tab label="Errors" {...a11yProps(0)} />
              <Tab label="Warnings" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <Paper square className={classes.tabPanelRoot}>
                <SyntaxHighlighter language="javascript" style={docco}>
                  {(JSON.stringify(getLogs(pbjsNamespace, "ERROR"), undefined, 4))}
                </SyntaxHighlighter>
              </Paper>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>            
              <Paper square className={classes.tabPanelRoot}>
                <SyntaxHighlighter language="javascript" style={docco}>
                    {(JSON.stringify(getLogs(pbjsNamespace, "WARNING"), undefined, 4))}
                  </SyntaxHighlighter>                      
              </Paper>
            </TabPanel>            
          </Paper>
        </AccordionDetails>
      </Accordion>
      )
  }