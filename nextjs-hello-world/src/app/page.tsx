import React from "react";
import { client } from "@/sanity/client";
import { RotatingTagline } from "@/components/RotatingTagline";
import { Navbar } from "@/components/Navbar";
import { PortableText } from "@portabletext/react";
import { GallerySection } from "@/components/GallerySection";
import { WatDoenWijSection } from "@/components/WatDoenWijSection";
import { SponsorsCarousel } from "@/components/SponsorenSection";

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  "logoUrl": logoImage.asset->url,
  taglines,
  subtext,
  "imageUrl": heroImage.asset->url,
  infoSection
}`;

const GALLERY_QUERY = `*[_type == "gallerySection"][0]{
  title,
  categories[]{
    key,
    label,
    images[]{asset->{url, altText}},
    description
  }
}`;

const WAT_DOEN_WIJ_QUERY = `*[_type == "watDoenWijSection"][0]{
  title,
  activiteiten[]{
    naam,
    beschrijving,
    afbeelding{asset->{url, altText}}
  }
}`;

const SPONSOREN_QUERY = `*[_type == "sponsorenSection"][0]{
  title,
  sponsoren[]{
    type,
    naam,
    logo{asset->{url, altText}},
    url,
    iframeSrc,
    iframeTitle
  }
}`;

export default async function IndexPage() {
  const homepage = await client.fetch(HOMEPAGE_QUERY);
  const [gallery, watDoenWij, sponsorenSection] = await Promise.all([
    client.fetch(GALLERY_QUERY),
    client.fetch(WAT_DOEN_WIJ_QUERY),
    client.fetch(SPONSOREN_QUERY),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Sticky Navbar */}
      <Navbar logoUrl={homepage?.logoUrl} />

      {/* Hero met overlay, animatie en responsive */}
      <section className="relative w-full h-[420px] flex items-center justify-center mb-12 overflow-hidden shadow-lg">
        {homepage?.imageUrl && (
          <>
            <img
              src={homepage.imageUrl}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center" }}
            />
            <div className="absolute inset-0 bg-[#102040]/80" />
          </>
        )}
        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <div className="text-center text-white flex flex-col items-center animate-fade-in">
            {homepage?.logoUrl && (
              <div className="bg-white/20 rounded-full p-4 mb-4 shadow-lg backdrop-blur-sm inline-block">
                <img
                  src={homepage.logoUrl}
                  alt="RSAC Logo"
                  className="h-28 drop-shadow-lg"
                  style={{ maxWidth: "180px", objectFit: "contain" }}
                />
              </div>
            )}
            {homepage?.subtext && (
              <p className="mt-2 mb-4 text-lg font-medium drop-shadow">
                {homepage.subtext}
              </p>
            )}
            {homepage?.taglines && homepage.taglines.length > 0 && (
              <RotatingTagline taglines={homepage.taglines} />
            )}
          </div>
          {/* Overlay Info & sign up knop */}
          <a
            href="/signup"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 rounded-full text-white font-bold shadow-lg text-lg transition inline-block mt-8 text-center"
            style={{
              minWidth: "220px",
            }}
          >
            Info & sign up
          </a>
        </div>
      </section>

      {/* Info en Agenda sectie */}
      <section className="max-w-5xl mx-auto w-full mt-8 flex flex-col md:flex-row gap-8">
        {/* Linkerkant: Info uit Sanity */}
        <div className="md:w-1/2 w-full bg-white rounded-xl shadow p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-[#102040]">
            Welkom bij de RSAC!
          </h2>
          {homepage?.infoSection && (
            <PortableText value={homepage.infoSection} />
          )}
        </div>
        {/* Rechterkant: Google Agenda */}
        <div className="md:w-1/2 w-full bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-[#102040]">Agenda</h2>
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FAmsterdam&mode=AGENDA&showPrint=0&showCalendars=0&showTitle=0&src=MDQwNGQwM2EwOTk3NzYxZTZjNTk0YjlkMTczMDY3OGExOTAzZjYyNTgxMDA3OTU2MzdlOTIzNTA1ZDRjZmZiMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233F51B5"
            style={{ border: 0 }}
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            title="RSAC Agenda"
            className="rounded"
          ></iframe>
        </div>
      </section>

      {/* Gallery Section */}
      {gallery && gallery.categories && (
        <GallerySection title={gallery.title} categories={gallery.categories} />
      )}

      {/* Wat Doen Wij Section */}
      {watDoenWij && watDoenWij.activiteiten && (
        <WatDoenWijSection title={watDoenWij.title} activiteiten={watDoenWij.activiteiten} />
      )}

      {/* Sponsors Section */}
      { sponsorenSection && sponsorenSection.sponsoren && (
  <SponsorsCarousel sponsoren={sponsorenSection.sponsoren} />
)}

      {/* Footer */}
      <footer className="bg-[#102040] text-white py-6 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold">RSAC</span>
            <span className="text-sm opacity-70">
              © {new Date().getFullYear()} Rotterdamse Studenten Alpine Club
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:info@rsac.nl"
              className="hover:text-blue-300 transition"
            >
              info@rsac.nl
            </a>
            <a
              href="https://instagram.com/rsac"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-400 transition"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 0 1 1.77 1.03 4.92 4.92 0 0 1 1.03 1.77c.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.92 4.92 0 0 1-1.03 1.77 4.92 4.92 0 0 1-1.77 1.03c-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.92 4.92 0 0 1-1.77-1.03 4.92 4.92 0 0 1-1.03-1.77c-.17-.46-.354-1.26-.41-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43a4.92 4.92 0 0 1 1.03-1.77 4.92 4.92 0 0 1 1.77-1.03c.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.78.312 4.01.54a7.07 7.07 0 0 0-2.54 1.63A7.07 7.07 0 0 0 .54 4.01C.312 4.78.128 5.77.07 7.052.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.282.242 2.272.47 3.042a7.07 7.07 0 0 0 1.63 2.54 7.07 7.07 0 0 0 2.54 1.63c.77.228 1.76.412 3.042.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.282-.058 2.272-.242 3.042-.47a7.07 7.07 0 0 0 2.54-1.63 7.07 7.07 0 0 0 1.63-2.54c.228-.77.412-1.76.47-3.042.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.282-.242-2.272-.47-3.042a7.07 7.07 0 0 0-1.63-2.54A7.07 7.07 0 0 0 19.99.54c-.77-.228-1.76-.412-3.042-.47C15.668.012 15.264 0 12 0z" />
                <path d="M12 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 1 0 12 5.838zm0 10.162A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/rsac"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-400 transition"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}