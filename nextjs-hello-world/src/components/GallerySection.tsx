"use client";
import React, { useState, useCallback, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Modal from "react-modal";


type Image = { asset: { url: string; altText?: string } };

export function EmblaSimpleGallery({ images }: { images: Image[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number>(0);

  // Update selected index on slide change
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Carousel navigation
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  // Modal navigation
  const openModal = (idx: number) => {
    setModalIndex(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const showPrevModal = () =>
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
  const showNextModal = () =>
    setModalIndex((prev) => (prev + 1) % images.length);

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrevModal();
      if (e.key === "ArrowRight") showNextModal();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen, images.length]);

  useEffect(() => {
    setSelectedIndex(0);
    if (emblaApi) emblaApi.scrollTo(0);
  }, [images, emblaApi]);

  return (
    <>
      <div className="embla" style={{ position: "relative" }}>
        <button
          aria-label="Vorige"
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow hover:bg-blue-200 transition"
          style={{ fontSize: "2rem" }}
        >
          &#8592;
        </button>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {images.map((img, i) => {
              // Determine if this is the selected (center) slide
              const isCenter = i === selectedIndex;
              return (
                <div
                  className={`embla__slide${
                    isCenter ? " embla__slide--center" : " embla__slide--side"
                  }`}
                  key={i}
                >
                  <img
                    src={img.asset.url}
                    alt={img.asset.altText || ""}
                    className="embla__img"
                    draggable={false}
                    style={{ cursor: "pointer" }}
                    onClick={() => openModal(i)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <button
          aria-label="Volgende"
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow hover:bg-blue-200 transition"
          style={{ fontSize: "2rem" }}
        >
          &#8594;
        </button>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1000 },
          content: {
            background: "transparent",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            inset: 0,
          },
        }}
        ariaHideApp={false}
      >
        <button
          aria-label="Vorige"
          onClick={showPrevModal}
          style={{
            position: "absolute",
            left: "2vw",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "2.5rem",
            background: "rgba(255,255,255,0.8)",
            borderRadius: "50%",
            border: "none",
            zIndex: 1100,
            cursor: "pointer",
          }}
        >
          &#8592;
        </button>
        <img
          src={images[modalIndex].asset.url}
          alt={images[modalIndex].asset.altText || ""}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            borderRadius: "1rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            background: "#fff",
            display: "block",
            margin: "0 auto",
          }}
          onClick={closeModal}
        />
        <button
          aria-label="Volgende"
          onClick={showNextModal}
          style={{
            position: "absolute",
            right: "2vw",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "2.5rem",
            background: "rgba(255,255,255,0.8)",
            borderRadius: "50%",
            border: "none",
            zIndex: 1100,
            cursor: "pointer",
          }}
        >
          &#8594;
        </button>
      </Modal>
    </>
  );
}

type GalleryCategory = {
  key: string;
  label: string;
  images: { asset: { url: string; altText?: string } }[];
  description?: any;
};

export function GallerySection({
  title,
  categories,
}: {
  title: string;
  categories: GalleryCategory[];
}) {
  const [active, setActive] = useState(categories[0]?.key);

  const activeIndex = categories.findIndex((cat) => cat.key === active);
  const activeCategory = categories[activeIndex];

  const imageCount = activeCategory?.images?.length || 1;
  // Slick settings
  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: Math.min(5, imageCount),
    infinite: imageCount > 3,
    arrows: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, imageCount),
          infinite: imageCount > 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: imageCount > 1,
        },
      },
    ],
  };

  return (
    <section className="w-full py-12 bg-[#102040] mt-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {title}
        </h2>
        {/* Multi-toggle switch */}
        <div className="flex justify-center mb-8">
          <div className="relative flex bg-white/20 rounded-full p-1 shadow-lg min-w-[260px]">
            {/* Sliding indicator */}
            <div
              className="absolute top-1 left-1 h-8 rounded-full bg-blue-400 transition-all duration-300 z-0"
              style={{
                width: `calc((100% - 0.5rem) / ${categories.length})`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`relative z-10 flex-1 px-4 h-8 rounded-full font-semibold transition text-sm
                  ${
                    active === cat.key
                      ? "text-white"
                      : "text-[#102040] hover:text-blue-700"
                  }
                `}
                style={{
                  minWidth: 0,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        {/* Carousel met react-slick */}
        <div className="mb-6">
          {activeCategory?.images?.length ? (
            <div
              style={{
                position: "relative",
                left: "50%",
                right: "50%",
                marginLeft: "-50vw",
                marginRight: "-50vw",
                width: "100vw",
              }}
            >
              <EmblaSimpleGallery images={activeCategory.images} />
            </div>
          ) : (
            <p className="text-white text-center">Geen foto's beschikbaar.</p>
          )}
        </div>
        {/* Beschrijving */}
        {activeCategory?.description && (
          <div className="bg-white/80 rounded-lg p-4 max-w-2xl mx-auto text-[#102040]">
            <PortableText value={activeCategory.description} />
          </div>
        )}
      </div>
    </section>
  );
}