import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import { Post } from '../Post';
import styled from "@emotion/styled"
import { AlignBox } from '../../styles/atom';


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


function Advanced({db, SwipeRight, SwipeLeft}) {

  const [posts, setPosts] = useState(db);
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    setLastDirection(direction);
  };

  const outOfFrame = (name, idx) => {
    
    setPosts(prevPosts => prevPosts.filter((_, index) => index !== idx));

    if(lastDirection === 'right') {
      SwipeRight()
    }else {
      SwipeLeft()
    }

    
  };

  return (
    <AlignBox align="center">
      <CardContainer>
        {posts.map((post, index) => (
          <TinderCardComponent
            key={post.writer}
            onSwipe={(dir) => swiped(dir, post.user.nickname)}
            onCardLeftScreen={() => outOfFrame(post.user.nickname, index)}
            isActive={index === posts.length - 1}
          >
            <Post question={post.question} content={post.content} writer={post.user.nickname} />
          </TinderCardComponent>
        ))}
      </CardContainer>
    </AlignBox>
  );
}

export default Advanced;
