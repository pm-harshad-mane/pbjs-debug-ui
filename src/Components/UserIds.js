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

export default function UserIds(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [displayed, setDisplayed] = React.useState(false);
  const [pbjsConfig, setPbjsConfig] = React.useState({debug: false});
  const [pbjsUserIds, setPbjsUserIds] = React.useState([]);
  const {pbjsNamespace} = props;

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
        setPbjsUserIds([...window[pbjsNamespace].getUserIdsAsEids()]);
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
          <Typography className={classes.heading}>User IDs</Typography>
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
              <Tab label="Config used" {...a11yProps(0)} />
              <Tab label="Generated IDs" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <Paper square className={classes.tabPanelRoot}>
                As Configured using pbjs.setConfig()
                <SyntaxHighlighter language="javascript" style={docco}>
                    { (pbjsConfig && pbjsConfig.userSync && pbjsConfig.userSync.userIds) ? JSON.stringify(pbjsConfig.userSync.userIds, undefined, 4) : ''}
                  </SyntaxHighlighter>                      
              </Paper>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>            
              <Paper square className={classes.tabPanelRoot}>
                Generated IDs in ORTB EIDs format
                <SyntaxHighlighter language="javascript" style={docco}>
                    {(JSON.stringify(pbjsUserIds, undefined, 4))}
                  </SyntaxHighlighter>                      
              </Paper>
            </TabPanel>
            </Paper>
        </AccordionDetails>
      </Accordion>
      )
  }