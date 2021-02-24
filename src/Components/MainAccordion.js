import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import AccUI from './AccUI';
import Config from './Config';
import AdUnits from './AdUnits';
import UserIds from './UserIds';

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
  const [expanded, setExpanded] = React.useState(false);
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
          <Typography className={classes.secondaryHeading}>powered by Harshad Mane</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <div className={classes.root}>
            <AdUnits pbjsNamespace={pbjsNamespace} />
            <UserIds pbjsNamespace={pbjsNamespace} />
            <Config pbjsNamespace={pbjsNamespace} />
          </div>
        </AccordionDetails>
      </Accordion>

      </div>
      )
  }