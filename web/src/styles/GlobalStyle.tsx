import { Global, css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { InitData } from '../components/InitData';

const style = css`
  * {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {

    //모바일 웹용
    --vh: 100%;
    height: 100%;
  }
  
  html{
    /* height: 100vh; */

    /* 모바일 웹용 */
    height: calc(var(--vh, 1vh) * 100);

    margin: 0;
  }

  body{
    margin-top: 42px;

    /* 모바일 웹용 */
    height: calc(var(--vh, 1vh) * 100  - 42px);
    /* height: calc(100vh - 42px); */
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const GlobalStyle = () => {
  // 뷰포트 높이를 상태로 저장
  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    // 뷰포트 높이를 업데이트하는 함수
    const updateVh = () => {
      setVh(window.innerHeight);
    };

    // resize 이벤트 리스너 등록
    window.addEventListener('resize', updateVh);

    return () => {
      window.removeEventListener('resize', updateVh);
    };
  }, []);

  const updatedStyle = css`
    ${style}
    :root {
      --vh: ${vh}px;
    }
  `;

  return <Global styles={updatedStyle} />;
};

export default GlobalStyle;