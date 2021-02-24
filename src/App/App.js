import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import MainAccordion from '../Components/MainAccordion';

const useStyles = makeStyles((theme) => ({
  App: {
    position: 'fixed',
    top: '5px',
    right: '5px',
    padding: '0px',
    zIndex: '999'
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
