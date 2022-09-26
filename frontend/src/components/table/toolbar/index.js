import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon'

function ToolBar(props) {  
  const performAction = ( actionType , actionOn, additionalInformation ) => {    
    props.onClick(actionType , actionOn , additionalInformation);
  }
  
  return (
    props
    .customToolBar
    .map((data,index) => {
      return (                
        <Tooltip data-testid={data.testId} role={'toolbar-buttons'} key={index} title={data.tooltip}>
          <IconButton onClick={() => performAction(data.actionType , data.actionOn , data.additionalInformation) }>
            <Icon style={{ color: '#fff' }}>{data.icon}</Icon>
          </IconButton>
        </Tooltip>
      )
    })
  )
}
ToolBar.prototype = {
  customToolBar: PropTypes.array,
  onClick : PropTypes.func
}
export default React.memo(ToolBar)