import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../../lib/api';
import QuoteList from '../quotes/QuoteList';
import NoQuotesFound from '../quotes/NoQuotesFound'
import { useEffect } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

const AllQuotes = () => {
   const {sendRequest , status, data:loadedQuotes , error} = useHttp(getAllQuotes, true)
   useEffect(()=>{
        sendRequest()
   },[sendRequest])
   if(status==='pending'){
       return <div className="centered"><LoadingSpinner/></div>
   }
   if(error){
       return <div className="centered focused">{error}</div>
   }
   if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)){
       return <NoQuotesFound/>
   }
    return ( 
        <div>
            <QuoteList quotes={loadedQuotes}/>
        </div>
     );
}
 
export default AllQuotes;