/** @format */

"use client";

import { BookText, CirclePlus, House } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { SidebarHeader } from "./NavBarHeader/NavBarHeader";

const NavBar = () => {
  // Estado para verificar se o componente foi montado
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Verifica se o componente foi montado
      setMounted(true);
      const storedCollapsed = localStorage.getItem("navBarCollapsed");
      setCollapsed(storedCollapsed === "true");
    }
  }, []);

  const onCollapse = () => {
    setCollapsed(!collapsed);
    if (typeof window !== "undefined") {
      localStorage.setItem("navBarCollapsed", JSON.stringify(!collapsed));
    }
  };

  // Se não estiver montado, renderiza null (ou um placeholder)
  if (!mounted) return null;

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        direction: "ltr",
        transition: "all 0.3s ease",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        breakPoint="md"
        style={{
          transition: "width 0.3s ease",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <SidebarHeader
            style={{ marginBottom: "24px", marginTop: "16px" }}
            onCollapse={onCollapse}
            collapsed={collapsed}
          />
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu>
              <MenuItem
                component={<Link href="/" />}
                icon={<House className="h-5 w-5" />}
              >
                Dashboard
              </MenuItem>

              <MenuItem
                component={<Link href="/cards/create" />}
                icon={<CirclePlus className="h-5 w-5" />}
              >
                Create
              </MenuItem>

              <MenuItem
                component={<Link href="/decks" />}
                icon={<BookText className="h-5 w-5" />}
              >
                Decks
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default NavBar;
