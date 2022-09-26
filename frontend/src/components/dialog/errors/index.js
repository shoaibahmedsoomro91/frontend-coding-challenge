import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogHeader from '../header'

export default function Errors({ title, content, open, closeDialog }) {    
  const handleClose = () => {
    closeDialog();
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={ () => handleClose() }
      aria-labelledby="form-dialog-title">
      <DialogHeader title={title} closeDialog={()=>{handleClose()}}/>
      <DialogContent>          
        <Grid container direction="row" id="get-input-id" justifyContent="center"> 
          <Typography variant='h4'>{content}</Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item xs={12}>
            <Button fullWidth={true} variant="contained" onClick={() => handleClose()} color="primary">OK</Button>
          </Grid>          
        </Grid>
      </DialogActions>   
    </Dialog>
  )
}