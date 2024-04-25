import React from 'react';

function Skill() {
  return (
    <section className="bg-gray w-full py-16 md:py-20 2xl:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:gap-12 md:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="self-center">
            <div className="flex items-center justify-center rounded-xl bg-gray-200 px-5 py-1">
              <p className="text-normal text-sm font-medium">Skills</p>
            </div>
          </div>
          <p className="text-normal max-w-xl text-center text-lg md:text-xl">
            The skills, tools and technologies I am really good at:
          </p>
        </div>
        <div className="grid grid-cols-3 gap-y-4 md:grid-cols-6 md:gap-y-8 lg:grid-cols-8 lg:gap-y-12">
          <div className="flex flex-col items-center gap-2">
            <a target="_blank" className="" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
              {/* <img alt="Javascript" loading="lazy" width="64" height="64" decoding="async" data-nimg="1" className="transition-transform duration-300 md:hover:scale-110" src="/_next/static/media/icon-javascript.d5945e90.svg" style="color: transparent;"> */}
            </a>
            <p className="text-normal text-base md:text-lg">Javascript</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Skill };
