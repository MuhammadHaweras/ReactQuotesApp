import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import HighlightedQuote from '../quotes/HighlightedQuote' 
import Comments from '../comments/Comments';
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteDetail = () => {
    const params = useParams()
    const match = useRouteMatch()
    const {quoteID} = params;
    const {sendRequest , status , data: loadedQuote , error} = useHttp(getSingleQuote, true)
    useEffect(()=>{
        sendRequest(quoteID)
    },[sendRequest, quoteID])
    if(status === 'pending'){
        return(
            <div className="centered">
                <LoadingSpinner/>
            </div>
        );
    }
    if(error){
        return <div className="centered">{error}</div>
    }
    if(!loadedQuote.text){
        return <p>No Quote Found!😢</p>
    }
    return ( 
        <div>
        <HighlightedQuote text={loadedQuote.text} author ={loadedQuote.author}/>
        <Route path ={match.path} exact>
        <div className="centered">
            <Link to={`${match.url}/comments`} className='btn--flat'>Load Comments</Link>
        </div>
        </Route>
        <Route path={`${match.path }/comments`}>
            <Comments/>
        </Route>
        </div>
     );
}
 
export default QuoteDetail;