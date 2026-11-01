import Skeleton from "./Skeleton";

export default function GameDetailsSkeleton() {
  return (
    <div className="bg-[#0F131D]" aria-busy="true" aria-label="جارٍ تحميل تفاصيل اللعبة">
      <main className="mx-auto max-w-[1440px] px-4 pb-16 pt-6 sm:px-6 lg:px-8" dir="rtl">
        <div className="mb-5 flex gap-2">
          <Skeleton className="w-16" />
          <Skeleton className="w-20" />
          <Skeleton className="w-32" />
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(310px,0.75fr)]">
          <div>
            <Skeleton type="block" className="!mb-0 aspect-video w-full rounded-2xl" />
            <div className="mt-3 flex gap-2">
              <Skeleton type="block" className="!mb-0 h-16 w-24 rounded-lg sm:h-20 sm:w-32" />
              <Skeleton type="block" className="!mb-0 h-16 w-24 rounded-lg sm:h-20 sm:w-32" />
              <Skeleton type="block" className="!mb-0 h-16 w-24 rounded-lg sm:h-20 sm:w-32" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#26304A] bg-[#151B2B] p-5">
            <Skeleton className="w-24" />
            <Skeleton type="block" className="!mb-3 h-9 w-3/4" />
            <Skeleton className="mb-5 w-1/3" />
            <Skeleton type="block" className="!mb-5 h-10 w-full" />
            <Skeleton className="w-24" />
            <Skeleton type="block" className="!mb-5 h-10 w-full" />
            <Skeleton type="block" className="!mb-3 h-16 w-full rounded-xl" />
            <Skeleton type="block" className="!mb-2 h-12 w-full rounded-lg" />
            <Skeleton type="block" className="!mb-0 h-11 w-full rounded-lg" />
          </div>
        </div>

        <div className="mt-8 flex gap-2 overflow-hidden border-b border-[#26304A] pb-3">
          <Skeleton type="block" className="!mb-0 h-9 w-36 shrink-0 rounded-lg" />
          <Skeleton type="block" className="!mb-0 h-9 w-36 shrink-0 rounded-lg" />
          <Skeleton type="block" className="!mb-0 h-9 w-36 shrink-0 rounded-lg" />
        </div>

        <div className="mt-6 grid gap-5 rounded-2xl border border-[#26304A] bg-[#151B2B] p-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Skeleton type="block" className="!mb-0 min-h-56 rounded-xl sm:min-h-72" />
          <div>
            <Skeleton className="w-20" />
            <Skeleton type="block" className="!mb-4 h-8 w-2/3" />
            <Skeleton type="block" className="!mb-2 h-4 w-full" />
            <Skeleton type="block" className="!mb-2 h-4 w-full" />
            <Skeleton type="block" className="!mb-2 h-4 w-5/6" />
            <Skeleton type="block" className="!mb-0 h-4 w-2/3" />
          </div>
        </div>
      </main>
    </div>
  );
}
