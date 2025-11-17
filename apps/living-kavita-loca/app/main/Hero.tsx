"use client";
import "./Hero.css";

export function Hero() {
  return (
    <section className="flex flex-col lg:items-center lg:justify-items-start  min-h-screen relative">
      <div className="relative inline-block scale-[0.6] md:scale-[0.5] lg:scale-75 lg:-mt-24 ">
        <img
          src="/images/living-kavita-loca-logo.png"
          alt="living kavita loca"
          className="flex self-center"
        />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2">
          <img
            src="/images/lips-glossy.png"
            alt="lips open that are glossy"
            className="lips relative z-10 scale-50 translate-x-3/8"
          />
        </div>
      </div>
    </section>
  );
}
