import { createElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaBolt,
  FaCreditCard,
  FaGamepad,
  FaHeadset,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import { toast } from "sonner";
import FeaturedGames from "../components/FeaturedGames";
import GenreFilter from "../components/GenreFilter";
import HeroSlider from "../components/HeroSlider";
import PageTransition from "../components/PageTransition";
import { useGames } from "../hooks/useGames";
import { useGenres } from "../hooks/useGenres";

const platforms = [
  { title: "Nintendo Switch", subtitle: "ألعاب ومستلزمات Switch", to: "/games", Icon: FaGamepad },
  { title: "Xbox Series X|S", subtitle: "تجارب Xbox المفضلة", to: "/games", Icon: FaGamepad },
  { title: "PlayStation 5", subtitle: "ألعاب PS5 وإكسسواراته", to: "/games", Icon: FaGamepad },
  { title: "PC Gaming", subtitle: "Steam، Epic والمزيد", to: "/games", Icon: FaGamepad },
];

const gear = [
  {
    title: "أذرع تحكم احترافية",
    description: "تحكم أدق وتجربة لعب أكثر استجابة.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9iyQ-ZVUZ8tt11HVDbnfpCuCA1ql5pCYypKYMetQaR9Xix_PlKrfwnBoaSEIpgRnzwY5rDWDkEyCEI7kYI3jbOKD9m1AU3X4uSZ8_U0aAXAI10xhBnyPGYAF1B2CyFKTZ8HDwvlUPNhleA3-EmSxMUPyeQOUIay17vjNaxY2vL2M3p2Njo4DA1QYtbbWomWrjMCb9IfQrSXcTqh8E8hteNackORCtIhBOOhsuJjeS",
    className: "md:row-span-2 md:min-h-[360px]",
  },
  {
    title: "سماعات ألعاب محيطية",
    description: "اسمع كل تفصيلة في عالم اللعبة.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaz_GVUGoug84V13XQANh4wU1hPVA2A7P6pZf6mj0ka8FbrfoEe7O48Za6ENRzAhfIisjtYOhxHYhGr0MNF8IGhlwC8Ox2PhuFbQJH2YQTloE1H81xEV_FdaG0n5TSwOxOSq6Yg9TVkCHJPWZf4M7lwUMNTKFfrDzaij6SSifGwfkheMN4b7a3sCfaohFKWlJEUjEPWXRkCXH0gCuf5gO_nOdbt1ti-HG78QbMN-Zn",
    className: "",
  },
  {
    title: "شاشات OLED و 240Hz",
    description: "سرعة ووضوح لكل لحظة.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBepByCwL1-LQFFbsz1QVRCFcIVTXnIzgmXguiRTfFg8kCNtZUF1SnU1N9zLdTvCOAjwIwA0MgQzN4Q6a7IWfitIz8RoSI-e-jwsg9yf3lsgW0Ad4L7YQYap4XtBybo56XEkS4feWd5dt7OCVL72Z8aEAlmFanlfmtU0fQgwZl-pIKvqQtmjPnKqicLpKFrcGDHlyeRRqsoo9Al5HAGrXyaIE0BsQCqTMJMNhnji1cL",
    className: "",
  },
];

const benefits = [
  {
    title: "تسليم فوري للأكواد",
    description: "احصل على كود لعبتك مباشرة بعد إتمام الطلب.",
    Icon: FaBolt,
    tone: "text-[#D2BBFF] bg-[#7C3AED]/15",
  },
  {
    title: "ضمان المفاتيح 100%",
    description: "مفاتيح رقمية موثوقة وتجربة شراء واضحة.",
    Icon: FaShieldAlt,
    tone: "text-[#4AE176] bg-[#22C55E]/15",
  },
  {
    title: "دعم فني 24/7",
    description: "فريقنا جاهز لمساعدتك في أي وقت.",
    Icon: FaHeadset,
    tone: "text-[#FFB2B8] bg-[#FF4D6D]/15",
  },
  {
    title: "طرق دفع محلية آمنة",
    description: "خيارات دفع متعددة لتجربة أسهل.",
    Icon: FaCreditCard,
    tone: "text-[#D2BBFF] bg-[#7C3AED]/15",
  },
];

function FlashDealTimer() {
  const [secondsLeft, setSecondsLeft] = useState(8 * 60 * 60 + 42 * 60 + 8);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setSecondsLeft((seconds) => (seconds > 0 ? seconds - 1 : 24 * 60 * 60));
    }, 1000);
    return () => window.clearInterval(timerId);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div
      dir="ltr"
      aria-label={`ينتهي العرض خلال ${hours}:${minutes}:${seconds}`}
      className="inline-flex items-center gap-2 rounded-lg border border-[#FF4D6D]/25 bg-[#FF4D6D]/10 px-3 py-2 font-[Space_Grotesk] text-sm font-bold tabular-nums text-[#FF8A9B]"
    >
      <FaClock aria-hidden="true" />
      {hours}:{minutes}:{seconds}
    </div>
  );
}

function HardwareSection() {
  return (
    <section
      dir="rtl"
      className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mb-5">
        <p className="mb-2 text-xs font-bold text-[#D2BBFF]">جهّز محطة اللعب</p>
        <h2 className="mb-1 text-2xl font-bold text-white normal-case sm:text-3xl">
          تصنيفات الأجهزة والإكسسوارات
        </h2>
        <p className="text-sm text-[#AAB2C5]">
          كل ما تحتاجه لتجربة لعب متكاملة في مكان واحد.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {gear.map((item) => (
          <Link
            key={item.title}
            to="/accessories"
            className={`group relative flex min-h-44 overflow-hidden rounded-xl border border-[#26304A] bg-[#151B2B] ${item.className}`}
          >
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0A0E18]/95 via-[#0A0E18]/60 to-transparent" />
            <div className="relative mt-auto max-w-md p-5 sm:p-6">
              <span className="mb-2 inline-flex rounded bg-[#1E263C]/80 px-2 py-1 text-[10px] font-bold text-[#D2BBFF]">
                إكسسوارات اللاعبين
              </span>
              <h3 className="mb-1 text-lg font-bold text-white normal-case">
                {item.title}
              </h3>
              <p className="mb-3 text-xs leading-5 text-[#D1D5E2]">
                {item.description}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#D2BBFF]">
                تسوّق الآن <FaArrowLeft aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [genre, setGenre] = useState("");
  const { data: genres = [], isLoading: genresLoading } = useGenres();
  const { data: games = [], isLoading: gamesLoading } = useGames({
    genre,
    page: 1,
    ordering: "-added",
  });

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    toast.info("الاشتراك في النشرة البريدية سيتوفر قريبًا.");
    event.currentTarget.reset();
  };

  return (
    <PageTransition>
      <main
        dir="rtl"
        className="home-page overflow-hidden bg-[#0F131D] pb-2 text-[#F1F5F9]"
      >
        <HeroSlider />

        <nav
          aria-label="تصفح حسب المنصة"
          className="mx-auto grid max-w-[1440px] grid-cols-2 gap-2 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8"
        >
          {platforms.map(({ title, subtitle, to, Icon }) => (
            <Link
              key={title}
              to={to}
              className="group flex items-center gap-3 rounded-xl border border-[#26304A] bg-[#151B2B] p-3 transition hover:border-[#7C3AED] hover:bg-[#1C1F2A] sm:p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#1E263C] text-[#D2BBFF] transition group-hover:bg-[#7C3AED] group-hover:text-white">
                {createElement(Icon, { "aria-hidden": true })}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-bold text-white sm:text-sm">
                  {title}
                </span>
                <span className="mt-1 block truncate text-[10px] text-[#AAB2C5] sm:text-xs">
                  {subtitle}
                </span>
              </span>
            </Link>
          ))}
        </nav>

        <FeaturedGames
          eyebrow="عروض لفترة محدودة"
          title="العروض والخصومات الخاطفة"
          description="اغتنم الفرصة واحصل على ألعابك المفضلة بسعر مميز."
          games={games.slice(0, 4)}
          loading={gamesLoading}
          discounts={[70, 45, 60, 35]}
          showAll={false}
          headerAccessory={<FlashDealTimer />}
        />

        <FeaturedGames
          eyebrow="الأكثر طلبًا من اللاعبين"
          title="الأكثر مبيعًا هذا الأسبوع"
          description="الألعاب التي اختارها مجتمع Gamer’s Nest هذا الأسبوع."
          games={games.slice(4, 8)}
          loading={gamesLoading}
          ranking
          filters={
            <GenreFilter
              genres={genres}
              loading={genresLoading}
              value={genre}
              onChange={setGenre}
            />
          }
        />

        <HardwareSection />

        <section
          dir="rtl"
          className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-bold text-[#D2BBFF]">تجربة لعب أفضل</p>
            <h2 className="mb-2 text-2xl font-bold text-white normal-case sm:text-3xl">
              لماذا يختار اللاعبون Gamer’s Nest؟
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-6 text-[#AAB2C5]">
              كل ما تحتاجه لتشتري وتلعب بثقة، من لحظة اختيار لعبتك وحتى بدء
              المغامرة.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ title, description, Icon, tone }) => (
              <article
                key={title}
                className="rounded-xl border border-[#26304A] bg-[#151B2B] p-5 text-right"
              >
                <span className={`mb-4 grid h-11 w-11 place-items-center rounded-lg ${tone}`}>
                  {createElement(Icon, { "aria-hidden": true })}
                </span>
                <h3 className="mb-2 text-base font-bold text-white normal-case">
                  {title}
                </h3>
                <p className="text-xs leading-6 text-[#AAB2C5]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          dir="rtl"
          className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="grid gap-6 rounded-2xl border border-[#26304A] bg-[#151B2B] p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:p-10">
            <div>
              <p className="mb-2 text-xs font-bold text-[#D2BBFF]">
                كن أول من يعرف
              </p>
              <h2 className="mb-3 text-2xl font-bold text-white normal-case sm:text-3xl">
                اشترك في النشرة واحصل على خصم 10% على أول طلب
              </h2>
              <p className="text-sm leading-6 text-[#AAB2C5]">
                تابع أحدث الإصدارات والعروض الخاصة مباشرة إلى بريدك الإلكتروني.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                البريد الإلكتروني
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="بريدك الإلكتروني"
                className="min-w-0 flex-1 rounded-lg border border-[#26304A] bg-[#0F131D] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#858DA1] focus:border-[#7C3AED]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8B5CF6]"
              >
                اشترك الآن <FaArrowLeft aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
