import React from 'react';
import { Mail, Copy, Phone, Linkedin } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

function Contact() {
  return (
    <section className="bg-gray w-full py-16 md:py-20 2xl:py-24" id="contact">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:gap-12 md:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="self-center">
            <div className="flex items-center justify-center rounded-xl bg-gray-200 px-5 py-1">
              <p className="text-normal text-sm font-medium">Get in touch</p>
            </div>
          </div>
          <p className="text-normal max-w-xl text-center text-lg md:text-xl">
            What’s next? Feel free to reach out to me if you are looking for a developer, have a query, or simply want
            to connect.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 md:gap-12">
          <div className="flex flex-col items-center md:gap-4">
            <div className="flex items-center gap-4 md:gap-5">
              <Mail className="size-[30px] text-gray-600" />
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-gray-900 md:text-4xl">
                kameshe91@gmail.com
              </h2>
              <button className="relative flex items-center justify-center rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200">
                <Copy className="size-[30px] text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-4 md:gap-5">
              <Phone className="size-[30px] text-gray-600" />
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-gray-900 md:text-4xl">+91 94454 41584</h2>
              <button className="relative flex items-center justify-center rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200">
                <Copy className="size-[30px] text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-normal text-center text-base">You may also find me on these platforms!</p>
            <div className="flex gap-1">
              <button className="relative flex items-center justify-center rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200">
                <Linkedin className="size-[24px] text-gray-600" />
              </button>
              <button className="relative flex items-center justify-center rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200">
                <FaXTwitter className="size-[24px] text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Contact };
