import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from '../config/routes'
import ProtectedRoute from './ProtectedRoutes'

function MainRouter({msalInstance}) {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({
          component: Component,
          title,
          path,
          exact,
          isProtected
        }, index) => {
          if (isProtected) {
            return <ProtectedRoute
              component={Component}
              title={title}
              path={path}
              exact={exact}
              key={index}
              isProtected={isProtected}/>
          } else {
            return  <Route path={path} exact={exact} key={index} component={Component}/>
          }
        })
        }
      </Switch>
    </BrowserRouter>
  )
}

export default MainRouter;