import React from 'react';
import { NavBar } from 'antd-mobile';
import { history } from 'umi';
import styles from './style.less';
interface IProps {
  children?: JSX.Element;
  title?: string;
  back?: string;
  onBack?: () => void;
  hideNav?: boolean;
  footer?: any[];
}
/**
 *
 * @param props
 * @returns
 */
function Layout(props: IProps) {
  const {
    children,
    title = '',
    back = '',
    onBack,
    hideNav = false,
    footer = [],
  } = props;

  const handleClickBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    history.goBack();
  };

  const compile = () => {
    if (hideNav) {
      return false;
    }
    return true;
  };
  return (
    <React.Fragment>
      <div className={styles.main}>
        {compile() && (
          <div className={styles.headers}>
            <NavBar
              onBack={handleClickBack}
              back={back ? back : ''}
              style={{ '--border-bottom': '1px #f7f7f7 solid' }}
            >
              {title}
            </NavBar>
          </div>
        )}

        <div className={styles.bodys}>{children}</div>
        {Array.isArray(footer) && footer.length > 0 && (
          <div className={styles.bottomBtns}>
            {footer.map((Btns, index) => Btns)}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Layout;
