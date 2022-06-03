import { FC, useState, PropsWithChildren } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { LINK } from '@src/common/constatnt';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem({
  label,
  key,
  icon,
  children,
}: {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
}): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const menuItems: MenuItem[] = LINK.map((link, ind) =>
  getItem({ label: link.name, key: ind })
);

const CustomLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Layout className="min-h-screen">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Link to="/">
            <div className="text-[#fff] text-20px pl-24px h-60px flex items-center cursor-pointer">
              LOGO
            </div>
          </Link>
          <Menu
            theme="dark"
            defaultSelectedKeys={['0']}
            mode="inline"
            items={menuItems}
            selectedKeys={[
              `${
                LINK.findIndex((link) => link.url === location.pathname) || 0
              }`,
            ]}
            onClick={({ key }) => {
              navigate(LINK[key as unknown as number].url);
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="pd-0" />
          <Content className="mx-16px">{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CustomLayout;
