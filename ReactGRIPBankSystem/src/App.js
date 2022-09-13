import React, { Suspense } from 'react';
import { BrowserRouter as Router ,Route ,Redirect,Switch} from 'react-router-dom';
//import Customers from './components/customers/Customers';
//import CustomerProfile from './components/customers/CustomerProfile';
//import Transactions from './components/transactions/Transactions';
import MainNavigation from './shared/components/Navigation/MainNavigation'; 
import Home from './components/Home';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Customers = React.lazy(()=> import ('./components/customers/Customers'));
const CustomerProfile = React.lazy(()=> import ('./components/customers/CustomerProfile'));
const Transactions = React.lazy(()=> import ('./components/transactions/Transactions'));


const App = ()=> {
  return <Router>
    <MainNavigation />
      <main> 
        <Suspense 
        fallback={
          <div className='center'>
          <LoadingSpinner />
          </div>
          }
        >
        <Switch>
        <Route path="/" exact>
        <Home />
        </Route>

        <Route path="/customers" exact>
        <Customers />
        </Route>

        <Route path="/:id/profile" exact>
        <CustomerProfile />
        </Route>

        <Route path="/Transactions" exact>
        <Transactions />
        </Route>

        <Redirect to="/" />
        </Switch>
        </Suspense>
      </main>
  </Router>;
}

export default App;
