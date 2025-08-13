import { useEffect, useMemo, useState } from "react";
import { sidebar } from "../utils/sidear";
import Sider from "antd/es/layout/Sider";
import { Button, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { CircleX, Home, LogOut, UserPen } from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed, job, isMobile }) => {
  const { logout } = useAuth();
  const [dmenu, setDMenu] = useState(localStorage.getItem("menu") || "");

  const items = useMemo(() => {
    return sidebar.map((item) => {
      return {
        label: item.children ? (
          <div to={item.key}>{item.label}</div>
        ) : (
          <NavLink to={item.key}>{item.label}</NavLink>
        ),
        icon: item.icon,
        key: item.key,
        children: item.children?.map((child) => ({
          label: <NavLink to={child.key}>{child.label}</NavLink>,
          key: child.menu ? child.menu : child.key,
          icon: child.icon,
        })),
      };
    });
  }, [sidebar]);

  const [path, setPath] = useState(window.location.pathname);

  const onMenu = (e) => {
    setDMenu(e.keyPath[1]);
    localStorage.setItem("menu", e.keyPath[1]);
    setPath(e.key);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    const arr = window.location.pathname.split("/");
    setPath(arr[1]);
  }, []);

  return (
    <Sider
      className="sider fixed z-[99] w-[2600px] md:static md:w-auto"
      style={{
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
      }}
      collapsedWidth="0"
      trigger={null}
      width={isMobile ? "100%" : "260px"}
      collapsible
      collapsed={collapsed}
    >
      <div className="h-screen overflow-y-auto">
        <div
          className={`p-[15px] border-b border-white/30 flex items-center 
    ${isMobile ? "justify-between" : "justify-center"}`}
        >
          <div className="text-[#d3d3d3] text-[16px] text-center">{job}</div>
          {isMobile && (
            <Button
              onClick={() => setCollapsed(true)}
              icon={<CircleX size={25} />}
            />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="py-[10px]"
          onClick={onMenu}
          selectedKeys={[path]}
          defaultOpenKeys={[dmenu]}
          items={[
            {
              label: <NavLink to={`/home`}>Asosiy</NavLink>,
              key: "home",
              icon: <Home size={25} />,
            },
            ...items,
            {
              label: (
                <NavLink to={`/`} onClick={logout}>
                  Chiqish
                </NavLink>
              ),
              key: "4",
              icon: <LogOut size={25} />,
            },
          ]}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
