import React from 'react';

export const PressReviews: React.FC = () => {
  const quotes = [
    {
      publication: 'VOGUE',
      text: '“Aurel proves that contemporary wardrobe essentials can carry the gravitas of couture without losing everyday ease.”'
    },
    {
      publication: 'KINFOLK',
      text: '“A serene antidote to modern overconsumption. Tactile, balanced, and uncompromising in its choice of raw fibers.”'
    },
    {
      publication: 'WALLPAPER*',
      text: '“Architectural tailoring distilled to its purest essence. The Caelum trouser is a modern triumph of drape.”'
    },
    {
      publication: 'ELLE DÉCOR',
      text: '“Pieces that inhabit space like sculpted furniture. An essential label for the deliberate dresser.”'
    }
  ];

  return (
    <section className="py-16 bg-[#FBF9F5] border-b border-[#E8E3D8]">
      <div className="editorial-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quotes.map((q, idx) => (
            <div key={idx} className="flex flex-col justify-between p-4 border-l border-[#E2DBD0]">
              <p className="font-serif text-sm sm:text-base text-[#2E2C29] italic leading-relaxed mb-4">
                {q.text}
              </p>
              <span className="text-[11px] tracking-[0.25em] font-serif font-bold text-[#5E1924]">
                {q.publication}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
