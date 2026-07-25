import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { cn } from '../../utils/cn';

const navItems = [
  { href: '#features', label: 'Features' },
  { href: '#lead-form', label: 'Lead form' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="page-shell flex h-20 items-center justify-between gap-6"
      >
        <a
          className="focus-ring flex items-center gap-3 rounded-full"
          href="#top"
          onClick={closeMenu}
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-base font-black text-white shadow-lg shadow-blue-200">
            L
          </span>
          <span className="text-lg font-black text-slate-950">LeadDesk</span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              className="focus-ring rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-brand-100 hover:bg-brand-50"
            to="/admin/login"
          >
            Admin Login
          </Link>
        </div>

        <Button
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className="h-11 w-11 px-0 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          variant="secondary"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      <div
        className={cn(
          'border-t border-slate-200 bg-white px-4 py-4 shadow-xl shadow-slate-200/70 md:hidden',
          !isOpen && 'hidden',
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2">
          {navItems.map((item) => (
            <a
              className="focus-ring rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              href={item.href}
              key={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <Link
            className="focus-ring mt-2 inline-flex h-11 items-center justify-center rounded-full bg-brand-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-brand-700"
            onClick={closeMenu}
            to="/admin/login"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
};
