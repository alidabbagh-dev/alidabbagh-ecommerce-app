"use client";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BiSearch } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import SearchModal from "../modals/SearchModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { searchBtnToggle } from "@/redux/slices/searchSlice";
import { setCartProducts } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartProducts = useAppSelector((state) => state.cartSlice.products);

  const [showSnack, setShowSnack] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const cartProductsFromLS = localStorage.getItem("cartProducts");
    if (cartProductsFromLS != null) {
      dispatch(setCartProducts(JSON.parse(cartProductsFromLS)));
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "auth=false; path=/;";
    
    setShowSnack(true);

    setTimeout(() => {
      setShowSnack(false);
      router.push("/login");
    }, 1000);
  };

  return (
    <>
      <nav className="navbar text-gray-900 bg-white flex-col w-full border-b border-gray-200">
        {/* لوگو */}
        <div className="flex justify-between items-center px-4 py-2 w-full">
          <Link
            href="/"
            className="gap-1 flex items-center !h-8 min-h-8 px-2 hover:bg-gray-100 rounded-md"
          >
            <SiHomeassistantcommunitystore size={20} />
            <h3 className="text-xl font-semibold uppercase">Store</h3>
          </Link>

          {/* دکمه منوی موبایل */}
          <button
            className="sm:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* لینک‌ها و آیکون‌ها */}
        <div
          className={`w-full flex-col sm:flex-row sm:flex justify-between items-center px-4 transition-all duration-300 ${
            menuOpen ? "flex" : "hidden sm:flex"
          }`}
        >
          {/* جستجو */}
          <div className="flex items-center gap-2 my-2 sm:my-0">
            <button onClick={() => dispatch(searchBtnToggle())} className="main-btn">
              <BiSearch />
            </button>
            <SearchModal />
          </div>

          {/* لینک‌ها */}
          <ul className="flex flex-col sm:flex-row justify-center items-center gap-4 my-2 sm:my-0">
            <NavLink link="products" />
            <NavLink link="categories" />
            <NavLink link="login" />
            <NavLink link="register" />
          </ul>

          {/* سبد خرید و لاگ‌اوت */}
          <div className="flex items-center gap-3 my-2 sm:my-0">
            <Link href="/cart" className="main-btn relative">
              <span className="absolute w-4 h-4 top-0 right-0 flex justify-center items-center bg-blue-500 text-white font-semibold rounded-full">
                {cartProducts.length}
              </span>
              <BsCart size={22} />
            </Link>

            <button
              onClick={handleLogout}
              className="main-btn text-red-600 hover:text-red-800"
              title="Logout"
            >
              <FiLogOut size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- اسنک‌بار اختصاصی --- */}
      {showSnack && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade">
          You Logged out successfully
        </div>
      )}

      {/* Tailwind animation */}
      <style jsx>{`
        @keyframes fade {
          0% {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade {
          animation: fade 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
