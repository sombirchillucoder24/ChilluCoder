"use client";

import Image from "next/image";
import { FaVolumeUp, FaBluetooth, FaBatteryFull, FaMobileAlt } from "react-icons/fa";

export default function SpeakerPage() {
  return (
    <main className="bg-gray-950 text-white min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-400">Portable Bluetooth Speaker</h1>
          <p className="text-gray-400 mt-2 text-lg">
            Compact. Wireless. Loud. Take your music anywhere.
          </p>
        </header>

        <section className="relative w-full h-80 rounded-xl overflow-hidden shadow-xl mb-10">
          <Image
            src="/images/html/speaker.webp"
            alt="Mobile Speaker"
            fill
            className="object-contain"
            priority
          />
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <Feature
            icon={<FaVolumeUp className="text-red-400 text-3xl" />}
            title="Powerful Sound"
            desc="Delivers crisp highs, deep bass, and balanced mids with enhanced audio clarity for indoor and outdoor use."
          />
          <Feature
            icon={<FaBluetooth className="text-blue-400 text-3xl" />}
            title="Wireless Connectivity"
            desc="Seamlessly connects to smartphones, tablets, and laptops via Bluetooth 5.0 with stable range and low latency."
          />
          <Feature
            icon={<FaBatteryFull className="text-green-400 text-3xl" />}
            title="Long Battery Life"
            desc="Equipped with a high-capacity battery offering up to 12 hours of continuous playback on a single charge."
          />
          <Feature
            icon={<FaMobileAlt className="text-yellow-400 text-3xl" />}
            title="Portable Design"
            desc="Lightweight, sleek, and rugged. Perfect for travel, parties, camping, or daily carry in your bag."
          />
        </section>

        <section className="bg-gray-900 rounded-xl p-8 shadow-lg text-gray-300 text-lg leading-relaxed">
          <p>
            A portable speaker is designed to bring music to life wherever you go. Whether you&apos;re at the beach, relaxing at home,
            or hosting a small gathering, these compact devices offer big sound without the need for cables or bulky setups.
          </p>
          <p className="mt-4">
            Most models today are water-resistant, support stereo pairing, and come with intuitive controls and voice assistant
            integration, making them smarter and more fun than ever.
          </p>
        </section>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 hover:shadow-md hover:shadow-purple-500/20 transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
