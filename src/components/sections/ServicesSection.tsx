'use client';

import FadeIn from '@/components/ui/FadeIn';

const services = [
  { num: '01', title: 'Full-Stack Systems' },
  { num: '02', title: '3D Web & WebGL' },
  { num: '03', title: 'App Engineering' },
  { num: '04', title: 'Cloud Engineering' },
  { num: '05', title: 'UI / UX Design' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full bg-white text-[#0C0C0C] rounded-t-[4rem] md:rounded-t-[6rem] -mt-20 relative z-20 py-32 px-8 md:px-16 pb-48">
      <div className="max-w-7xl mx-auto">
        <FadeIn yOffset={30}>
          <h2 className="text-4xl md:text-6xl font-bold uppercase mb-16 tracking-tighter">
            Services
          </h2>
        </FadeIn>

        <div className="flex flex-col border-t border-black/10">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.1} yOffset={20}>
              <div className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b border-black/10 hover:px-8 transition-all duration-500 cursor-pointer">
                <span className="text-6xl md:text-8xl lg:text-[10rem] font-medium leading-none text-black/10 group-hover:text-black/20 transition-colors duration-500">
                  {service.num}
                </span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-semibold uppercase tracking-tighter mt-4 md:mt-0">
                  {service.title}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
