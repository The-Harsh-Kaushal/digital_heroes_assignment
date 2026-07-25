import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';

export const NotFound = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="page-shell flex min-h-screen items-center justify-center py-16">
        <div className="max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-600">
            404
          </p>
          <h1 className="mt-4 text-4xl font-black text-slate-950 sm:text-6xl">
            Page not found
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            This page may have moved, or the link may no longer be available.
          </p>
          <Button asChild className="mt-8">
            <Link className="inline-flex items-center gap-2" to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to LeadDesk
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};
