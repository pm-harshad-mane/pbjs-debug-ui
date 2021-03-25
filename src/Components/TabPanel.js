import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core/Typography';


// Todo: Implement Vertical Tabs: https://material-ui.com/components/tabs/#vertical-tabs


const useStyles = makeStyles((theme) => ({
  TabPanel: {
    maxHeight: '300px',
    minHeight: '300px',
    overflow: 'scroll',
    // width: '100%'
  },

  Box: {
    padding: '10px',
    fontSize: '14px'
  }
}));

export function TabPanel(props) {

  const classes = useStyles();
  const { children, value, index, ...other } = props;

  // <Typography>{children}</Typography>

  return (
    <div
      className = {classes.TabPanel}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={6} className={classes.Box}>
          {children}
        </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}