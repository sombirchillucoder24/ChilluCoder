"use client";

import Image from "next/image";
import {
  FaCamera,
  FaSearchPlus,
  FaSun,
  FaVideo,
  FaImage,
  FaMobileAlt,
} from "react-icons/fa";

export default function MobileCameraPage() {
  return (
    <main className="bg-gray-950 text-white min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-400">Mobile Camera Technology</h1>
          <p className="text-gray-400 mt-3 text-lg max-w-2xl mx-auto">
            Explore how mobile phones capture stunning photos and videos with powerful lenses and smart algorithms.
          </p>
        </header>

        <section className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg mb-16">
          <Image
            src="/images/html/mobile-camera.webp"
            alt="Mobile Camera Close-up"
            fill
            className="object-contain"
            priority
          />
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </section>

        <section className="bg-gray-900 rounded-xl p-10 text-gray-300 shadow-lg text-lg leading-relaxed mb-20">
          <p>
            Mobile cameras have revolutionized photography by integrating advanced sensors, multi-lens systems, and intelligent software
            into sleek smartphones. Modern phones often feature wide-angle, telephoto, macro, and depth lenses — all controlled by AI to
            optimize lighting, focus, and exposure in real time.
          </p>
          <p className="mt-4">
            Features like Night Mode, Portrait Mode, and 4K Video Recording make smartphones powerful tools for both casual users and professional creators.
            The gap between mobile and DSLR quality continues to narrow with each generation.
          </p>
        </section>

        <footer className="text-center text-sm text-gray-500 border-t border-gray-800 pt-8">
          &copy; {new Date().getFullYear()} PixelLens Labs · Mobile Imaging Innovation
        </footer>
      </div>
    </main>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function FeatureCard({ icon, title, desc }: FeatureProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow hover:shadow-pink-400/20 hover:scale-105 transition duration-300">
      <div className="mb-4 text-3xl text-pink-300">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

const features: FeatureProps[] = [
  {
    icon: <FaCamera />,
    title: "Multi-Lens Setup",
    desc: "Most phones include wide, ultra-wide, and telephoto lenses for flexibility in composition.",
  },
  {
    icon: <FaSearchPlus />,
    title: "Digital & Optical Zoom",
    desc: "Combine optical zoom and software-based zooming to capture details from afar.",
  },
  {
    icon: <FaSun />,
    title: "Night Mode",
    desc: "Low-light imaging with long exposure, noise reduction, and image stacking algorithms.",
  },
  {
    icon: <FaVideo />,
    title: "4K Video + Stabilization",
    desc: "Record cinematic-quality video with real-time stabilization and HDR.",
  },
  {
    icon: <FaImage />,
    title: "AI Scene Recognition",
    desc: "Automatically adjusts exposure, contrast, and saturation based on the scene.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Compact Yet Powerful",
    desc: "Small sensors with big impact — delivering professional-level quality in your pocket.",
  },
];
