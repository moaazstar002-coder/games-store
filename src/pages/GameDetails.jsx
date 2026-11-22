import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBolt,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaDesktop,
  FaExpand,
  FaFilm,
  FaGamepad,
  FaHeart,
  FaPlay,
  FaShoppingCart,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import { useGameDetails } from "../hooks/useGameDetails";
import { useGameMovies } from "../hooks/useGameMovies";
import { useWishList } from "../hooks/useWishList";
import { addItem, removeItem } from "../store/slices/CartSlice";
import PageTransition from "../components/PageTransition";
import GameDetailsSkeleton from "../components/GameDetailsSkeleton";
import GameReviews from "../components/GameReviews";
import GameRecommendations from "../components/GameRecommendations";

const tabs = [
  { id: "overview", label: "نظرة عامة وقصة اللعبة" },
  { id: "requirements", label: "متطلبات التشغيل" },
  { id: "extras", label: "المحتويات الإضافية" },
  { id: "reviews", label: "مراجعات اللاعبين" },
];

function stripTags(value = "") {
  return typeof value === "string" ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
}

function getGalleryMedia(details, movies = []) {
  const videos = movies
    .map((movie) => ({
      id: `video-${movie.id}`,
      type: "video",
      title: movie.name || "فيديو اللعبة",
      url: movie.data?.max || movie.data?.["480"] || movie.preview,
      poster: movie.preview,
    }))
    .filter((movie) => movie.url);
  const screenshots = (details.short_screenshots || [])
    .map((screenshot) => screenshot.image)
    .filter(Boolean);
  const images = [...new Set([
    details.background_image,
    details.background_image_additional,
    ...screenshots,
  ].filter(Boolean))].map((image) => ({
    id: `image-${image}`,
    type: "image",
    url: image,
    title: details.name,
  }));
  return [...images, ...videos];
}

function formatReleaseDate(released) {
  if (!released) return "غير محدد";
  const date = new Date(`${released}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? released
    : new Intl.DateTimeFormat("ar", { year: "numeric", month: "long", day: "numeric" }).format(date);
}

export default function GameDetails() {
  const { data: details, isLoading, isError } = useGameDetails();
  const { data: movies = [], isError: moviesError } = useGameMovies(details?.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishList();
  const [activeMediaId, setActiveMediaId] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const galleryMedia = useMemo(
    () => details ? getGalleryMedia(details, movies) : [],
    [details, movies]
  );

  useEffect(() => {
    if (!isPreviewOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsPreviewOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isPreviewOpen]);

  if (isLoading) {
    return (
      <PageTransition>
        <GameDetailsSkeleton />
      </PageTransition>
    );
  }

  if (isError || !details) {
    return (
      <PageTransition>
        <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6" dir="rtl">
          <h1 className="mb-3 text-2xl font-bold text-[#F1F5F9] normal-case sm:text-3xl">
            تعذر تحميل تفاصيل اللعبة
          </h1>
          <p className="mb-7 text-sm text-[#AAB2C5]">تحقق من اتصالك بالإنترنت ثم حاول مرة أخرى.</p>
          <button
            type="button"
            onClick={() => navigate("/games")}
            className="rounded-lg bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
          >
            تصفح الألعاب
          </button>
        </main>
      </PageTransition>
    );
  }

  const descriptionText = details.description_raw || stripTags(details.description);
  const description = showFullDescription
    ? descriptionText
    : descriptionText.length > 420
      ? `${descriptionText.slice(0, 417).trim()}...`
      : descriptionText;
  const genres = details.genres || [];
  const platformEntries = details.platforms?.length
    ? details.platforms
    : details.parent_platforms || [];
  const platforms = [...new Set(platformEntries
    .map((entry) => entry.platform?.name || entry.name)
    .filter(Boolean))];
  const requirements = (details.platforms || []).filter(
    ({ requirements: platformRequirements }) => platformRequirements?.minimum || platformRequirements?.recommended
  );
  const price = typeof details.price === "number" && Number.isFinite(details.price) ? details.price : 59.99;
  const isInCart = cartItems.some((item) => item.id === details.id);
  const isFavorite = isInWishlist(details.id);
  const currentMedia = galleryMedia.find((media) => media.id === activeMediaId)
    || galleryMedia.find((media) => media.type === "image")
    || galleryMedia[0];
  const videos = galleryMedia.filter((media) => media.type === "video");

  const addGameToCart = () => {
    dispatch(addItem({
      id: details.id,
      name: details.name,
      title: details.name,
      image: details.background_image,
      price,
      quantity: 1,
    }));
  };

  const handleBuyNow = () => {
    if (!isInCart) addGameToCart();
    navigate("/cart");
  };

  const handleCartToggle = () => {
    if (isInCart) {
      dispatch(removeItem(details.id));
    } else {
      addGameToCart();
    }
  };

  const handleWishlistToggle = () => {
    if (isFavorite) {
      removeFromWishlist(details.id);
    } else {
      addToWishlist({
        id: details.id,
        name: details.name,
        title: details.name,
        background_image: details.background_image,
        image: details.background_image,
        rating: details.rating,
        genres,
        released: details.released,
        description: details.description,
      });
    }
  };

  const changeImage = (direction) => {
    const images = galleryMedia.filter((media) => media.type === "image");
    const currentIndex = images.findIndex((media) => media.id === currentMedia?.id);
    const nextIndex = (currentIndex + direction + images.length) % images.length;
    if (images.length > 0) setActiveMediaId(images[nextIndex].id);
  };

  return (
    <PageTransition>
      <div className="bg-[#0F131D]">
      <main className="mx-auto max-w-[1440px] px-4 pb-16 pt-6 sm:px-6 lg:px-8" dir="rtl">
        <nav aria-label="مسار التنقل" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#AAB2C5]">
          <Link to="/" className="transition hover:text-white">الرئيسية</Link>
          <FaChevronLeft aria-hidden="true" className="text-[9px]" />
          <Link to="/games" className="transition hover:text-white">الألعاب</Link>
          {genres[0] && (
            <>
              <FaChevronLeft aria-hidden="true" className="text-[9px]" />
              <span>{genres[0].name}</span>
            </>
          )}
          <FaChevronLeft aria-hidden="true" className="text-[9px]" />
          <span className="max-w-48 truncate text-[#F1F5F9]">{details.name}</span>
        </nav>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(310px,0.75fr)]">
          <section aria-label="معرض صور اللعبة" className="min-w-0">
            <div className="group relative aspect-video overflow-hidden rounded-2xl border border-[#26304A] bg-[#0A0E18]">
              {currentMedia?.type === "video" ? (
                <video
                  key={currentMedia.id}
                  src={currentMedia.url}
                  poster={currentMedia.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  aria-label={currentMedia.title}
                  className="absolute inset-0 h-full w-full bg-black object-contain"
                />
              ) : currentMedia ? (
                <img
                  src={currentMedia.url}
                  alt={`لقطة من لعبة ${details.name}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#252039] to-[#0A0E18]">
                  <FaGamepad aria-hidden="true" className="text-6xl text-[#7C3AED]/70" />
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0E18]/70 via-transparent to-[#0A0E18]/20" />
              {details.metacritic && (
                <span className="absolute right-3 top-3 rounded-md bg-[#0F131D]/85 px-3 py-1.5 text-xs font-bold text-[#4AE176] backdrop-blur">
                  Metacritic {details.metacritic}
                </span>
              )}
              {currentMedia?.type === "image" && (
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  aria-label="عرض الصورة بحجم أكبر"
                  className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-[#0F131D]/70 text-white backdrop-blur transition hover:bg-[#7C3AED]"
                >
                  <FaExpand aria-hidden="true" />
                </button>
              )}
              {videos.length > 0 && currentMedia?.type === "image" && (
                <button
                  type="button"
                  onClick={() => setActiveMediaId(videos[0].id)}
                  aria-label={`تشغيل فيديو ${details.name}`}
                  className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#7C3AED]/90 text-xl text-white shadow-lg shadow-[#7C3AED]/30 transition hover:scale-110 hover:bg-[#8B5CF6]"
                >
                  <FaPlay aria-hidden="true" className="translate-x-0.5" />
                </button>
              )}
              {galleryMedia.filter((media) => media.type === "image").length > 1 && currentMedia?.type === "image" && (
                <>
                  <button
                    type="button"
                    onClick={() => changeImage(-1)}
                    aria-label="الصورة السابقة"
                    className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#0F131D]/75 text-white transition hover:bg-[#7C3AED]"
                  >
                    <FaChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeImage(1)}
                    aria-label="الصورة التالية"
                    className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#0F131D]/75 text-white transition hover:bg-[#7C3AED]"
                  >
                    <FaChevronRight aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {galleryMedia.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {galleryMedia.map((media) => (
                  <button
                    key={media.id}
                    type="button"
                    onClick={() => {
                      setActiveMediaId(media.id);
                      setIsPreviewOpen(false);
                    }}
                    aria-label={media.type === "video" ? `تشغيل ${media.title}` : `عرض ${media.title}`}
                    aria-pressed={currentMedia?.id === media.id}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-32 ${
                      currentMedia?.id === media.id ? "border-[#7C3AED]" : "border-[#26304A] opacity-70 hover:opacity-100"
                    }`}
                  >
                    {media.poster || media.type === "image" ? (
                      <img src={media.poster || media.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <span className="grid h-full w-full place-items-center bg-[#1C1F2A]">
                        <FaFilm aria-hidden="true" className="text-[#D2BBFF]" />
                      </span>
                    )}
                    {media.type === "video" && (
                      <span className="absolute inset-0 grid place-items-center bg-black/25 text-white">
                        <FaPlay aria-hidden="true" className="text-xs" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
            {moviesError && (
              <p role="status" className="mt-2 text-xs text-[#AAB2C5]">
                تعذر تحميل فيديوهات اللعبة حاليًا.
              </p>
            )}
          </section>

          <aside className="rounded-2xl border border-[#26304A] bg-[#151B2B] p-4 shadow-xl shadow-black/10 sm:p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="mb-2 text-[11px] font-semibold text-[#AAB2C5]">تفاصيل اللعبة</p>
                <h1 className="mb-2 text-2xl font-bold leading-tight text-[#F1F5F9] normal-case sm:text-3xl">
                  {details.name}
                </h1>
                <p className="text-xs text-[#AAB2C5]">
                  {genres.slice(0, 3).map((genre) => genre.name).join("، ") || "لعبة فيديو"}
                </p>
              </div>
              <button
                type="button"
                onClick={handleWishlistToggle}
                aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                aria-pressed={isFavorite}
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border transition ${
                  isFavorite
                    ? "border-[#FF4D6D]/50 bg-[#FF4D6D]/10 text-[#FF4D6D]"
                    : "border-[#26304A] bg-[#0F131D] text-[#AAB2C5] hover:border-[#FF4D6D] hover:text-[#FF4D6D]"
                }`}
              >
                <FaHeart aria-hidden="true" />
              </button>
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#26304A] pb-4 text-xs">
              <span className="inline-flex items-center gap-1.5 text-[#FBBF24]">
                <FaStar aria-hidden="true" />
                <strong>{details.rating ? Number(details.rating).toFixed(1) : "—"}</strong>
                <span className="text-[#AAB2C5]">({details.ratings_count || 0})</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#AAB2C5]">
                <FaCalendarAlt aria-hidden="true" />
                {formatReleaseDate(details.released)}
              </span>
            </div>

            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="mb-0 text-sm font-semibold text-[#F1F5F9] normal-case">المنصات المدعومة</h2>
                <span className="text-[10px] text-[#858DA1]">حسب بيانات الناشر</span>
              </div>
              {platforms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#26304A] bg-[#0F131D] px-3 py-2 text-xs text-[#D5D9E5]"
                    >
                      {platform.toLowerCase().includes("pc") ? <FaDesktop aria-hidden="true" /> : <FaGamepad aria-hidden="true" />}
                      {platform}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-[#26304A] bg-[#0F131D] px-3 py-2 text-xs text-[#AAB2C5]">
                  المنصات غير محددة
                </p>
              )}
            </div>

            <div className="mb-4 flex items-end justify-between rounded-xl border border-[#26304A] bg-[#0F131D] p-3">
              <div>
                <span className="mb-1 block text-[11px] text-[#AAB2C5]">سعر تقديري للعرض</span>
                <span className="font-[Space_Grotesk] text-2xl font-bold text-[#F1F5F9]">${price.toFixed(2)}</span>
              </div>
              <span className="text-[10px] text-[#858DA1]">قد يتغير عند ربط المتجر</span>
            </div>

            <p className="mb-3 flex items-center gap-2 rounded-lg bg-[#22C55E]/10 px-3 py-2 text-[11px] text-[#4AE176]">
              <FaBolt aria-hidden="true" />
              أضف اللعبة إلى سلتك للمتابعة
            </p>

            <button
              type="button"
              onClick={handleBuyNow}
              className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#8B5CF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D2BBFF]"
            >
              <FaBolt aria-hidden="true" />
              اشترِ الآن
            </button>
            <button
              type="button"
              onClick={handleCartToggle}
              className={`flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                isInCart
                  ? "border-[#4AE176]/30 bg-[#22C55E]/10 text-[#4AE176]"
                  : "border-[#38314D] bg-[#201B2D] text-[#D2BBFF] hover:border-[#7C3AED] hover:bg-[#7C3AED]/15"
              }`}
            >
              <FaShoppingCart aria-hidden="true" />
              {isInCart ? "أُضيفت إلى السلة — إزالة" : "أضف إلى السلة"}
            </button>
          </aside>
        </div>

        <nav aria-label="أقسام تفاصيل اللعبة" className="mt-8 overflow-x-auto border-b border-[#26304A]">
          <div className="flex min-w-max gap-2">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? "location" : undefined}
                className={`rounded-t-lg border-b-2 px-4 py-3 text-xs font-semibold transition sm:text-sm ${
                  activeTab === tab.id
                    ? "border-[#7C3AED] bg-[#7C3AED]/10 text-[#D2BBFF]"
                    : "border-transparent text-[#AAB2C5] hover:text-white"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </nav>

        <section id="overview" className="scroll-mt-24 pt-6">
          <div className="grid gap-5 rounded-2xl border border-[#26304A] bg-[#151B2B] p-4 sm:p-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:p-8">
            <div className="relative min-h-56 overflow-hidden rounded-xl bg-[#0A0E18] sm:min-h-72">
              {details.background_image ? (
                <img
                  src={details.background_image}
                  alt={`غلاف ${details.name}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#252039] to-[#0A0E18]">
                  <FaGamepad aria-hidden="true" className="text-6xl text-[#7C3AED]/70" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0E18] to-transparent p-4 pt-12">
                <p className="mb-0 text-xs font-semibold text-white">{details.name}</p>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-[#D2BBFF]">عن اللعبة</p>
              <h2 className="mb-3 text-2xl font-bold leading-tight text-[#F1F5F9] normal-case sm:text-3xl">
                {details.name}
              </h2>
              <p className="whitespace-pre-line text-sm leading-7 text-[#AAB2C5]">
                {description || "لا يتوفر وصف لهذه اللعبة حاليًا."}
              </p>
              {descriptionText.length > 420 && (
                <button
                  type="button"
                  onClick={() => setShowFullDescription((shown) => !shown)}
                  className="mt-2 text-xs font-semibold text-[#D2BBFF] hover:text-white"
                >
                  {showFullDescription ? "عرض أقل" : "اقرأ المزيد"}
                </button>
              )}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-[#26304A] bg-[#0F131D] p-3">
                  <span className="mb-1 block text-[10px] text-[#858DA1]">التقييم</span>
                  <span className="flex items-center gap-1.5 text-sm font-bold text-[#FBBF24]">
                    <FaStar aria-hidden="true" /> {details.rating ? `${Number(details.rating).toFixed(1)} / 5` : "غير متاح"}
                  </span>
                </div>
                <div className="rounded-lg border border-[#26304A] bg-[#0F131D] p-3">
                  <span className="mb-1 block text-[10px] text-[#858DA1]">وقت اللعب المسجل</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-[#F1F5F9]">
                    {details.playtime ? `${details.playtime} ساعة` : "غير متاح"}
                  </span>
                </div>
                <div className="col-span-2 rounded-lg border border-[#26304A] bg-[#0F131D] p-3">
                  <span className="mb-2 block text-[10px] text-[#858DA1]">الأنواع</span>
                  <div className="flex flex-wrap gap-2">
                    {genres.length > 0
                      ? genres.map((genre) => (
                        <span key={genre.id} className="rounded-full bg-[#7C3AED]/15 px-2.5 py-1 text-[11px] text-[#D2BBFF]">
                          {genre.name}
                        </span>
                      ))
                      : <span className="text-xs text-[#AAB2C5]">غير محدد</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="requirements" className="scroll-mt-24 pt-12">
          <div className="mb-4">
            <p className="mb-1 text-xs font-semibold text-[#D2BBFF]">التوافق</p>
            <h2 className="mb-0 text-2xl font-bold text-[#F1F5F9] normal-case">متطلبات التشغيل</h2>
          </div>
          {requirements.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {requirements.map(({ platform, requirements: platformRequirements }) => (
                <article key={platform.id} className="rounded-xl border border-[#26304A] bg-[#151B2B] p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#F1F5F9] normal-case">
                    <FaDesktop aria-hidden="true" className="text-[#D2BBFF]" />
                    {platform.name}
                  </h3>
                  {["minimum", "recommended"].map((level) => platformRequirements[level] && (
                    <div key={level} className="mb-4 last:mb-0">
                      <h4 className="mb-2 text-xs font-semibold text-[#D2BBFF]">
                        {level === "minimum" ? "الحد الأدنى" : "الموصى به"}
                      </h4>
                      <p className="whitespace-pre-line text-xs leading-6 text-[#AAB2C5]">
                        {stripTags(platformRequirements[level])}
                      </p>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-[#26304A] bg-[#151B2B] p-5 text-sm leading-6 text-[#AAB2C5]">
              متطلبات التشغيل التفصيلية غير متاحة من مصدر بيانات اللعبة حاليًا.
            </p>
          )}
        </section>

        <section id="extras" className="scroll-mt-24 pt-12">
          <div className="mb-4">
            <p className="mb-1 text-xs font-semibold text-[#D2BBFF]">الإصدارات والمحتوى</p>
            <h2 className="mb-0 text-2xl font-bold text-[#F1F5F9] normal-case">المحتويات الإضافية</h2>
          </div>
          <div className="rounded-xl border border-[#26304A] bg-[#151B2B] p-5 text-sm leading-6 text-[#AAB2C5]">
            تفاصيل الإصدارات والحزم الإضافية غير متاحة من مصدر البيانات الحالي.
          </div>
        </section>

        <section id="reviews" className="scroll-mt-24 pt-12">
          <GameReviews
            gameName={details.name}
            rating={details.rating}
            ratingCount={details.ratings_count}
            ratings={details.ratings || []}
          />
        </section>

        <GameRecommendations
          currentGameId={details.id}
          currentGameGenres={genres}
        />
      </main>
      </div>

      {isPreviewOpen && currentMedia?.type === "image" && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`معاينة صورة ${details.name}`}
          onClick={() => setIsPreviewOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsPreviewOpen(false)}
            aria-label="إغلاق المعاينة"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#151B2B] text-white hover:bg-[#7C3AED]"
          >
            <FaTimes aria-hidden="true" />
          </button>
          <img
            src={currentMedia.url}
            alt={`لقطة مكبرة من لعبة ${details.name}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-full rounded-xl object-contain"
          />
        </div>
      )}
    </PageTransition>
  );
}
