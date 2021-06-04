import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

function AppBreadcrumb() {
  return (
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
    </Content>
  )
}

export default AppBreadcrumb;
