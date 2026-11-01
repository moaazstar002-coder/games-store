import { FaStar } from "react-icons/fa";

const ratingLabels = {
  exceptional: "ممتاز",
  recommended: "موصى به",
  meh: "متوسط",
  skip: "لم يعجبني",
};

export default function GameReviews({ gameName, rating, ratingCount = 0, ratings = [] }) {
  const score = Number(rating);
  const hasScore = Number.isFinite(score) && score > 0;
  const totalRatings = Number(ratingCount) || ratings.reduce((total, item) => total + (Number(item.count) || 0), 0);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold text-[#D2BBFF]">آراء المجتمع</p>
          <h2 className="mb-1 text-2xl font-bold text-[#F1F5F9] normal-case sm:text-3xl">
            مراجعات وآراء اللاعبين
          </h2>
          <p className="mb-0 text-xs text-[#AAB2C5]">تقييمات {gameName} من مصدر بيانات الألعاب</p>
        </div>
        <button
          type="button"
          disabled
          title="تتوفر إضافة المراجعات بعد ربط نظام الحسابات"
          className="cursor-not-allowed rounded-lg border border-[#26304A] bg-[#151B2B] px-4 py-2.5 text-xs font-semibold text-[#858DA1]"
        >
          أضف مراجعتك وتقييمك
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(240px,0.75fr)_minmax(0,1.25fr)]">
        <aside className="rounded-xl border border-[#26304A] bg-[#151B2B] p-5">
          <div className="mb-5 text-center">
            <p className="mb-1 font-[Space_Grotesk] text-5xl font-bold text-[#4AE176]">
              {hasScore ? `${Math.round((score / 5) * 100)}%` : "—"}
            </p>
            <div className="mb-2 flex justify-center gap-1 text-sm text-[#FBBF24]" aria-label={hasScore ? `التقييم ${score} من 5` : "لا يوجد تقييم"}>
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar key={index} className={index < Math.round(score) ? "" : "text-[#3A3D49]"} aria-hidden="true" />
              ))}
            </div>
            <p className="mb-0 text-xs text-[#AAB2C5]">
              {totalRatings.toLocaleString("ar")} تقييم من اللاعبين
            </p>
          </div>

          {ratings.length > 0 ? (
            <div className="space-y-3">
              {ratings.map((item) => {
                const count = Number(item.count) || 0;
                const percentage = Number(item.percent)
                  || (totalRatings > 0 ? (count / totalRatings) * 100 : 0);
                const label = ratingLabels[item.title] || item.title || "تقييم";
                return (
                  <div key={item.id || item.title} className="flex items-center gap-3 text-xs">
                    <span className="w-24 shrink-0 text-[#AAB2C5]">{label}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#0A0E18]">
                      <div
                        className="h-full rounded-full bg-[#4AE176]"
                        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                      />
                    </div>
                    <span className="w-10 text-left text-[#858DA1]">{count.toLocaleString("ar")}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mb-0 text-center text-xs text-[#858DA1]">لا يتوفر توزيع تفصيلي للتقييمات.</p>
          )}
        </aside>

        <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-[#26304A] bg-[#151B2B] p-6 text-center">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#7C3AED]/15 text-[#D2BBFF]">
            <FaStar aria-hidden="true" />
          </div>
          <h3 className="mb-2 text-base font-semibold text-[#F1F5F9] normal-case">
            المراجعات التفصيلية غير متاحة بعد
          </h3>
          <p className="mb-0 max-w-lg text-xs leading-6 text-[#AAB2C5]">
            يعرض هذا القسم تقييمات اللعبة المتاحة حاليًا. ستظهر مراجعات اللاعبين وإمكانية إضافة تقييم بعد ربط نظام الحسابات والـBackend.
          </p>
        </div>
      </div>
    </div>
  );
}
