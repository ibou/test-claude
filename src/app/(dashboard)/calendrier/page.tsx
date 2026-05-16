import PageHeader from "@/components/PageHeader";
import MonthCalendar from "@/components/MonthCalendar";

export default function CalendrierPage() {
  return (
    <>
      <PageHeader title="Calendrier" subtitle="Vue mensuelle des événements." />
      <div className="px-4 md:px-8 py-5 md:py-7">
        <MonthCalendar />
      </div>
    </>
  );
}
