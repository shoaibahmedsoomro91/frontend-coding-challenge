import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 2,
    padding: theme.spacing(3)
  }
}));

export default function AppLayout(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>       
      <AppBar
        id = 'app-bar'
        position='fixed'
        className={clsx(classes.appBar)}
        role = 'app-bar'
      >
        <Toolbar>        
          <Typography align='center' variant='h4' noWrap style={{ flexGrow: 1}}>
            CrewMeister Front End Challange
          </Typography>          
        </Toolbar>
      </AppBar>
      <Container role = 'app-container' className={classes.content} maxWidth = {false}>      
        <div className={classes.toolbar} />
        {props.children}
      </Container>
    </div>
  );
}
