import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Container, Paper } from '@material-ui/core';

import MainAccordion from '../Components/MainAccordion';

const useStyles = makeStyles((theme) => ({
  App: {
    position: 'fixed',
    top: '5px',
    right: '5px',
    // padding: '0px',
    zIndex: '2147483648',// set to max; observed max is 999999
    maxHeight: (window.innerHeight - 10) + 'px',
    overflowY: 'scroll',
    margin: '0px -32px',
    padding: '0px 32px',
    marginBottom: '-32px',
    paddingBottom: '32px'
  }
}));

function App(props) {
  const classes = useStyles();
  const {pbjsNamespace} = props;

  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm" className={classes.App}>
      <Paper elevation={3}>
        <MainAccordion pbjsNamespace={pbjsNamespace} />
      </Paper>
    </Container>
    </React.Fragment>
  );
}

export default App;
