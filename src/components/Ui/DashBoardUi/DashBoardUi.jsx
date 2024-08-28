"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { HiOutlineMenu, HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { FaUser, FaUsers } from "react-icons/fa";
import { PiUsersBold } from "react-icons/pi";
import { FaLocationArrow } from "react-icons/fa6";
import SidebarProfile from "../SidebarProfile/SidebarProfile";
import { UserNav } from "@/components/Table/TableComponents/UserNav";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { TooltipProvider } from "../tooltip";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const DashBoardUi = ({ children }) => {
  const [isPanelOneVisible, setIsPanelOneVisible] = useState(true);
  const [sizes, setSizes] = useState({
    horizontalPanelSize: Cookies.get('horizontalPanelSize') || 4,
    verticalPanelOneSize: Cookies.get('verticalPanelOneSize') || 10,
    verticalPanelTwoSize: Cookies.get('verticalPanelTwoSize') || 70,
  });
  const pathname = usePathname();
  const img = "/image/drug-international-logo.png";
  const logo = "/image/header-logo.png";

  const horizontalPanelRef = useRef(null);

  const handleResize = useCallback((panel, newSize) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [panel]: newSize,
    }));
    Cookies.set(`${panel}-size`, newSize);
  }, []);

  useEffect(() => {
    // Reset sizes if necessary when the panel visibility changes
    if (!isPanelOneVisible) {
      setSizes((prevSizes) => ({
        ...prevSizes,
        horizontalPanelSize: 0, // Set to 0 or a small value when hidden
      }));
    }
  }, [isPanelOneVisible]);

  return (
    <TooltipProvider>
      <div style={{ height: "100vh", width: "100vw" }}>
        {(pathname === "/dashboard/map" || pathname === "/dashboard/single-employee/map" || pathname === "/dashboard/single-employee/roadmap") && (
          <button
            onClick={() => setIsPanelOneVisible(!isPanelOneVisible)}
            className="fixed top-0 right-0 m-4 z-50 bg-gray-200 p-2 rounded"
          >
            {!isPanelOneVisible ? (
              <HiOutlineMenu size={32} />
            ) : (
              <HiOutlineMenuAlt2 size={32} />
            )}
          </button>
        )}

        <PanelGroup direction="vertical" style={{ height: "100%", width: "100%" }}>
          {(pathname !== "/dashboard/map" && pathname !== "/dashboard/single-employee/map" && pathname !== "/dashboard/single-employee/roadmap") && (
            <Panel
              defaultSize={sizes.verticalPanelOneSize}
              minSize={4}
              maxSize={10}
              className=" border-gray-300"
            >
              <div className="flex h-full items-center justify-between bg-gray-200 px-5">
                <div className="flex h-full items-center justify-center">
                  <button
                    onClick={() => setIsPanelOneVisible(!isPanelOneVisible)}
                    className=""
                  >
                    {!isPanelOneVisible ? (
                      <HiOutlineMenu size={32} />
                    ) : (
                      <HiOutlineMenuAlt2 size={32} />
                    )}
                  </button>
                </div>
                <div>
                  <SidebarProfile logo={logo} />
                </div>
                <UserNav img={img} />
              </div>
            </Panel>
          )}

          <PanelResizeHandle className="bg-gray-200 border-b border-gray-300" />

          <Panel
            defaultSize={sizes.verticalPanelTwoSize}
            minSize={10}
            className="flex flex-col"
          >
            <PanelGroup direction="horizontal" style={{ height: "100%" }}>
              {isPanelOneVisible && (
                <Panel
                  ref={horizontalPanelRef}
                  defaultSize={sizes.horizontalPanelSize}
                  minSize={5}
                  className="border-r border-gray-300"
                  onResize={(size) => {
                    handleResize("horizontalPanelSize", size);
                  }}
                >
                  <div className="flex h-full bg-gray-300">
                    <SidebarComponent
                      width={sizes.horizontalPanelSize}
                      links={[
                        { title: "Dashboard", url: "/", icon: MdDashboard },
                        {
                          title: "User",
                          icon: FaUser,
                          subLinks: [
                            { title: "Marketing", url: "/dashboard/marketing", icon: FaUsers },
                            { title: "MRC & PA", url: "/mpcpa", icon: PiUsersBold },
                          ],
                        },
                        { title: "Reports", url: "/", icon: BiSolidReport },
                        { title: "Tracking Info", url: "/dashboard/map", icon: FaLocationArrow },
                      ]}
                    />
                  </div>
                </Panel>
              )}

              <PanelResizeHandle className="bg-gray-200 border-r border-gray-300" />

              <Panel defaultSize={95} minSize={85} className="flex-1">
                <div
                  className={`flex flex-col h-full ${
                    pathname !== "/dashboard/map" && pathname !== "/dashboard/single-employee/map" && pathname !== "/dashboard/single-employee/roadmap" ? "overflow-y-auto" : ""
                  }`}
                >
                  {children}
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </TooltipProvider>
  );
};

export default DashBoardUi;
