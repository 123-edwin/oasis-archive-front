import { oasisTimeline, oasisLineup, oasisDiscography, oasisGear } from '../data/oasisData';
import { Music, Users, Disc3, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-transparent text-white p-6 relative z-10">
      <div className="max-w-5xl mx-auto py-10">
        
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-4">Oasis Archive</h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Una documentación completa de la banda que definió el Britpop, capturó una generación y cambió el rock para siempre.
          </p>
        </header>

        {/* Timeline */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Music size={32} className="text-white" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">The Timeline</h2>
          </div>
          <div className="space-y-6">
            {oasisTimeline.map((era, idx) => (
              <div key={idx} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
                <div className="flex gap-4">
                  <div className="text-yellow-400 font-black text-lg min-w-fit">{era.period}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{era.title}</h3>
                    <p className="text-zinc-300 leading-relaxed">{era.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lineup */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Users size={32} className="text-white" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">The Lineup</h2>
          </div>
          <div className="space-y-12">
            {oasisLineup.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold mb-6 text-yellow-400 uppercase tracking-widest">{group.era}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {group.members.map((member, midx) => (
                    <div key={midx} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
                      <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                      <p className="text-yellow-400 text-sm font-semibold mb-3">{member.role} • {member.years}</p>
                      <p className="text-zinc-300 italic">"{member.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Discography */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Disc3 size={32} className="text-white" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">Essential Discography</h2>
          </div>
          <div className="space-y-12">
            {oasisDiscography.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold mb-6 text-yellow-400 uppercase tracking-widest">{section.category}</h3>
                {section.albums && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.albums.map((album, aidx) => (
                      <div key={aidx} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg">{album.title}</h4>
                          <span className="text-yellow-400 font-bold">{album.year}</span>
                        </div>
                        <p className="text-zinc-300 text-sm">{album.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {section.songs && (
                  <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
                    <ul className="space-y-2">
                      {section.songs.map((song, sidx) => (
                        <li key={sidx} className="flex items-center gap-2 text-zinc-300">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                          {song}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Gear & Aesthetic */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Zap size={32} className="text-white" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">Gear & Aesthetic</h2>
          </div>
          <div className="space-y-12">
            {oasisGear.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold mb-6 text-yellow-400 uppercase tracking-widest">{section.category}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {section.items.map((item, iidx) => (
                    <div key={iidx} className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all">
                      <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                      {item.owner && <p className="text-yellow-400 text-xs font-semibold mb-2">{item.owner}</p>}
                      <p className="text-zinc-300 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-12 border-t border-zinc-800">
          <p className="text-zinc-500 text-sm">
            Oasis Archive • Una celebración del legacy de la banda más importante del Britpop
          </p>
        </footer>

      </div>
    </div>
  );
};

export default AboutPage;
