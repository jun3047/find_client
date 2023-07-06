import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { Post } from '../Post';
import styled from "@emotion/styled"
import { AlignBox } from '../../styles/atom';

const db = [

  {
    question: 'What is your favorite color?',
    content: '1',
    writer: '1',
  },
  {
    question: 'What is your favorite color?',
    content: '2',
    writer: '2',
  },
  {
    question: 'What is your favorite color?',
    content: '3',
    writer: '3',
  },
  {
    question: 'What is your favorite color?',
    content: '4',
    writer: '4',
  },
  {
    question: 'What is your favorite color?',
    content: '5',
    writer: '5',
  },
]

const CardContainer = styled.div`
  position: relative;
`;

const TinderCardComponent = styled(TinderCard)`
  position: absolute;
  right: -30vw;
  bottom: -40vh;
  transition: transform 0.3s ease;

  z-index : ${({ isActive }) => isActive ? 2 : 1 };

  transform : ${({ isActive }) => isActive ? 'scale(1)' : 'scale(0)'}
;
`


function Advanced({SwipeRight, SwipeLeft}) {

  const [posts, setPosts] = useState(db);
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction);

    if(direction === 'right') {
      SwipeRight()
    }else {
      SwipeLeft()
    }
  };

  const outOfFrame = (name, idx) => {
    setPosts(prevPosts => prevPosts.filter((_, index) => index !== idx));
  };

  return (
    <AlignBox align="center">
      <h2 className="infoText">You swiped {lastDirection}</h2>
      <CardContainer>
        {posts.map((post, index) => (
          <TinderCardComponent
            key={post.writer}
            onSwipe={(dir) => swiped(dir, post.writer)}
            onCardLeftScreen={() => outOfFrame(post.writer, index)}
            isActive={index === posts.length - 1}
          >
            <Post question={post.question} content={post.content} writer={post.writer} />
          </TinderCardComponent>
        ))}
      </CardContainer>
    </AlignBox>
  );
}

export default Advanced;
