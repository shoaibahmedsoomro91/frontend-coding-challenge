import React from 'react';
import services from '../../../services/http';
import ThemeCircularProgress from '../../loading';
import DialogHeader from '../header';
import {
  Grid,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  TextField
} from '@material-ui/core';

export default function MemberDetailDialog({title,open,memberInfo,response,closeDialog}) {
  const { admitterNote, endDate, id, image, memberNote, name, numberOfDays, startDate, status, type } = memberInfo;
  const [ description, setDescription ] = React.useState(admitterNote);
  const [loading, setLoading] = React.useState(false);
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const submit = (type) => {
    const data = { admitterNote : description , status : type}
    setLoading(true)
    services.put(`http://localhost:5000/api/absence/${id}`,data).then(
      (resp) => {
        if(resp && resp.data){
          closeDialog();
          setLoading(false);
          response(resp.data,type,memberInfo);          
        }
      }      
    )    
  }

  return (
    <>
      {
        loading && <ThemeCircularProgress/>
      }
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose=
        { () => closeDialog() }
        aria-labelledby="form-dialog-title">   
        <DialogHeader title={title} closeDialog={()=>{closeDialog()}}/>
        <DialogContent>          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} md={3}> 
              <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 150,sm: 150 },
                  maxWidth: { xs: 150,sm: 150 },
                }}
                alt={name}
                src={image}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3}>
                  <Grid container alignItems='baseline'>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" style={{ fontSize : 16 }}>Name :</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{name}</Typography>
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Grid container  alignItems='baseline'>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" style={{ fontSize : 16 }}>Type :</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{type}</Typography>
                    </Grid>
                  </Grid>  
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Grid container  alignItems='baseline'>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" style={{ fontSize : 16 }}>Total Days :</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{numberOfDays}</Typography>
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Grid container  alignItems='baseline'>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" style={{ fontSize : 16 }}>From :</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{startDate}</Typography>
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Grid container  alignItems='baseline'>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" style={{ fontSize : 16 }}>To :</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{endDate}</Typography>
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Grid container  alignItems='baseline'>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" style={{ fontSize : 16 }}>Status :</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{status}</Typography>
                    </Grid>
                  </Grid> 
                </Grid>
                <Grid item xs={12}>
                  <Grid container  alignItems='baseline'>
                    <Grid item xs={1}>
                      <Typography variant="subtitle2" style={{ fontSize : 16 }}>Note :</Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <Typography>{memberNote}</Typography>
                    </Grid>
                  </Grid> 
                </Grid>
              </Grid>              
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled = { status !== 'Requested' ? true : false }
                rows={4}
                multiline
                id="description"
                name="description"
                label="Enter Your Notes"
                fullWidth
                variant="outlined"
                onChange={handleDescription}
                value={description}
              />
            </Grid>
          </Grid>          
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={12} sm={6}>
              <Button fullWidth={true} variant="contained" onClick={() => { submit('approve') }} color="primary" disabled = { status !== 'Requested' ? true : false }>Approve</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button fullWidth={true} variant="contained" onClick={() => { submit('reject') }} color="primary" disabled = { status !== 'Requested' ? true : false }>Reject</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}