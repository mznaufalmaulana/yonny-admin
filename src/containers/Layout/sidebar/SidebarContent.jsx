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
          route="/home"
          onClick={handleHideSidebar}
        />
        <SidebarCategory title="Master" icon="database">
          <SidebarLink
            title="Category"
            route="/master/product"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Type"
            route="/master/type"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Region"
            route="/master/region"
            onClick={handleHideSidebar}
          />
          {/* <SidebarLink
            title="User"
            route="/master/user"
            onClick={handleHideSidebar}
          /> */}
        </SidebarCategory>
        <SidebarLink
          title="Product"
          icon="store"
          route="/product/list"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Project"
          icon="cog"
          route="/project/list"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Promo"
          icon="tag"
          route="/promo/list"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Contact"
          icon="phone-handset"
          route="/contact"
          onClick={handleHideSidebar}
        />
        <SidebarLink
          title="Social Media"
          icon="laptop-phone"
          route="/social-media"
          onClick={handleHideSidebar}
        />
        <SidebarCategory title="Email" icon="inbox">
          <SidebarLink
            title="Subscriber"
            route="/email/list"
            onClick={handleHideSidebar}
          />
          <SidebarLink
            title="Email Chat"
            route="/email/chat/list"
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
