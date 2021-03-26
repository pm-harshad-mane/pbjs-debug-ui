import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Config from './Config';
import UserIds from './UserIds';
import Errors from './Errors';
import TCF2 from './TCF2';
import FPD from './FPD';
import Auctions from './Auctions';

// ToDo:
// check hard-coded ids

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    '& pre': {
      fontSize: '14px'
    }
  },
  summary: {
  	// backgroundColor: '#1976d2'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: 'bolder',
    color: '#1976d2'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: 'rgba(0, 0, 0, 0.54)'
  },
  accordionDetails: {
    padding: '0px',
    overflow: 'scroll'
  }
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const {pbjsNamespace} = props;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.summary}
        >
          <Typography className={classes.heading}>PrebidJS Debug UI</Typography>
          <Typography className={classes.secondaryHeading}>Powered by Harshad Mane</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <div className={classes.root}>
            <Auctions pbjsNamespace={pbjsNamespace} />
            <UserIds pbjsNamespace={pbjsNamespace} />
            <FPD pbjsNamespace={pbjsNamespace} />
            <Config pbjsNamespace={pbjsNamespace} />            
            <TCF2 pbjsNamespace={pbjsNamespace} />
            <Errors pbjsNamespace={pbjsNamespace} />
          </div>
        </AccordionDetails>
      </Accordion>

      </div>
      )
  }