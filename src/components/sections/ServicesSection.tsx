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
    <section id="services" className="w-full bg-[#111111] text-[#D7E2EA] rounded-t-[4rem] md:rounded-t-[6rem] -mt-20 relative z-20 py-32 px-8 md:px-16 pb-48 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <FadeIn yOffset={30}>
          <h2 className="text-[#D7E2EA] text-sm md:text-base font-mono uppercase tracking-[0.3em] mb-4 opacity-70">
            Capabilities
          </h2>
          <h3 className="hero-heading text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">
            Services
          </h3>
        </FadeIn>

        <div className="flex flex-col border-t border-white/10 mt-8">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.1} yOffset={20}>
              <div className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b border-white/10 hover:px-8 transition-all duration-500 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 text-6xl md:text-8xl lg:text-[10rem] font-bold leading-none text-white/5 group-hover:text-white/20 transition-colors duration-500">
                  {service.num}
                </span>
                <span className="relative z-10 text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mt-4 md:mt-0 group-hover:text-white transition-colors duration-500">
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
