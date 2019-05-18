import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Live = React.lazy(() => import('./views/Camera/Live'));
const Gallery = React.lazy(() => import('./views/Camera/Gallery'));
const Geolocation = React.lazy(() => import('./views/Geolocation'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Controller = React.lazy(() => import('./views/Controller'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/camera', exact: true, name: 'Camera', component: Live },
  { path: '/camera/live', name: 'Live', component: Live },
  { path: '/camera/gallery', name: 'Gallery', component: Gallery },
  { path: '/geolocation', name: 'Geolocation', component: Geolocation },
  { path: '/controller', name: 'Controller', component: Controller },
];

export default routes;
