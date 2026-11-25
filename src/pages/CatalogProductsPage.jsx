import { createElement, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGamepad,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import CardGame from "../components/CardGame";
import GameCardSkeleton from "../components/GameCardSkeleton";
import PageTransition from "../components/PageTransition";
import { useCatalogProducts } from "../hooks/useCatalogProducts";

const orderingOptions = [
  { value: "-added", label: "المضاف حديثًا" },
  { value: "-rating", label: "الأعلى تقييمًا" },
  { value: "price", label: "السعر: الأقل أولًا" },
  { value: "-price", label: "السعر: الأعلى أولًا" },
  { value: "name", label: "الاسم: أ إلى ي" },
];

export default function CatalogProductsPage({
  productType,
  title,
  description,
  icon: Icon = FaGamepad,
  filterOptions = [],
  filterLabel = "تصفية",
}) {
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-added");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const { data, isLoading, isError, refetch } = useCatalogProducts(productType, {
    page,
    search,
    ordering,
    filter,
  });
  const products = data?.results ?? [];
  const totalCount = data?.count ?? 0;
  const pageSize = 20;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  return (
    <PageTransition>
      <div className="bg-[#0F131D]">
        <main
          dir="rtl"
          className="mx-auto min-h-screen w-full max-w-[1440px] px-4 pb-14 pt-6 text-[#DFE2F1] sm:px-6 lg:px-8"
        >
          <nav
            aria-label="مسار التنقل"
            className="mb-5 flex items-center gap-2 text-xs text-[#858DA1]"
          >
            <Link to="/" className="transition hover:text-white">
              الرئيسية
            </Link>
            <FaChevronLeft aria-hidden="true" className="text-[9px]" />
            <span className="text-[#F1F5F9]">{title}</span>
          </nav>

          <header className="mb-6 flex flex-col gap-5 rounded-xl border border-[#26304A]/70 bg-[#171B26] p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#4AE176]">
                <span className="h-2 w-2 rounded-full bg-[#4AE176]" />
                اختيارات مناسبة لإعدادك
              </p>
              <h1 className="mb-2 text-right text-2xl font-bold text-[#F1F5F9] normal-case sm:text-3xl">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-[#AAB2C5]">
                {description}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start rounded-lg bg-[#0F131D] px-3 py-2 text-xs text-[#D2BBFF] lg:self-auto">
              {createElement(Icon, { "aria-hidden": true })}
              <span>{totalCount} منتج</span>
            </div>
          </header>

          <div className="mb-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
            <label className="flex min-w-0 items-center gap-3 rounded-lg border border-[#26304A] bg-[#171B26] px-4 py-3 transition focus-within:border-[#7C3AED]">
              <FaSearch aria-hidden="true" className="shrink-0 text-[#958DA1]" />
              <input
                type="search"
                value={search}
                onChange={handleSearch}
                placeholder={`ابحث في ${title}...`}
                aria-label={`ابحث في ${title}`}
                className="min-w-0 flex-1 bg-transparent text-sm text-[#F1F5F9] outline-none placeholder:text-[#858DA1]"
              />
            </label>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-[#26304A] bg-[#171B26] px-3 py-2">
              <label
                htmlFor={`${productType}-filter`}
                className="text-xs text-[#AAB2C5]"
              >
                {filterLabel}
              </label>
              <select
                id={`${productType}-filter`}
                value={filter}
                onChange={(event) => {
                  setFilter(event.target.value);
                  setPage(1);
                }}
                className="min-w-36 rounded-md border border-[#26304A] bg-[#0F131D] px-2 py-2 text-xs text-[#F1F5F9] outline-none focus:border-[#7C3AED]"
              >
                <option value="">الكل</option>
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-[#26304A] bg-[#171B26] px-3 py-2 md:justify-start">
              <label htmlFor={`${productType}-ordering`} className="text-xs text-[#AAB2C5]">
                ترتيب حسب
              </label>
              <select
                id={`${productType}-ordering`}
                value={ordering}
                onChange={(event) => {
                  setOrdering(event.target.value);
                  setPage(1);
                }}
                className="min-w-40 rounded-md border border-[#26304A] bg-[#0F131D] px-2 py-2 text-xs text-[#F1F5F9] outline-none focus:border-[#7C3AED]"
              >
                {orderingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isError ? (
            <div
              role="alert"
              className="rounded-xl border border-[#FF4D6D]/30 bg-[#171B26] px-5 py-12 text-center"
            >
              <h2 className="mb-2 text-lg font-bold text-[#F1F5F9]">
                تعذر تحميل المنتجات
              </h2>
              <p className="mb-4 text-sm text-[#AAB2C5]">
                حصلت مشكلة أثناء الاتصال بالكتالوج. حاول مرة أخرى.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="rounded-lg bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : isLoading ? (
            <div role="status" aria-label="جاري تحميل المنتجات" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }, (_, index) => (
                <GameCardSkeleton key={index} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-xl border border-[#26304A]/70 bg-[#171B26] px-5 py-12 text-center">
              <h2 className="mb-2 text-lg font-bold text-[#F1F5F9]">
                لا توجد منتجات تطابق بحثك
              </h2>
              <p className="text-sm text-[#AAB2C5]">
                جرّب عبارة بحث مختلفة.
              </p>
            </div>
          ) : (
            <>
              <section
                aria-label={`قائمة ${title}`}
                className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4"
              >
                {products.map((product) => (
                  <CardGame
                    key={`${productType}:${product.id}`}
                    variant="storefront"
                    game={{
                      ...product,
                      id: `${productType}:${product.id}`,
                      product_id: product.id,
                      product_type:
                        productType === "consoles" ? "console" : "accessory",
                      title: product.title || product.name,
                      image: product.image_url || product.background_image,
                      parent_platforms: [
                        {
                          platform: {
                            name:
                              product.platform ||
                              product.compatibility ||
                              product.category,
                          },
                        },
                      ],
                    }}
                  />
                ))}
              </section>

              {totalPages > 1 && (
                <nav
                  aria-label={`صفحات ${title}`}
                  className="mt-7 flex items-center justify-between rounded-xl border border-[#26304A]/70 bg-[#171B26] px-4 py-3"
                >
                  <p className="text-xs text-[#AAB2C5]">
                    صفحة {page} من {totalPages}
                  </p>
                  <div className="flex items-center gap-2" dir="ltr">
                    <button
                      type="button"
                      onClick={() => setPage((current) => Math.max(current - 1, 1))}
                      disabled={page === 1}
                      aria-label="الصفحة السابقة"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[#26304A] text-[#AAB2C5] disabled:opacity-40"
                    >
                      <FaChevronLeft aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPage((current) => Math.min(current + 1, totalPages))}
                      disabled={page === totalPages}
                      aria-label="الصفحة التالية"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[#26304A] text-[#AAB2C5] disabled:opacity-40"
                    >
                      <FaChevronRight aria-hidden="true" />
                    </button>
                  </div>
                </nav>
              )}
            </>
          )}

          <section className="mt-8 flex flex-col justify-between gap-4 rounded-xl border border-[#26304A]/70 bg-[#171B26] p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="mb-1 text-base font-bold text-[#F1F5F9]">
                اختيارات ألعابك في مكان واحد
              </h2>
              <p className="text-xs leading-5 text-[#AAB2C5]">
                الأسعار والتفاصيل المعروضة جزء من نموذج المتجر التجريبي.
              </p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-[#4AE176]">
              <FaStar aria-hidden="true" className="ml-1 inline" />
              منتجات مختارة للاعبين
            </span>
          </section>
        </main>
      </div>
    </PageTransition>
  );
}
