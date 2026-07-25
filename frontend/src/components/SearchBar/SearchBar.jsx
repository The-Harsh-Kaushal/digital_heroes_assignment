import { Search } from 'lucide-react';

export const SearchBar = ({ onChange, value }) => {
  return (
    <label className="relative block w-full" htmlFor="lead-search">
      <span className="sr-only">Search leads</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        className="focus-ring h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-300"
        id="lead-search"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search name, email, budget, or message"
        type="search"
        value={value}
      />
    </label>
  );
};
