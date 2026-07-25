import { DatabaseZap, Gauge, PanelsTopLeft } from 'lucide-react';
import { Card } from '../Card/Card';

const features = [
  {
    icon: Gauge,
    title: 'Fast Lead Collection',
    description:
      'A polished intake form captures the right details quickly with clear validation and instant feedback.',
  },
  {
    icon: DatabaseZap,
    title: 'Secure Data Storage',
    description:
      'Every submission flows through the API layer with a clean payload ready for your backend records.',
  },
  {
    icon: PanelsTopLeft,
    title: 'Easy Lead Management',
    description:
      'Admins can search, filter, paginate, and move leads through statuses without leaving the dashboard.',
  },
];

export const Features = () => {
  return (
    <section className="bg-slate-50 py-20 sm:py-28" id="features">
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-brand-600">
            Features
          </p>
          <h2 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">
            Built for clean handoffs from interest to action.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              className="group p-6 transition duration-200 hover:-translate-y-1 hover:shadow-2xl"
              key={feature.title}
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-black text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
