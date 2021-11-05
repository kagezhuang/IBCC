import { object } from 'prop-types';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router/immutable';

import Main from './containers/Main';
import Login from './containers/Login'
import ResetPassword from './containers/ResetPassword';
import Signup from './containers/Signup';

function Routes({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/' component={ Main } />
        <Route path='/login' component={ Login } />
        <Route path='/signup' component={ Signup } />
        <Route path='/reset-password' component={ ResetPassword }/>
      </Switch>
    </ConnectedRouter>
  );
}

Routes.propTypes = {
  history: object.isRequired
};

export default Routes;
