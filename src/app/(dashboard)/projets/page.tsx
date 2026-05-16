import PageHeader from "@/components/PageHeader";

export default function ProjetsPage() {
  return (
    <>
      <PageHeader title="Projets" subtitle="Projets actifs et en planification." />
      <div className="px-4 md:px-8 py-5 md:py-7">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Contenu à venir.
          </p>
        </div>
      </div>
    </>
  );
}
