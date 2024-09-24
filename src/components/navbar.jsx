import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = ({ products }) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);  // Navigate to search results page
      console.log(searchQuery)
    }
  };

  const searchBoxVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        className="navbar bg-white shadow-md border-b border-gray-300 transition duration-300"
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        variants={navbarVariants}
        transition={{ duration: 0.3 }}
      >
        <Link to="/">
          <FaShopify size={50} />
        </Link>

        {/* Search Box with hide and show transitions */}
        <motion.form
          className="absolute bg-white w-full left-0 top-full mt-0.5 border-grey px-[5vw] border-b max-w-3xl md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto"
          initial="hidden"
          animate="visible"
          variants={searchBoxVariants}
          transition={{ duration: 0.3 }}
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}  // Update state on input change
            className="w-full bg-grey py-2 px-8 pr-12 rounded-full placeholder-gray-400 text-lg md:pl-12"
          />
          <i className="fi fi-rr-search absolute text-xl text-dark-grey right-[10%] top-1/2 -translate-y-1/2 text-gray-400"></i>
        </motion.form>

        {/* Cart icon with hover transition */}
        <div className="flex justify-end">
          <Link to="/cart" className="w-20 h-20 flex items-center justify-center">
            <motion.i
              className="fi fi-ss-shopping-cart text-2xl"
              whileHover={{ scale: 1.3, color: '#4A90E2' }}
              transition={{ duration: 0.3 }}
            ></motion.i>
          </Link>
        </div>
      </motion.nav>
      <Outlet />
    </>
  );
};

export default Navbar;
