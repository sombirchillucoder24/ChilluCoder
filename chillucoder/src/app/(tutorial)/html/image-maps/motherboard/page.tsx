"use client";

import Image from "next/image";
import {
  FaMicrochip,
  FaMemory,
  FaNetworkWired,
  FaBolt,
  FaFan,
  FaHdd,
  FaUsb,
  FaEthernet,
  FaCodeBranch,
} from "react-icons/fa";

export default function MotherboardPage() {
  return (
    <main className="bg-gray-900 text-white min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-teal-400 mb-4">Understanding the Motherboard</h1>
          <p className="text-gray-400 text-lg">
            Dive into the core of your computer and explore how this intricate circuit board powers everything.
          </p>
        </header>

        <section className="relative w-full h-[400px] mb-16 rounded-xl overflow-hidden shadow-xl">
          <Image
            src="/images/html/motherboard.webp"
            alt="Real Motherboard"
            fill
            className="object-cover"
            priority
          />
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </section>

        <section className="bg-gray-800 rounded-2xl p-10 shadow-lg mb-20">
          <h2 className="text-3xl font-bold text-teal-300 mb-6 text-center">How the Motherboard Works</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            A motherboard, also known as the mainboard, is a printed circuit board (PCB) that connects and allows communication between crucial electronic components of a computer system. It hosts the CPU, RAM, and connectors for storage devices, input/output ports, and other peripherals.
          </p>
          <p className="text-gray-400">
            Modern motherboards also come equipped with integrated chips for sound, networking, Bluetooth, and Wi-Fi. High-performance systems often use motherboards with support for overclocking, M.2 SSD slots, RGB headers, and advanced power management.
          </p>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-300 mb-4">Quick Facts</h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-lg text-gray-200">
            <li className="bg-gray-700 py-3 px-5 rounded-lg shadow">ATX is the most common motherboard form factor.</li>
            <li className="bg-gray-700 py-3 px-5 rounded-lg shadow">The chipset determines feature support and CPU compatibility.</li>
            <li className="bg-gray-700 py-3 px-5 rounded-lg shadow">M.2 slots are used for high-speed NVMe SSDs.</li>
            <li className="bg-gray-700 py-3 px-5 rounded-lg shadow">SATA ports connect traditional HDDs and SSDs.</li>
            <li className="bg-gray-700 py-3 px-5 rounded-lg shadow">BIOS/UEFI is firmware stored on a chip on the motherboard.</li>
            <li className="bg-gray-700 py-3 px-5 rounded-lg shadow">Most boards support dual-channel or quad-channel memory.</li>
          </ul>
        </section>

        <footer className="text-center text-sm text-gray-500 border-t border-gray-700 pt-8">
          &copy; {new Date().getFullYear()} Hardware Insights | Learn more about PC components with us.
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
    <div className="bg-gray-800 rounded-xl p-6 shadow hover:shadow-blue-400/40 hover:scale-105 transition duration-300 ease-in-out">
      <div className="mb-4 text-3xl text-teal-400">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

const features: FeatureProps[] = [
  {
    icon: <FaMicrochip />,
    title: "CPU Socket",
    desc: "The primary slot where your computer’s processor is installed. It connects directly to the chipset.",
  },
  {
    icon: <FaMemory />,
    title: "RAM Slots",
    desc: "Houses memory modules (DDR4/DDR5). More slots = higher memory capacity.",
  },
  {
    icon: <FaNetworkWired />,
    title: "PCIe Slots",
    desc: "Used to install graphics cards, Wi-Fi cards, and other expansion boards.",
  },
  {
    icon: <FaBolt />,
    title: "Power Connectors",
    desc: "Main ATX and CPU power inputs distribute electricity across the motherboard.",
  },
  {
    icon: <FaHdd />,
    title: "Storage Interfaces",
    desc: "SATA and M.2 ports allow connecting hard drives and SSDs for data storage.",
  },
  {
    icon: <FaFan />,
    title: "Cooling System Headers",
    desc: "Connect CPU, case, and AIO cooler fans to manage system thermals.",
  },
  {
    icon: <FaUsb />,
    title: "USB Ports & Headers",
    desc: "Allow connection of peripherals like keyboards, mice, and USB drives.",
  },
  {
    icon: <FaEthernet />,
    title: "Networking Interface",
    desc: "Includes onboard Ethernet ports and headers for Wi-Fi modules.",
  },
  {
    icon: <FaCodeBranch />,
    title: "Chipset & VRMs",
    desc: "Control communication between CPU, memory, and devices; VRMs regulate power delivery.",
  },
];
