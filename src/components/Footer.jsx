import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGamepad,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const footerGroups = [
  {
    title: "المتجر",
    links: [
      { to: "/games", label: "جميع الألعاب" },
      { to: "/best-sellers", label: "الأكثر مبيعًا" },
      { to: "/consoles", label: "أجهزة الألعاب" },
      { to: "/accessories", label: "الإكسسوارات" },
    ],
  },
  {
    title: "المساعدة والدعم",
    links: [
      { to: "/help", label: "مركز المساعدة" },
      { to: "/contact", label: "تواصل معنا" },
      { to: "/cart", label: "سلة المشتريات" },
    ],
  },
  {
    title: "روابط مهمة",
    links: [
      { to: "/about", label: "عن Gamer’s Nest" },
      { to: "/privacy", label: "سياسة الخصوصية" },
      { to: "/terms", label: "الشروط والأحكام" },
    ],
  },
];

const socialLinks = [
  { href: "https://www.facebook.com/mezowkoky002", label: "Facebook", Icon: FaFacebook },
  { href: "https://twitter.com", label: "Twitter", Icon: FaTwitter },
  { href: "https://www.instagram.com/moaaz.h7x", label: "Instagram", Icon: FaInstagram },
  { href: "https://youtube.com", label: "YouTube", Icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="mt-16 border-t border-[#26304A] bg-[#0A0E18] text-[#DFe2F1]"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_2fr] lg:px-8">
        <div className="flex flex-col items-start gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#7C3AED] text-xl text-white">
              <FaGamepad />
            </span>
            <span className="font-[Space_Grotesk] text-lg font-bold">
              GAMER&apos;S <span className="text-[#D2BBFF]">NEST</span>
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-7 text-[#AAB2C5]">
            وجهتك لعالم الألعاب. اكتشف أحدث الإصدارات والإكسسوارات، واستعد
            لمغامرتك القادمة.
          </p>
          <div className="flex gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-[#26304A] bg-[#151B2B] text-[#AAB2C5] transition hover:border-[#7C3AED] hover:text-[#D2BBFF]"
              >
                {createElement(Icon)}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerGroups.map(({ title, links }) => (
            <div key={title}>
              <h2 className="mb-4 text-sm font-bold text-white">{title}</h2>
              <ul className="space-y-3">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-[#AAB2C5] transition hover:text-[#D2BBFF]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#26304A] px-4 py-5 text-center text-xs text-[#858DA1]">
        © {new Date().getFullYear()} Gamer’s Nest. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
