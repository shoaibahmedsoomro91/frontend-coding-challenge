import Dashboard from '../pages/dashboard';
const routes = [    
  {
    component: Dashboard,
    title: 'Dashboard',
    path: '/',
    exact: true,
    isProtected: true
  }
];
export default routes;
