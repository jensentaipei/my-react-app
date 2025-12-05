import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-none">
          <div className="drawer z-50">
            <input
              id="my-drawer"
              type="checkbox"
              className="drawer-toggle"
              checked={isOpen}
              onChange={() => setIsOpen(!isOpen)}
            />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="drawer-button">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />{" "}
                  </svg>
                </div>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <Link to="/TodoList" onClick={() => setIsOpen(false)}>
                    待辦事項
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            My App
          </Link>
        </div>
        <div className="flex-none">
          <a className="btn">Button</a>
        </div>
      </div>
      <div className="flex-1">
        <div className="p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
