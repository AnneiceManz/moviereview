import React, {useState} from 'react';

const CommentForm = ({review_id}) => {

    const [writeComment, setWriteComment] = useState(
        state || {
            user_id: userId,
            review_id: movieId,
            comment_text: "",
        }
      )
    

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(writeComment),
          });
          window.location.reload();
        } catch (error) {
          console.log(error.message);
        }
      };  

    return (
        <div>
            
        </div>
    );
};

export default CommentForm;