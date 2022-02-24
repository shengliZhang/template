import React from 'react';
import { history } from 'umi';
import { Container } from '@/common';
import apiService from '@/request';
import styles from './style.less';
function Test() {
  const handleClick = () => {
    history.push('/admin');
  };

  const handleFetch = async () => {
    const [err, data] = await apiService.GET(
      '/api/pcdoctor/consultation/room/getAllPositions',
    );
    console.log('handleFetch ------', err.code, err.message);
  };
  return (
    <Container
      title="this is title Test"
      // footer={[<div>123</div>, <div>123</div>]}
    >
      <React.Fragment>
        <div className={styles.test} onClick={handleClick}>
          this is body
        </div>
        <div className={styles.test} onClick={handleFetch}>
          this is body
        </div>
      </React.Fragment>
    </Container>
  );
}

export default Test;
