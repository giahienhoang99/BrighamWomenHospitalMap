import logoUrl from "/logo.png";
import { FaMapMarkedAlt, FaSignInAlt, FaDownload } from "react-icons/fa";
import { MdOutlineRoomService } from "react-icons/md";
import {
  Sidebar as FlowbiteSidebar,
  DarkThemeToggle,
  CustomFlowbiteTheme,
} from "flowbite-react";

const sidebarTheme: CustomFlowbiteTheme["sidebar"] = {
  root: {
    inner:
      "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800 flex flex-col",
  },
  logo: {
    img: "",
  },
  items: {
    base: "flex-1 flex flex-col justify-between",
  },
};

const SidebarNavigation = () => {
  return (
    <FlowbiteSidebar aria-label="Navigation sidebar" theme={sidebarTheme}>
      <FlowbiteSidebar.Logo href="/" img={logoUrl} imgAlt="Hospital logo" />
      <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
          <FlowbiteSidebar.Item href="/" icon={FaMapMarkedAlt}>
            Hospital Map
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item href="/services" icon={MdOutlineRoomService}>
            Request Services
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item href="/data/map" icon={FaDownload}>
            Import/Export Data
          </FlowbiteSidebar.Item>
        </FlowbiteSidebar.ItemGroup>
        <FlowbiteSidebar.ItemGroup>
          <FlowbiteSidebar.Item>
            <DarkThemeToggle />
            Switch Theme
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item href="/auth/sign-in" icon={FaSignInAlt}>
            Sign In
          </FlowbiteSidebar.Item>
        </FlowbiteSidebar.ItemGroup>
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
};

type ContentLayoutProps = {
  children: React.ReactNode;
};

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="h-screen flex overflow-hidden">
      <SidebarNavigation />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export { ContentLayout };