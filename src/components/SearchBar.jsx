import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  search,
  setSearch,
  onSubmit,
  placeholder = "ابحث عن لعبة...",
  className = "",
  showButton = true,
}) {
  const handleSubmit = (event) => {
    if (onSubmit) {
      onSubmit(event);
    } else {
      event.preventDefault();
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex min-w-0 items-center gap-3 rounded-lg border border-[#26304A] bg-[#0F131D] px-4 py-3 transition focus-within:border-[#7C3AED] ${className}`}
    >
      <FaSearch aria-hidden="true" className="shrink-0 text-[#958DA1]" />
      <input
        type="search"
        placeholder={placeholder}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-[#F1F5F9] outline-none placeholder:text-[#858DA1]"
      />
      {onSubmit && showButton && (
        <button
          type="submit"
          className="rounded-md bg-[#7C3AED] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#8B5CF6]"
        >
          بحث
        </button>
      )}
    </form>
  );
}
