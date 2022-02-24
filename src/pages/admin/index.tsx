import React from 'react';
import { useSelector, useDispatch } from 'umi';
import { TextArea } from 'antd-mobile';
import { Container } from '@/common';

function Index() {
  const dispatch = useDispatch();
  const modal = useSelector((state: any) => state.admin);

  const handleDisptch = () => {
    dispatch({
      type: 'admin/updateState',
      payload: { currentUser: '12333333333' },
    });
  };
  return (
    <Container
      title="this is title Index"
      // footer={[<div>123</div>, <div>123</div>]}
    >
      <>
        <div onClick={handleDisptch}>dispatch</div>
        <div onClick={handleDisptch}>{modal.currentUser}</div>
      </>
    </Container>
  );
}
export default Index;
