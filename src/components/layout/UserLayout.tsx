/** @format */

import "@/app/globals.css";
import NavBar from "../navbar/NavBar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full flex flex-row">
      <NavBar />
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
