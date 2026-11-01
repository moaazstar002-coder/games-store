export default function GenreFilter({ value, onChange, genres = [], loading }) {
  const buttonClass = (active) =>
    `shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
      active
        ? "border-[#7C3AED] bg-[#7C3AED] text-white"
        : "border-[#26304A] bg-[#151B2B] text-[#AAB2C5] hover:border-[#7C3AED] hover:text-white"
    }`;

  return (
    <div
      role="group"
      aria-label="تصفية الألعاب حسب النوع"
      className="flex max-w-full gap-2 overflow-x-auto py-1"
    >
      <button
        type="button"
        className={buttonClass(value === "")}
        onClick={() => onChange("")}
        aria-pressed={value === ""}
      >
        الكل
      </button>
      {loading ? (
        <span className="self-center text-xs text-[#858DA1]">جارٍ تحميل الأنواع...</span>
      ) : (
        genres.slice(0, 7).map((genre) => (
          <button
            key={genre.id}
            type="button"
            className={buttonClass(value === genre.slug)}
            onClick={() => onChange(genre.slug)}
            aria-pressed={value === genre.slug}
          >
            {genre.name}
          </button>
        ))
      )}
    </div>
  );
}
