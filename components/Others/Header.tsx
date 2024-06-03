import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
  faUser,
  faSignOutAlt,
  faChevronDown,
  faShoppingCart,
  faWallet,
  faHeadset,
  faMoneyBillTransfer,
  faLock,
  faHiking,
} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  const [admin, setAdmin] = useState({
    logo: "https://i.ibb.co/jfw4Gt4/SRBDTOPUP-2-removebg-preview.png",
    whatsapp: "",
    show_withdraw: "",
    show_admin_link: "",
  });

  const [showSearch, setShowSearch] = useState(false);
  const [openProfileOpt, setOpenProfileOpt] = useState(false);

  const searchToggle = () => {
    setShowSearch(!showSearch);
  };

  const logoutHandler = () => {
    // Handle logout logic
  };

  return (
    <header className="h-[90px] border shadow fixed top-0 inset-x-0 bg-white mx-auto z-50">
      <div className="container relative flex items-center justify-between h-full">
        <Link href="/" className="flex items-center h-full">
          <img className="h-[25px] sm:h-[50px]" src={admin.logo} alt="Logo" />
        </Link>

        <div
          className={`hidden ${
            showSearch ? "scale-y-100" : "scale-y-0"
          } search_bar w-80 sm:w-[500px] 2xl:w-[600px] transition-transform lg:scale-y-100 absolute lg:relative left-5 sm:left-0 top-[72px] lg:top-0 items-center justify-center h-12 transform origin-top`}
        >
          <input
            type="search"
            placeholder="Search..."
            className="w-full h-full px-3 border-2 rounded border-green-primary text-green-primary focus:ring focus:border-transparent"
          />
          <button className="absolute inset-y-0 right-0 h-full px-6 my-auto text-sm text-white bg-blue-600 rounded-r lg:bg-green-primary focus:ring-2">
            Search
          </button>
        </div>

        <div className="flex items-center justify-center gap-x-3 sm:gap-x-4">
          <button
            onClick={searchToggle}
            className="items-center justify-center hidden w-8 h-8 text-sm font-medium transition-all bg-transparent border rounded-full lg:hidden border-dark-primary text-dark-primary hover:border-transparent hover:bg-dark-primary hover:text-white sm:w-10 sm:h-10 focus:ring-2 focus:border-transparent focus:ring-dark-primary md:flex"
          >
            {showSearch ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faSearch} />
            )}
          </button>

          <div className="relative z-50 w-fit">
            <button
              onClick={() => setOpenProfileOpt((prev) => !prev)}
              onBlur={() =>
                setTimeout(() => {
                  setOpenProfileOpt(false);
                }, 500)
              }
              type="button"
              className={`w-full py-2 px-3 rounded bg-gray-100 shadow border flex items-center justify-center gap-x-3`}
            >
              <span> Sagar </span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
              />
              <FontAwesomeIcon
                className={`text-sm text-gray-500 transition-all transform ${
                  openProfileOpt ? "rotate-180" : "rotate-0"
                }`}
                icon={faChevronDown}
              />
            </button>

            <div
              className={`absolute w-full bg-white rounded shadow top-full right-0 transition-all origin-top transform ${
                openProfileOpt ? "scale-y-100" : "scale-y-0"
              }`}
            >
              <Link
                href="/profile"
                className="flex items-center w-full p-3 gap-x-2 hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  className="text-base text-gray-500"
                  icon={faUser}
                />
                <span className="text-sm font-medium">Profile</span>
              </Link>
              <Link
                href="/wallet"
                className="flex items-center w-full p-3 gap-x-2 hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  className="text-base text-gray-500"
                  icon={faWallet}
                />
                <span className="text-sm font-medium">My Wallet</span>
              </Link>
              {admin.show_withdraw.toLowerCase() === "yes" && (
                <Link
                  href="/withdraw"
                  className="flex items-center w-full p-3 gap-x-2 hover:bg-gray-100"
                >
                  <FontAwesomeIcon
                    className="text-base text-gray-500"
                    icon={faMoneyBillTransfer}
                  />
                  <span className="text-sm font-medium">My Withdraw</span>
                </Link>
              )}
              <Link
                href="/orders"
                className="flex items-center w-full p-3 gap-x-2 hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  className="text-base text-gray-500"
                  icon={faShoppingCart}
                />
                <span className="text-sm font-medium">My Orders</span>
              </Link>
              <Link
                href="/security"
                className="flex items-center w-full p-3 gap-x-2 hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  className="text-base text-gray-500"
                  icon={faLock}
                />
                <span className="text-sm font-medium">Security</span>
              </Link>
              <a
                href={`https://wa.me/${admin.whatsapp}`}
                className="flex items-center w-full p-3 gap-x-2 hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  className="text-base text-gray-500"
                  icon={faHeadset}
                />
                <span className="text-sm font-medium">Support</span>
              </a>

              <a
                target="_blank"
                href="https://admin.srbdtopup.com/"
                className="flex items-center w-full p-3 gap-x-2 hover:bg-gray-100"
                rel="noopener"
              >
                <FontAwesomeIcon
                  className="text-base text-gray-500"
                  icon={faHiking}
                />
                <span className="text-sm font-medium">Admin Panel</span>
              </a>

              <button
                onClick={logoutHandler}
                className="flex items-center w-full p-3 gap-x-2 hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  className="text-base text-gray-500"
                  icon={faSignOutAlt}
                />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
