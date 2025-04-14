import { useEffect, useState } from 'react';

const Messages = () => {
  const [txt, setTxt] = useState('测试页面');

  console.log('页面渲染');

  useEffect(() => { }, []);

  return (
    <>
      <div onClick={() => setTxt(Math.random().toString())}>{txt}</div>
    </>
  );
};

export default Messages; 