import React from 'react';

function About() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-20 2xl:py-24" id="about">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:gap-12 md:px-8">
        <div className="self-center">
          <div className="flex items-center justify-center rounded-xl bg-gray-200 px-5 py-1">
            <p className="text-normal text-sm font-medium">About me</p>
          </div>
        </div>
        <div className="flex w-full flex-col md:flex-row">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 text-center">
            <h3 className="font-semibold tracking-[-0.02em] text-gray-900 md:text-3xl">
              Curious about me? Here you have it:
            </h3>
            <p className="text-normal text-base">
              I'm a passionate,
              <a
                target="_blank"
                className="underline underline-offset-4 transition-all hover:text-gray-900 active:text-gray-600"
                href="https://www.figma.com/@shahsagarm">
                self-proclaimed designer
              </a>
              who specializes in full stack development (React.js &amp; Node.js). I am enthusiastic about bringing the
              technical and visual aspects of digital products to life. User experience, pixel perfect design, and
              writing clear, readable, highly performant code matters to me.
            </p>
            <p className="text-normal text-base">
              I began my journey as a web developer in 2015, and since then, I've continued to grow and evolve as a
              developer, taking on new challenges and learning the latest technologies along the way. Now, in my early
              thirties, 7 years after starting my web development journey, I'm building cutting-edge web applications
              using modern technologies such as Next.js, TypeScript, Nestjs, Tailwindcss, Supabase and much more.
            </p>
            <p className="text-normal text-base">
              I am very much a progressive thinker and enjoy working on products end to end, from ideation all the way
              to development.
            </p>
            <p className="text-normal text-base">
              When I'm not in full-on developer mode, you can find me hovering around on twitter or on indie hacker,
              witnessing the journey of early startups or enjoying some free time. You can follow me on
              <a
                target="_blank"
                className="underline underline-offset-4 transition-all hover:text-gray-900 active:text-gray-600"
                href="https://twitter.com/shahsagarm">
                Twitter
              </a>{' '}
              where I share tech-related bites and build in public, or you can follow me on
              <a
                target="_blank"
                className="underline underline-offset-4 transition-all hover:text-gray-900 active:text-gray-600"
                href="https://github.com/shahsagarm">
                GitHub
              </a>
              .
            </p>
            <p className="text-normal text-base">
              One last thing, I'm available for freelance work, so feel free to reach out and say hello! I promise I
              don't bite 😉
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { About };
