"use client";

import Image from "next/image";
import {
  FaFingerprint,
  FaArrowLeft,
  FaRegSmile,
  FaUniversalAccess,
  FaRegLightbulb,
  FaMicrochip,
} from "react-icons/fa";

export default function HomeButtonPage() {
  return (
    <main className="bg-black text-white min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-orange-500">Smartphone Home Button</h1>
          <p className="text-gray-400 text-lg mt-3">
            Unlock. Navigate. Control. One press to manage it all — and more.
          </p>
        </header>

        <section className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg mb-16">
          <Image
            src="/images/html/home-button.webp"
            alt="Mobile Home Button Features"
            fill
            className="object-contain"
            priority
          />
        </section>

        <section className="grid md:grid-cols-2 gap-10 mb-20">
          {features.map((f, i) => (
            <Feature key={i} {...f} />
          ))}
        </section>

        <section className="bg-gray-900 rounded-xl p-8 shadow-lg text-gray-300 leading-relaxed mb-16 text-lg">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">Hidden Things You Didn't Know</h2>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>Long Press:</strong> Acts as a voice assistant trigger on older Android and iPhones.
            </li>
            <li>
              <strong>Double Tap:</strong> Can switch between apps faster than swipe gestures.
            </li>
            <li>
              <strong>Customizable via Accessibility:</strong> You can remap actions (e.g., triple tap = camera).
            </li>
            <li>
              <strong>Haptic Engine:</strong> The button doesn't physically move on newer devices. It simulates a click via vibration.
            </li>
            <li>
              <strong>Hidden Diagnostic Mode:</strong> Pressing the button + other keys on boot opens internal test modes (Android).
            </li>
            <li>
              <strong>Gesture Layer:</strong> Some UIs detect swipe gestures *from the button itself* (Home → Multitask).
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 hover:shadow-md hover:shadow-orange-500/30 transition duration-300">
      <div className="text-3xl text-orange-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

const features: FeatureProps[] = [
  {
    icon: <FaFingerprint />,
    title: "Touch ID Sensor",
    desc: "Biometric authentication to securely unlock your phone, apps, and authorize payments.",
  },
  {
    icon: <FaArrowLeft />,
    title: "Quick Navigation",
    desc: "A single press can take you to the home screen or multitasking menu with gestures.",
  },
  {
    icon: <FaRegSmile />,
    title: "Tactile Feedback",
    desc: "Simulated button click using the haptic engine for physical feedback without actual movement.",
  },
  {
    icon: <FaUniversalAccess />,
    title: "Accessibility Control",
    desc: "Home button functions can be remapped for users with physical or visual impairments.",
  },
  {
    icon: <FaRegLightbulb />,
    title: "Smart Actions",
    desc: "Triggers flashlight, screenshots, or open apps via shortcuts, long press, or tap combinations.",
  },
  {
    icon: <FaMicrochip />,
    title: "Gesture + Button Integration",
    desc: "Some phones blend gesture control with physical input — swipe from button edge for multitasking.",
  },
];
