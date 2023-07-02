# FIND


## 주요 컴토넌트 및 데이터 스키마



### Dropdown

#### 사용
```js
<Dropdown
  list={questionList}
  value={question}
  setValue={setQuestion}
/>
```

#### 데이터 스키마
```ts
type DropdownProps = {
  setValue: (value: string) => void;
  value: string;
  list: string[];
  placeholder?: string;
  lable?: string;
}
```




### User

#### 데이터 스키마
```ts
type User = {
  nickname: string
  phone: string 🔒
  school: string
  major: number
  grade: number
  id: number
  posts: number[]
  passes: number[]
  finds: number[]
  warns: number[]
}
```




### AlarmBox

#### 사용
```js
<AlarmBox
    user={userInfo}
    question="질문임"
    onClick={() => {}}
/>
```

#### 데이터 스키마
```ts
type AlarmBox = {
  question: string
  onClick: ()=>{}
  user: User{shcool:string, major:string, grade:number}
}
```




### ChatBox

#### 사용
```js
<ChatBox
  key={2}
  date={"오늘"}
  lastMsg={"얍"}
  clickEvent={(roomId:number) => goDetail(roomId)}
  user={{id:2, nickname: "name"}}
/>
```

#### 데이터 스키마
```ts
type ChatBoxProps = {
  date: string
  lastMsg: string
  clickEvent: {()=>{}}
  user: User{id: number, nickname: string};
}
```



### ChatBubble

#### 사용
```js
<ChatBubble
  key={2}
  nickname="닉네임"
  date={DATE}
  msg="내용"
/>
```

#### 데이터 스키마
```ts
type ChatBubbleProps = {
  nickname: string
  msg: string
  date: Date
}
```



### Room

#### 데이터 스키마

```ts
type Room = {
  roomId: number
  chats: chatBubble[]
  members: User{id: number, nickname: string}[]
}
```


### Post

#### 사용
```js
<Post
  question={"Q. 오늘 하루는 어때"}
  content={"생각 적는 곳이여"}
  nickname={nickname}
/>
```

#### 데이터 스키마
```ts
type PostProps = {
  id: string;
  question: string;
  content: string;
  warn: number
  pass: number
  find: number
  user: User{id: string, nickname: string};
}
```
