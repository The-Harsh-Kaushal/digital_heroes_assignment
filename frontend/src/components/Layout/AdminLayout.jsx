import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';

export const AdminLayout = ({ children }) => {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="page-shell flex h-20 items-center justify-between gap-4">
          <Link
            className="focus-ring flex items-center gap-3 rounded-full"
            to="/"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 font-black text-white">
              L
            </span>
            <span className="text-lg font-black text-slate-950">LeadDesk</span>
          </Link>
          <Button icon={LogOut} onClick={signOut} variant="secondary">
            Sign out
          </Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
