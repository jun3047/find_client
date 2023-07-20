import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { Post } from '../Post';
import styled from "@emotion/styled"
import { AlignBox, EmptyPage, EmtpyBox, MarginBox, Text } from '../../styles/atom';
import { PostType } from "../../types/post.type";
import { length } from '../../../node_modules/tailwindcss/src/util/dataTypes';


const CardContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TinderCardComponent = styled(TinderCard)`
  position: absolute;
  transition: transform 0.3s ease;

  z-index: ${({ isActive }) => isActive};

  transform: ${({ isActive }) => isActive ? 'scale(1)' : 'scale(0)'};
;
`

export function SimpleCard({db, setDB, setOtherUserInfo, setPostInfo, passHandler}) {

  const [yetPost, setYetPost] = useState([]);

  useEffect(()=>{setYetPost([])},[])
  
  const popPost = (prevPosts) => prevPosts.slice(0, prevPosts.length - 1);

  const outOfFrame = (name, idx) => setDB([...popPost(db)]);

  const nowPost = db[db.length - 1];

  setPostInfo(nowPost)
  setOtherUserInfo(nowPost?.userInfo)

  return (
    <AlignBox align="center">
      <EmtpyBox height={38} />
      <CardContainer>
        {db.length <= yetPost.length ? (
          <EmptyPage>
            <p>글이 없어요 😭</p>
            <Text content='글을 쓰고, FIND를 기다리는 건 어때요? ✏️'/>
            <p>새로고침하면 최신 글을 불러올게요 !</p>
          </EmptyPage>
        ) : (
          db.map((post, index) => {
            return (
              <>
                <TinderCardComponent
                  key={post._id}
                  onCardLeftScreen={() =>{

                    console.log("yetPost:", yetPost);
                    console.log("db.length:", db.length);
                    console.log("db:", db);
                    
                    if(yetPost.includes(post._id)) return;

                    yetPost.push(post._id)
                    passHandler(nowPost)
                    outOfFrame(post.userInfo.nickname, index)
                    
                    }
                  }
                  isActive={db.length}
                >
                  <Post
                    key={post._id}
                    question={post.question}
                    content={post.content}
                    writer={post.userInfo.nickname}
                  />
                </TinderCardComponent>
              </>
            );
          })
        )}
      </CardContainer>
      <EmtpyBox height={20} />
    </AlignBox>
  );
}


function Advanced({setPostInfo, setOtherUserInfo, setDB, db, SwipeRight, SwipeLeft}) {
  
  const [lastDirection, setLastDirection] = useState();
  
  let lastIdx = db[db.length - 1]?._id;
  let nowId = db[0]?._id;
  

  
  const popPost = (prevPosts) => prevPosts.slice(0, prevPosts.length - 1);
  const selectInDB = (prevPosts) => {
    
    return prevPosts.slice(0, 21)
  };
  
  const swiped = (direction) => {
    setLastDirection(direction);
  };
  
  const outOfFrame = (name, idx) => {
    //삭제
    alert("outOfFrame", name, idx);
  
    const _posts = popPost(showDB);
    setShowDB([..._posts]);
    //추가
  
    if (lastDirection === "right") {
      SwipeRight();
    } else {
      SwipeLeft();
    }
  };
  
  const [showDB, setShowDB] = useState(selectInDB(db));

  useEffect(() => {

    setPostInfo(showDB[0])
    setOtherUserInfo(showDB[0]?.userInfo)
  
    if(showDB.length < 10) {
      const _posts = selectInDB(db)
      setDB(db.slice(21));

      setShowDB([...showDB, ..._posts]);
      
    }

  }, [showDB]);



  const [yetPost, setYetPost] = useState([]);

  return (
    <AlignBox align="center">
      {showDB.length}
      <EmtpyBox height={50} />
      <CardContainer>
        {showDB.map((post, index) => {
          
          return (<>
          <TinderCardComponent
            key={post._id}
            onSwipe={(dir) => swiped(dir, post.userInfo.nickname)}
            onCardLeftScreen={() => {

              if(yetPost.includes(post._id)) return;

              alert("onCardLeftScreen", post.userInfo.nickname, index)
              yetPost.push(post._id)
              outOfFrame(post.userInfo.nickname, index)
            }}
            isActive={index === db.length - 1}
          >
          <Post
            key={post._id}
            question={post.question}
            content={post.content}
            writer={post.userInfo.nickname}
          />
          </TinderCardComponent>
          </>)
        })}
      </CardContainer>
      <EmtpyBox height={20} />
    </AlignBox>
  );
}

export default Advanced;
