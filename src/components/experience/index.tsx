import React from 'react';

function Experience() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-20 2xl:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:gap-12 md:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="self-center">
            <div className="flex items-center justify-center rounded-xl bg-gray-200 px-5 py-1">
              <p className="text-normal text-sm font-medium">Experience</p>
            </div>
          </div>
          <p className="text-normal max-w-xl text-center text-lg md:text-xl">
            Here is a quick summary of my most recent experiences:
          </p>
        </div>
        <div className="bg-gray mx-auto flex w-full max-w-4xl flex-col justify-between gap-4 rounded-xl p-8 shadow-md md:flex-row md:gap-8 dark:bg-gray-100 dark:shadow-2xl">
          <div className="max-md:order-1 md:w-1/4">
            {/* <img alt="Upwork logo" loading="lazy" width="102" height="28" decoding="async" data-nimg="1" className="max-w-[120px]" src="/_next/static/media/logo-upwork.5f1fcd5c.svg" style="color: transparent;"> */}
          </div>
          <div className="flex flex-col gap-4 max-md:order-3 md:w-2/4">
            <p className="text-lg font-semibold text-gray-900 md:text-xl">Independent Freelancer</p>
            <ul className="flex list-disc flex-col gap-2 md:gap-1">
              <li className="text-normal text-base">
                Worked for various clients like Fiskil, Shosho, Crowe MacKay LLP.
              </li>
              <li className="text-normal text-base">
                Worked with a variety of technologies, including React, Next.js, Typescript, Express.js, PostgreSQL,
                Tailwindcss, Mui, Firebase, Storybook, Cypress, and others.
              </li>
            </ul>
          </div>
          <div className="max-md:order-2 md:w-1/4">
            <p className="text-base text-gray-700 md:text-right">Nov 2021 Present</p>
          </div>
        </div>
        <div className="bg-gray mx-auto flex w-full max-w-4xl flex-col justify-between gap-4 rounded-xl p-8 shadow-md md:flex-row md:gap-8 dark:bg-gray-100 dark:shadow-2xl">
          <div className="max-md:order-1 md:w-1/4">
            {/* <img alt="Greenapex logo" loading="lazy" width="142" height="32" decoding="async" data-nimg="1" className="max-w-[120px]" src="/_next/static/media/logo-greenapex.f61a5e20.svg" style="color: transparent;"> */}
          </div>
          <div className="flex flex-col gap-4 max-md:order-3 md:w-2/4">
            <p className="text-lg font-semibold text-gray-900 md:text-xl">Team Lead</p>
            <ul className="flex list-disc flex-col gap-2 md:gap-1">
              <li className="text-normal text-base">Acted as team lead in different projects.</li>
              <li className="text-normal text-base">
                Brainstormed new ideas &amp; gathered requirements for internal projects.
              </li>
              <li className="text-normal text-base">
                Designed architecture of different projects (frontend + backend).
              </li>
              <li className="text-normal text-base">Worked on enterprise-level projects for a variety of clients.</li>
              <li className="text-normal text-base">Handled sprint planning &amp; task distribution.</li>
            </ul>
          </div>
          <div className="max-md:order-2 md:w-1/4">
            <p className="text-base text-gray-700 md:text-right">Jul 2017 Oct 2021</p>
          </div>
        </div>
        <div className="bg-gray mx-auto flex w-full max-w-4xl flex-col justify-between gap-4 rounded-xl p-8 shadow-md md:flex-row md:gap-8 dark:bg-gray-100 dark:shadow-2xl">
          <div className="max-md:order-1 md:w-1/4">
            {/* <img alt="Dotnpixel logo" loading="lazy" width="91" height="32" decoding="async" data-nimg="1" className="max-w-[120px]" src="/_next/static/media/logo-dotnpixel.11466e70.svg" style="color: transparent;"> */}
          </div>
          <div className="flex flex-col gap-4 max-md:order-3 md:w-2/4">
            <p className="text-lg font-semibold text-gray-900 md:text-xl">Full Stack Developer</p>
            <ul className="flex list-disc flex-col gap-2 md:gap-1">
              <li className="text-normal text-base">Worked as a full stack developer (React / Laravel).</li>
            </ul>
          </div>
          <div className="max-md:order-2 md:w-1/4">
            <p className="text-base text-gray-700 md:text-right">Dec 2015 May 2017</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Experience };
