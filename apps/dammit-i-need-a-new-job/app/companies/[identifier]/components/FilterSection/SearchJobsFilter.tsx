type SearchJobsFilterProps = {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
};

export function SearchJobsFilter({
  globalFilter,
  setGlobalFilter,
}: SearchJobsFilterProps) {
  return (
    <label className="mt-4 flex flex-col gap-3 text-sm text-cream-1000">
      <span>Search jobs</span>
      <input
        value={globalFilter}
        onChange={(event) => setGlobalFilter(event.target.value)}
        placeholder="Search by title, keyword..."
        className="h-10 rounded-md border border-divider-1000 bg-neutral-950 px-3 text-sm text-cream-1000 outline-none transition-colors placeholder:text-foreground-900 focus:border-orange-1000"
      />
    </label>
  );
}
