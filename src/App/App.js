import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import MainAccordion from '../Components/MainAccordion';

const useStyles = makeStyles((theme) => ({
  App: {
    position: 'fixed',
    top: '5px',
    right: '5px',
    padding: '5px',
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
      <MainAccordion pbjsNamespace={pbjsNamespace} />
    </Container>
    </React.Fragment>
  );
}

export default App;
