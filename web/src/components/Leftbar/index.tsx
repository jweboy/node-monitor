import * as React from 'react';
import * as qs from 'qs';
import { Menu } from 'antd';
import { menu } from './config';
import { ClickParam } from 'antd/lib/menu';
import { LeftBarProps, LeftBarItem } from 'src/types/leftbar';
import { Link, useLocation  } from 'react-router-dom';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const defaultOpenKeys = ['interface'];
const initialSelectedKeys: string[] = ['code']; // succeed

// TODO: 子菜单重复render

const Leftbar: React.FC<LeftBarProps> = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(initialSelectedKeys);
  const location = useLocation();

  const handleMenuClick = ({ key }: ClickParam) => {
    setSelectedKeys([key]);
  };

  const getCurrentUrl = ({ url }: LeftBarItem, { query }: LeftBarItem): string => {
    return  query ?  `${url}?${qs.stringify(query)}` : '';
  };

  React.useEffect(() => {
    const { search } = location;
    if (search) {
      // TODO: qs.parse 可以抽取
      const query = qs.parse(search, { ignoreQueryPrefix: true });
      const { status } = query;

      setSelectedKeys([status]);
    }
  }, [location.search]);

  return (
    <Menu mode="inline" theme="dark" selectedKeys={selectedKeys} onClick={handleMenuClick} defaultOpenKeys={defaultOpenKeys}>
      {
        menu.map((item: LeftBarItem) => {
          const { children } = item;

          if (!children) {
            return (
              <MenuItem key={item.key}>
                <Link to={item.url}>{item.name}</Link>
              </MenuItem>
            );
          }

          return (
            <SubMenu key={item.key} title={item.name}>
              {
                children.length > 0 && children.map((child: LeftBarItem) => (
                  <MenuItem key={child.key}>
                    <Link to={getCurrentUrl(item, child)}>{child.name}</Link>
                  </MenuItem>
                ))
              }
            </SubMenu>
          );
        })
      }
    </Menu>
  );
};

export default Leftbar;
