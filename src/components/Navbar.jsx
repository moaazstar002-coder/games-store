import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHeart,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/games", label: "الألعاب" },
  { to: "/best-sellers", label: "الأكثر مبيعًا" },
  { to: "/consoles", label: "أجهزة الألعاب" },
  { to: "/accessories", label: "الإكسسوارات" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistQuantity = useSelector((state) => state.wishlist.items.length);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;

    navigate(`/games?search=${encodeURIComponent(query)}`);
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      dir="rtl"
      className="fixed inset-x-0 top-0 z-50 border-b border-[#26304A]/80 bg-[#151B2B]/95 text-[#F1F5F9] shadow-[0_1px_8px_rgba(0,0,0,0.5)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
          aria-label="Gamer's Nest - الرئيسية"
        >
          <img
            src="/gamers_nest.svg"
            alt=""
            className="h-10 w-10 object-contain"
          />
          <span className="hidden whitespace-nowrap font-[Space_Grotesk] text-sm font-bold sm:inline">
            GAMER&apos;S <span className="text-[#D2BBFF]">NEST</span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-2 py-2 text-xs font-semibold transition 2xl:px-3 2xl:text-sm ${
                  isActive
                    ? "bg-[#7C3AED] text-white shadow-[0_0_20px_-8px_rgba(124,58,237,0.8)]"
                    : "text-[#AEB6C9] hover:bg-[#1E263C] hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <SearchBar
          search={search}
          setSearch={setSearch}
          onSubmit={handleSearch}
          showButton={false}
          className="hidden w-56 shrink-0 px-3 py-2 lg:flex 2xl:w-72"
        />

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/WishList"
            onClick={closeMenu}
            aria-label={`المفضلة${wishlistQuantity ? `، ${wishlistQuantity} عناصر` : ""}`}
            className="relative grid h-10 w-10 place-items-center rounded-lg border border-[#26304A] bg-[#1C1F2A] text-[#D2BBFF] transition hover:border-[#7C3AED] hover:bg-[#1E263C]"
          >
            <FaHeart />
            {wishlistQuantity > 0 && (
              <span className="absolute -left-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#7C3AED] px-1 text-[10px] font-bold text-white">
                {wishlistQuantity}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            onClick={closeMenu}
            aria-label={`سلة المشتريات${cartQuantity ? `، ${cartQuantity} عناصر` : ""}`}
            className="relative grid h-10 w-10 place-items-center rounded-lg border border-[#26304A] bg-[#1C1F2A] text-[#D2BBFF] transition hover:border-[#7C3AED] hover:bg-[#1E263C]"
          >
            <FaShoppingCart />
            {cartQuantity > 0 && (
              <span className="absolute -left-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#FF4D6D] px-1 text-[10px] font-bold text-white">
                {cartQuantity}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isOpen}
            className="grid h-10 w-10 place-items-center rounded-lg border border-[#26304A] bg-[#1C1F2A] text-lg text-white lg:hidden"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#26304A] bg-[#151B2B] px-4 pb-5 pt-4 lg:hidden">
          <SearchBar
            search={search}
            setSearch={setSearch}
            onSubmit={handleSearch}
            showButton={false}
            className="mb-3 px-3 py-2"
          />
          <nav className="grid grid-cols-2 gap-2">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className="rounded-lg bg-[#1C1F2A] px-3 py-3 text-sm text-[#D1D5E2] transition hover:bg-[#262A35] hover:text-white"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/about"
              onClick={closeMenu}
              className="rounded-lg bg-[#1C1F2A] px-3 py-3 text-sm text-[#D1D5E2] transition hover:bg-[#262A35] hover:text-white"
            >
              عن المتجر
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
