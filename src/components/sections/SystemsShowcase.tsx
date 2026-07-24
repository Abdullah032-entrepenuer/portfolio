export default function SystemsShowcase() {
  const systems = [
    {
      title: "Zero-Latency Edge RAG Engine",
      description: "Local-first retrieval-augmented generation running entirely on-device via WebGPU. Bypasses round-trip cloud inference for instantaneous localized intelligence.",
      metrics: ["0 ms TBT", "100k Vectors", "WGSL", "WebGPU"],
      gradient: "from-electric-cyan/20 to-transparent",
      link: "https://doi.org/10.5281/zenodo.21526081"
    },
    {
      title: "OffscreenCanvas Spatial Visualizer",
      description: "Multi-threaded 3D rendering architecture bypassing the main thread for locked 60 FPS under heavy composite loads.",
      metrics: ["60 FPS Locked", "0.04 ms² Var", "Workers"],
      gradient: "from-electric-gold/20 to-transparent",
      link: "https://zenodo.org/records/21527199"
    },
    {
      title: "Synapse AI",
      description: "Interactive AI-powered 3D knowledge mapping. Generates interconnected concept graphs explored in custom 3D web-space or 2D flowcharts.",
      metrics: ["React Three Fiber", "Knowledge Graph", "AI"],
      gradient: "from-blue-500/20 to-transparent",
      link: "https://synapse-server-5bb8.onrender.com/"
    },
    {
      title: "Auto Care",
      description: "Live e-commerce platform for auto parts vendors featuring smart oil-grade recommendations, category browsing, and secure checkout.",
      metrics: ["E-Commerce", "React", "Logistics"],
      gradient: "from-green-500/20 to-transparent",
      link: "https://www.auto-care.me"
    }
  ];

  return (
    <section id="systems" className="py-32 bg-obsidian-900 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-sm font-mono tracking-widest text-electric-cyan uppercase mb-3">Architectures</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">The Systems Showcase.</h3>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {systems.map((sys, idx) => (
            <div key={idx} className="relative group rounded-2xl border border-white/10 bg-obsidian-800/40 backdrop-blur-xl overflow-hidden hover:border-white/25 transition-all duration-500 p-8 flex flex-col justify-between min-h-[360px]">
              {/* Subtle hover gradient */}
              <div className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${sys.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-white group-hover:text-electric-cyan transition-colors duration-300">{sys.title}</h4>
                <p className="text-white/60 leading-relaxed mb-8 font-light text-sm md:text-base">{sys.description}</p>
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {sys.metrics.map(metric => (
                    <span key={metric} className="px-2.5 py-1 rounded bg-obsidian-900 border border-white/10 text-[11px] font-mono text-white/70 uppercase tracking-wide">
                      {metric}
                    </span>
                  ))}
                </div>
                
                <a href={sys.link} className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors group/link">
                  Explore Architecture
                  <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
