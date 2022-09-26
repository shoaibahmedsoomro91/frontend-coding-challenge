import React from 'react';
import Grid from '@material-ui/core/Grid';
import services from '../../services/http'
import DataTable from "../../components/table";
import CustomToolBar from "../../components/table/toolbar";
import ThemeCircularProgress from '../../components/loading';
import FilterDialog from '../../components/dialog/filters';
import MemberDetailDialog from '../../components/dialog/memberDetail';
import Errors from '../../components/dialog/errors';
import COLUMNS from './columns';
import toolBarActions from './toolbar-json';

export default function Dashboard() {  
  const [ gridData, setGridData ] = React.useState([]);
  const [ showFilterFormDialog, setFilterFormDialog ] = React.useState(false);
  const [ showMemberDetailDialog, setMemberDetailDialog ] = React.useState(false);
  const [ memberInfo, setMemberInfo ] = React.useState({})
  const [loading, setLoading] = React.useState(true);
  const [ showError, setShowError ] = React.useState(false);

  const getAllData = () => {
    services.get('http://localhost:5000/api/absence/getAll').then(
      (resp) => {
        if(resp && resp.data){
          setGridData(resp.data);
          setLoading(false);
        }
      }      
    )
  }

  const handleOnRowClick = (rowData, meta) => {    
    setMemberInfo(gridData[meta.dataIndex])
    setMemberDetailDialog(true);
  }
  
  const options = {
    customToolbar: () => {
      return (
        <CustomToolBar onClick={(actionType , actionOn)=>{ toolbarActions(actionType , actionOn) }} customToolBar={toolBarActions}></CustomToolBar>
      )
    },
    onRowClick: handleOnRowClick,
    responsive : 'vertical',
    tableBodyHeight : '600px',
    selectableRows: 'none',
    viewColumns: false,
    print: false,
    filter : false,
    download : false,
    search : true,
    
  };

  const toolbarActions = (actionType, actionOn) => {        
    switch (actionType) {
      case 'showDialog':
        switch (actionOn) {
          case 'filters':
            setFilterFormDialog(true);
            break;
          default:
            break;
        }
        break;      
      default:
        break;
    }
  }

  const handleResponse = (res,type,memberInfo) => {    
    if(res.statusCode && res.statusCode !== 200){
      setShowError(true);
    }else{
      if(type === 'approve'){
        const start = memberInfo.startDate;
        const end = memberInfo.endDate;
        const name = memberInfo.name;
        const leaveType = memberInfo.type;
        var icsMSG = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Our Company//NONSGML v1.0//EN\nBEGIN:VEVENT\nUID:me@google.com\nDTSTAMP:20120315T170000Z\nATTENDEE;CN=My Self ;RSVP=TRUE:MAILTO:me@gmail.com\nORGANIZER;CN=Me:MAILTO::me@gmail.com\nDTSTART:" + start +"\nDTEND:" + end + "\nSUMMARY:" + name +" will be on " + leaveType + " leaves\nEND:VEVENT\nEND:VCALENDAR";
        window.open( "data:text/calendar;charset=utf8," + escape(icsMSG));
      }
      getAllData()
    }
  }

  const filterData = ( action, formData) => {
    setLoading(true);
    if(action === 'filter'){
      services.post(`http://localhost:5000/api/absence/filter`,formData).then(
        (resp) => {
          if(resp && resp.data){
            setGridData(resp.data.payload)
            setLoading(false);          
          }
        }      
      )
    }else{
      getAllData()
    }
    
  }

  React.useEffect(() => {
    getAllData()
  },[]);

  return (
    <Grid container>
      {
        loading && <ThemeCircularProgress/>
      }
      {showFilterFormDialog && (
        <FilterDialog
          open={showFilterFormDialog}
          title={'Filters'}
          buttonAction={(action,formData) => { filterData(action,formData)}}
          closeDialog={() => setFilterFormDialog(false)}
        ></FilterDialog>
      )}
      {showMemberDetailDialog && (
        <MemberDetailDialog
          open={showMemberDetailDialog}
          title={'Memeber Detail'}
          memberInfo = {memberInfo}
          closeDialog={() => setMemberDetailDialog(false)}
          response={(res,type,memberInfo) => handleResponse(res,type,memberInfo)}
        ></MemberDetailDialog>
      )}
      {
        showError && <Errors title="Error" content="Something Went wrong" open={showError} closeDialog={()=>{setShowError(false)}}/>
      }
      <Grid item xs={12}>
        <DataTable          
          title={"Absences"}
          gridData={gridData}
          gridcolumns={COLUMNS}
          gridOptions={options}
          />
      </Grid>      
    </Grid>    
  );
}