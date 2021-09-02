import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getAllComments } from '../../lib/api';
import CommentsList from '../comments/CommentsList'; 

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest , status , data: loadedComments } = useHttp(getAllComments)
  const param = useParams()
  const {quoteID} = param
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addCommentHandler = useCallback(()=>{
      sendRequest(quoteID)
  },[sendRequest, quoteID])
  
  
  useEffect(()=>{
      sendRequest(quoteID)
  },[quoteID, sendRequest])
  let comments;
  if(status === 'pending'){
    comments = (<div className="centered"><LoadingSpinner/></div>)
  }
  if(status==='completed' && (loadedComments && loadedComments.length > 0)){
      comments = <CommentsList comments ={loadedComments} />
  }
  if(status==='completed' && (loadedComments && loadedComments.length === 0)){
      comments = <p className="centered"> No comment added yet. </p> 
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteID} onAddedComment={addCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
