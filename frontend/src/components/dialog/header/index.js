import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function dialogHeader({title, closeDialog}) {    
  
  return (
    <Grid data-id = "dialog_header" container direction="row" alignItems='center' className="dialog_header">
      <Grid item xs={10} className='dialog_header_title'>
        <Typography variant="body2">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={2} className='dialog_header_close_btn'>
        <IconButton onClick={() => closeDialog()} edge="end" color="inherit" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}