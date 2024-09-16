import { RouteObject, redirect } from 'react-router-dom';

// Root
import App from '../App';

// Pages
import Login from '../../components/pages/Login.page'
import Registration from '../../components/pages/Registration.page'
import Listing from '../../components/pages/Listing.page'
import NotFound from '../../components/pages/NotFound.page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, loader: () => (redirect('login'))},
      { path: 'login', element: <Login /> },
      { path: 'registration', element: <Registration /> },
      { path: 'listing', element: <Listing /> },
      { path: '*', element: <NotFound />}
    ]
  },
];

export default routes;
