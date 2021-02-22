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
import AdUnit from './AdUnit'


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
    fontWeight: 'bold'    
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionDetails: {
    padding: '0px'
  },
  adUnitWrapper: {
    width: '100%',
  }
}));

export default function AdUnits(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [displayed, setDisplayed] = React.useState(false);
  // const [pbjsConfig, setPbjsConfig] = React.useState({debug: false});
  const [pbjsAdUnits, setPbjsAdUnits] = React.useState([]);
  const {pbjsNamespace} = props;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if(isExpanded && !displayed){
      window[pbjsNamespace].que.push(function(){        
        setPbjsAdUnits(window[pbjsNamespace].adUnits);
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
          <Typography className={classes.heading}>AdUnits</Typography>
          <Typography className={classes.secondaryHeading}></Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <div className={classes.adUnitWrapper}>
          	{pbjsAdUnits.map((adUnit,index)=>{
				return <AdUnit pbjsNamespace={pbjsNamespace} pbjsAdUnit={adUnit} key={adUnit.code} />
	     	})}          	
          </div>
        </AccordionDetails>
      </Accordion>
      )
  }
