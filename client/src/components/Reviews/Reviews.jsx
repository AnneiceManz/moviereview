import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Card, Button, Icon, Image, Confirm } from "semantic-ui-react";
import UpdateReview from "./UpdateReview";
import CommentForm from "../Comments/CommentForm";

const Reviews = ({ review, movieName }) => {
  const { user } = useAuth0();
  const currentUser = user?.sub;
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/reviews/${review.review_id}`, {
        method: "DELETE",
      });
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Card centered>
        <Card.Content>
          <div>

          <Image 
          floated="left"
          circular
          size="tiny"
          src={review.picture}
          />
          </div>
          <Card.Header style={{fontSize: '1.8em'}}>{review.title}</Card.Header>
          <Card.Meta
            style={{ color: "red", fontWeight: "bold" }}
          >
            <span style={{ color: "#3977C9", marginLeft:'2px' }}>{review.username}</span>
          </Card.Meta>
          <Card.Meta>
            {review.star_rating} <Icon name="star" color="yellow" />
            's for {movieName}!
          </Card.Meta>
          <Card.Description><p className="pt-5">{review.post}</p></Card.Description>
        </Card.Content>
        {currentUser === review.user_id && (
          <Card.Content extra>
            <Button.Group size="tiny">
              <UpdateReview review={review} movieName={movieName} />
              <Button color="red" onClick={()=>setConfirm(true)}>
                Delete
              </Button>
              <Confirm 
              cancelButton="Never mind"
              confirmButton="Delete Review"
              content="Are you sure you want to delete this review?"
              open={confirm}
              onCancel={() => setConfirm(false)}
              onConfirm={handleDelete}
              />
            </Button.Group>
          </Card.Content>
        )}
      </Card>
      <CommentForm review_id={review.review_id} />
    </>
  );
};

export default Reviews;
