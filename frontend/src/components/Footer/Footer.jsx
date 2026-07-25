import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-10 text-white">
      <div className="page-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-black">LeadDesk</p>
          <p className="mt-2 text-sm text-slate-400">
            Modern lead capture and management for focused teams.
          </p>
        </div>
        <Link
          className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
          to="/admin/login"
        >
          Admin Login
        </Link>
      </div>
    </footer>
  );
};
