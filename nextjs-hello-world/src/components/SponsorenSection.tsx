"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Sponsor = {
  type: string;
  naam?: string;
  logo?: { asset: { url: string; altText?: string } };
  url?: string;
  iframeSrc?: string;
  iframeTitle?: string;
};

export function SponsorsCarousel({ sponsoren }: { sponsoren: Sponsor[] }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 2500, stopOnInteraction: false })]
  );

  return (
    <div className="embla-sponsors">
      <div className="embla-sponsors__viewport" ref={emblaRef}>
        <div className="embla-sponsors__container">
          {sponsoren.map((s, i) => (
            <div className="embla-sponsors__slide" key={i}>
              {s.type === "logo" && s.logo?.asset?.url ? (
                <a
                  href={s.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.naam}
                  className="block w-full h-full flex items-center justify-center"
                >
                  <img
                    src={s.logo.asset.url}
                    alt={s.logo.asset.altText || s.naam || "Sponsor"}
                    className="embla-sponsors__img"
                    loading="lazy"
                  />
                </a>
              ) : s.type === "iframe" && s.iframeSrc ? (
                <iframe
                  src={s.iframeSrc}
                  title={s.iframeTitle || "Sponsor"}
                  width="200"
                  height="120"
                  style={{ border: 0, background: "#fff", borderRadius: "0.5rem" }}
                  loading="lazy"
                ></iframe>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}