import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import NavBar from '../header/navbar';
import AppBreadcrumb from '../ui/app-breadcrump';
import AppFooter from '../ui/app-footer';

import classes from './app-layout.module.css'

function AppLayout({ children }) {
  return (
    <Layout className={classes.layout}>
      <NavBar />
      {/* <AppBreadcrumb /> */}
      <Content className={classes.content}>{children}</Content>
      <AppFooter />
    </Layout>
  )
}

export default AppLayout;