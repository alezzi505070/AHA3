import { STATS } from '@/data/content';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';

export const StatsBar = () => {
  return (
    <section className="bg-surface border-y border-black/5 py-12 content-vis-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-black/10">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center pt-8 md:pt-0 first:pt-0">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-serif" dir="ltr">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-textMuted font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
