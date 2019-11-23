/*
 * @Author: jweboy
 * @Date: 2019-11-01 23:21:05
 * @LastEditors: jweboy
 * @LastEditTime: 2019-11-22 23:20:18
 */
import * as React from 'react';
import { Layout, Icon } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import Leftbar from './components/leftbar';
import { AppProps } from './types/app';
import Routes from './routes';
import styles from './App.less';

const { Sider, Content, Header } = Layout;
const initialIsDetailPage: boolean = false;

// TODO: react hot loader

const App: React.FC<AppProps> = () => {
  const isDetailRegular = /\/detail\//;
  const location = useLocation();
  const [isDetailPage, setIsDetailPage] = React.useState(initialIsDetailPage);
  const contentStyle: React.CSSProperties = { padding: 24,  marginTop: 64 };
  const headerStyle: React.CSSProperties = { backgroundColor: '#fff' };
  const history = useHistory();

  const handlePageGoBack = () => history.goBack();

  React.useEffect(() => {
    setIsDetailPage(isDetailRegular.test(location.pathname));
  }, [location]);

  return (
    <Layout className={styles.container}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Leftbar />
      </Sider>
      <Layout>
        <Header className={styles.header} style={headerStyle}>
          {isDetailPage && <Icon className={styles.backIcon} type="rollback" onClick={handlePageGoBack} />}
        </Header>
        <Content style={contentStyle}>
          <div className={styles.content}>
            <Routes />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
