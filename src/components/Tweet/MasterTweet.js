import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Header from "../Header";
import { TWEET } from "../../queries/tweet";
import Loader from "../Loader";
import Tweet from "./Tweet";
import Comment from "../Comment/Comment";
import AddComment from "../Comment/AddComment";
import { sortFn } from "../../utils";
import CustomResponse from "../CustomResponse";

const Wrapper = styled.div`
  margin-bottom: 7rem;
`;

const MasterTweet = () => {
  const { tweetId } = useParams();

  const { data, loading } = useQuery(TWEET, { variables: { id: tweetId }, pollInterval: 5 * 1000 });

  const comments =
    data?.tweet?.comments?.length
      ? data.tweet.comments
      : [];
  comments.sort(sortFn);

  return (
    <Wrapper>
      <Header>
        <span>Blab</span>
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data && data.tweet && data.tweet.id ? (
            <Tweet tweet={data && data.tweet} />
          ) : (
            <CustomResponse text="Oops, the blab you are looking for doesn't seem to be exist." />
          )}
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          {data && data.tweet && data.tweet.id ? (
                <AddComment id={data.tweet.id} />
                ) : null}
        </>
      )}
    </Wrapper>
  );
};

export default MasterTweet;
