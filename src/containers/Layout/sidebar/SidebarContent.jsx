import React from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";

const SidebarContent = ({ onClick, changeToDark, changeToLight }) => {
  const handleHideSidebar = () => {
    onClick();
  };

  return (
    <div className="sidebar__content">
      <ul className="sidebar__block">
        <SidebarLink
          title="Dashboard"
          icon="home"
          route="/log_in"
          onClick={handleHideSidebar}
        />
        <SidebarCategory title="Master" icon="database">
          <SidebarLink
            title="Master Product"
            route="/pages/one"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Master Type"
            route="/pages/two"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Master User"
            route="/pages/three"
            onClick={handleHideSidebar}
          />
        </SidebarCategory>
        <SidebarLink
          title="Product"
          icon="store"
          route="/log_in"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Project"
          icon="cog"
          route="/log_in"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Promo"
          icon="tag"
          route="/log_in"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Contact"
          icon="phone-handset"
          route="/log_in"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Social Media"
          icon="laptop-phone"
          route="/log_in"
          onClick={handleHideSidebar}
        />
        <SidebarCategory title="Email" icon="inbox">
          <SidebarLink
            title="Subscriber"
            route="/pages/one"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Email Chat"
            route="/pages/two"
            onClick={handleHideSidebar}
          />
        </SidebarCategory>
      </ul>
      {/* <ul className="sidebar__block">
        <SidebarLink
          title="Log In"
          icon="exit"
          route="/log_in"
          onClick={handleHideSidebar}
        />
        <SidebarCategory title="Layout" icon="layers">
          <button
            type="button"
            className="sidebar__link"
            onClick={changeToLight}
          >
            <p className="sidebar__link-title">Light Theme</p>
          </button>
          <button
            type="button"
            className="sidebar__link"
            onClick={changeToDark}
          >
            <p className="sidebar__link-title">Dark Theme</p>
          </button>
        </SidebarCategory>
      </ul>
      <ul className="sidebar__block">
        <SidebarCategory title="Example Pages" icon="diamond">
          <SidebarLink
            title="Page one"
            route="/pages/one"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Page two"
            route="/pages/two"
            onClick={handleHideSidebar}
          />
        </SidebarCategory>
      </ul> */}
    </div>
  );
};

SidebarContent.propTypes = {
  changeToDark: PropTypes.func.isRequired,
  changeToLight: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SidebarContent;
