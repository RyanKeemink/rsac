import React from "react";

export function WatDoenWijSection({
  title,
  activiteiten,
}: {
  title: string;
  activiteiten: {
    naam: string;
    beschrijving: string;
    afbeelding?: { asset: { url: string; altText?: string } };
  }[];
}) {
  return (
    <section className="max-w-5xl mx-auto w-full my-16 px-4">
      <h2 className="text-3xl font-bold text-[#102040] mb-8 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {activiteiten.map((act, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-between h-[340px] w-full"
          >
            {act.afbeelding?.asset?.url && (
              <img
                src={act.afbeelding.asset.url}
                alt={act.afbeelding.asset.altText || act.naam}
                className="w-36 h-36 object-cover rounded-full mb-4"
              />
            )}
            <h3 className="text-xl font-semibold mb-2 text-[#102040]">{act.naam}</h3>
            <p className="text-[#102040] text-center text-sm flex-1">{act.beschrijving}</p>
          </div>
        ))}
      </div>
    </section>
  );
}