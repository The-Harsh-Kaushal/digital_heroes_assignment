import { ArrowRight, BarChart3, CheckCircle2, MailCheck } from 'lucide-react';
import { Button } from '../Button/Button';

const pipelineRows = [
  { name: 'Acme Studio', value: '$500 - $1000', status: 'New' },
  { name: 'Northline Co.', value: '$1000 - $5000', status: 'Contacted' },
  { name: 'Blue Finch', value: '> $5000', status: 'Closed' },
];

export const Hero = () => {
  return (
    <section
      className="overflow-hidden border-b border-slate-200 bg-white"
      id="top"
    >
      <div className="page-shell grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <div>
          <p className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700">
            Premium lead operations for growing teams
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.02] text-slate-950 sm:text-6xl lg:text-7xl">
            Capture and Manage Leads Effortlessly
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            LeadDesk gives your team a clean intake flow, secure lead records,
            and a focused admin workspace for turning demand into follow-up.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#lead-form">
                Start collecting
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#features">Explore features</a>
            </Button>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm text-slate-600">
            {['Validated forms', 'Admin status flow', 'API ready'].map((item) => (
              <div className="flex items-center gap-2" key={item}>
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-10 h-28 w-28 rounded-full border border-brand-100 bg-white shadow-2xl shadow-blue-100" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-slate-950 p-3 shadow-2xl shadow-slate-300/80">
            <div className="rounded-[1.75rem] bg-white p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-400">Pipeline</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">
                    Today&apos;s leads
                  </h2>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-blue-200">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ['Total', '128'],
                  ['New', '34'],
                  ['Closed', '18'],
                ].map(([label, value]) => (
                  <div
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    key={label}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                      {label}
                    </p>
                    <p className="mt-2 text-2xl font-black text-slate-950">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {pipelineRows.map((row) => (
                  <div
                    className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                    key={row.name}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-slate-950">
                        {row.name}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {row.value}
                      </p>
                    </div>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-700">
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-2 hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-300/80 sm:block">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <MailCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-950">Lead captured</p>
                <p className="text-sm text-slate-500">Synced to admin desk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
