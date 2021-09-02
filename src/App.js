
import React, { Suspense } from 'react';
import { Redirect, Route , Switch } from 'react-router-dom'
import Layout from './components/layout/Layout';
import AllQuotes from './components/pages/AllQuotes'
// import NewQuote from 
// import Notfound from './components/pages/Notfound';
// import QuoteDetail from './components/pages/QuoteDetail';
import LoadingSpinner from './components/UI/LoadingSpinner';
const NewQuote = React.lazy(()=>import('./components/pages/NewQuote'))
const Notfound =React.lazy(()=>import('./components/pages/Notfound'))
const QuoteDetail = React.lazy(()=>import('./components/pages/QuoteDetail'))
function App() {
  return (
    <Layout>
    <Suspense fallback={
      <div className='centered'><LoadingSpinner/></div>
    }>
    <Switch>
    <Route path='/' exact>
        <Redirect to='/quotes'>

        </Redirect>
      </Route>
      <Route path='/quotes' exact>
        <AllQuotes/>
      </Route>
      <Route path='/quotes/:quoteID'>
         <QuoteDetail/>
      </Route>
      <Route path ='/new-quote'>
        <NewQuote/>
      </Route>
      <Route path='*'>
        <Notfound/>
      </Route>
     
    </Switch>
    </Suspense>
    </Layout>
  );
}

export default App;
