import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import DialogHeader from '../header';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControl,
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    minWidth: 120,
  }
}));

export default function FormDialog(props) {    
  const classes = useStyles();  
  const {title,open} = props;
  const [ typeVal, setTypeVal ] = React.useState('all')
  
  const [ start_date, setStartDate ] = React.useState(new Date());
  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const [ end_date, setEndDate ] = React.useState(new Date());
  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const buttonAction = (action) => {    
    const formData = {
      type : typeVal,
      startDate : start_date,
      endDate : end_date
    }
    
    props.buttonAction(action,formData)
    props.closeDialog();
  }
  
  const closeDialog = () => {
    props.closeDialog();
  }

  const handleTypeChange = (e) => {
    setTypeVal(e.target.value)
  }

  return (
    <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose=
        { () => props.closeDialog() }
        aria-labelledby="form-dialog-title">   
        <DialogHeader title={title} closeDialog={()=>{closeDialog()}}/>
        <DialogContent>          
          <Grid container spacing={2} justifyContent='center' alignContent='center'>
            <Grid item xs={12}>
              <FormControl variant="standard" className={classes.formControl}>
                <InputLabel id="select-bucket-label">Select Type</InputLabel>
                <Select
                  data-testid = "leave-type"
                  fullWidth
                  labelId="select-type-label"
                  id="select-type"
                  variant={'standard'}
                  value={typeVal}
                  label="Bucket"
                  onChange={handleTypeChange}
                >
                  <MenuItem value={'all'}>{'All'}</MenuItem>
                  <MenuItem value={'sickness'}>{'sickness'}</MenuItem>
                  <MenuItem value={'vacation'}>{'vacation'}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  data-testid = "start-date"
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="start-date"
                  label="Start Date"
                  value={start_date}
                  onChange={handleStartDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  data-testid = "end-date"
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="end-date"
                  label="End Date"
                  value={end_date}
                  onChange={handleEndDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={6}>
              <Button role = "action_buttons" data-id = 'apply_filter' fullWidth={true} variant="contained" onClick={() => buttonAction('filter')} color="primary">Apply</Button>
            </Grid>
            <Grid item xs={6}>
              <Button role = "action_buttons" data-id = 'reset_filter' fullWidth={true} variant="contained" onClick={() => buttonAction('reset')} color="primary">Reset</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
  )
}
FormDialog.propTypes = {
  input: PropTypes.array,
  open: PropTypes.bool,
  title: PropTypes.string,
  showButton: PropTypes.bool,
  showOkButton: PropTypes.bool,
  closeDialog: PropTypes.func,
  buttonAction: PropTypes.func,
  handleOnChange: PropTypes.func
};