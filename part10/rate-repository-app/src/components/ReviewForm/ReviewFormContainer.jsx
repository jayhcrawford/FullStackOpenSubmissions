import React, { useState } from "react";
import { ReviewForm } from "./ReviewForm";

const ReviewFormContainer = () => {
  // const { dispatch, state } = useContext(AuthState);
  // const { login } = useLogin(dispatch);

  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [repoRating, setRepoRating] = useState("");
  const [repoReview, setRepoReview] = useState("");

  const onSubmit = async (values) => {
    const credentials = {
      owner: repoOwner,
      name: repoName,
      rating: repoRating,
      review: repoReview,
    };

    console.log(credentials);
    // try {
    //   login(credentials);
    // } catch (error) {
    //   console.error("Error calling login from SignIn.jsx", error);
    // }
  };

  return (
    <ReviewForm
      // login={login}

      // loading={state.loading}
      // errorMessage={state.errorMessage}

      repoOwner={repoOwner}
      repoName={repoName}
      repoRating={repoRating}
      repoReview={repoReview}

      onRepoOwnerChange={setRepoOwner}
      onRepoNameChange={setRepoName}
      onRepoRatingChange={setRepoRating}
      onRepoReviewChange={setRepoReview}

      onSubmit={onSubmit}
    />
  );
};

export default ReviewFormContainer;
