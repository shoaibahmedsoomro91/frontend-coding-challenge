import React from 'react';
import { Route } from "react-router-dom";
import AppLayout from '../layout/AppLayout';

function ProtectedRoutes( {
  component : Component,
  path,
  exact
} ) {  
  return (
    <div>
      <AppLayout>
        <Route path={path} exact={exact} component={Component}/>
      </AppLayout>
    </div>
  )
}

export default ProtectedRoutes;