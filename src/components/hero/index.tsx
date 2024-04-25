import Image from 'next/image';
import React from 'react';
import { Twitter, MapPin, Linkedin } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

function Hero() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <section className="w-full py-16 md:py-20 2xl:py-24" id="hero">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:gap-12 md:px-8">
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="flex items-center justify-center md:order-last md:flex-grow md:justify-end">
              <div className="relative h-[300px] w-[280px] md:h-[360px] md:w-[320px]">
                <Image
                  alt="Headshot of Sagar"
                  width="1067"
                  height="1067"
                  className="absolute z-10 h-[280px] w-[240px] border-8  object-fill max-md:left-5 md:left-0 md:top-0 md:h-[320px] md:w-[280px]"
                  src="https://picsum.photos/200/300"
                />
                <div className="absolute h-[280px] w-[280px] border-8 border-transparent bg-gray-50 max-md:top-5 md:bottom-0 md:right-0 md:h-[320px] md:w-[280px]"></div>
              </div>
            </div>
            <div className="flex max-w-3xl flex-grow flex-col justify-center gap-8 md:order-first md:items-start md:justify-center 2xl:gap-12">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-gray-900 md:text-5xl md:font-bold md:tracking-[-0.02em] lg:text-6xl lg:leading-[72px]">
                  Hi, I'm Kamesh
                </h1>
                <p className="text-normal text-base">
                  I'm a full stack developer (React.js &amp; Node.js) with a focus on creating (and occasionally
                  designing) exceptional digital experiences that are fast, accessible, visually appealing, and
                  responsive. Even though I have been creating web applications for over 7 years, I still love it as if
                  it was something new.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <MapPin className="size-[24px] text-gray-600" />
                  <p className="text-normal text-base">Chennai, India</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="relative flex items-center justify-center rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200">
                  <FaXTwitter className="size-[24px] text-gray-600" />
                </button>
                <button className="relative flex items-center justify-center rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200">
                  <Linkedin className="size-[24px] text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export { Hero };
