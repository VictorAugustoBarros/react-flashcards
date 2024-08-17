/** @format */

import styled from "@emotion/styled";
import React from "react";
import Logo from "@/images/logo.jpg";
import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsed: boolean;
  onCollapse: () => void;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
    transition: width 0.3s ease, opacity 0.3s ease;
  }
`;

const StyledLogo = styled.div<{ rtl?: boolean }>`
  width: 35px;
  min-width: 35px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  font-weight: 700;
  background-color: #009fdb;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  ${({ rtl }) =>
    rtl
      ? `
      margin-left: 10px;
      margin-right: 4px;
      `
      : `
      margin-right: 10px;
      margin-left: 4px;
      `}
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  collapsed,
  onCollapse,
  ...rest
}) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div
        className={`flex flex-row items-center ${
          collapsed ? "justify-center" : "gap-5"
        }`}
      >
        {/* <img src={Logo.src} className="h-5 w-5" /> */}

        <AlignLeft className="cursor-pointer" onClick={() => onCollapse()} />
        <span
          style={{
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: collapsed ? 0 : 1,
            transform: collapsed ? "translateX(-20px)" : "translateX(0)",
          }}
        >
          {!collapsed && "Flashcards"}
        </span>
      </div>
    </StyledSidebarHeader>
  );
};
