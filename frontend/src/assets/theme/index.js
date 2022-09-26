const APP_THEME_ENGINE = {
  MuiButton : {
    root : {
      color : '#fff',
      borderRadius: '0',
      '&$disabled': {
        color: '#fff',
        background : '#adb5bd !important'
      }
    },
    containedPrimary : {
      backgroundColor : 'var(--theme-primary-color)',
      '&:hover': {
        backgroundColor: 'var(--theme-secondary-color)'
      }
    }
  },
  MuiIconButton: {
    root: {
      color: "var(--theme-primary-color)",     
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    edgeStart: {
      marginLeft: -4
    }
  },  
  MuiAppBar : {
    colorPrimary : {
      background : 'linear-gradient(45deg, var(--theme-primary-color), var(--theme-secondary-color)) !important'
    }
  },
  MuiPickersDay : {
    daySelected : {
      backgroundColor : 'var(--theme-primary-color)',
      '&:hover': {
        backgroundColor: 'var(--theme-secondary-color)'
      }
    }    
  }
}
export default APP_THEME_ENGINE;