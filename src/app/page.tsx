import { Hero, About, Skill, Experience, Contact } from '@/components';

export default function Home() {
  const HEADER = [
    {
      id: '1',
      href: '#about',
      title: 'About',
    },
    {
      id: '2',
      href: '#skills',
      title: 'Skills',
    },
    {
      id: '1',
      href: '#work',
      title: 'Work',
    },
    {
      id: '1',
      href: '#contact',
      title: 'Contact',
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-transparent backdrop-blur-xl max-md:border-gray-100 md:border-gray-100">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-4 md:px-8">
          <a target="_self" className="" href="/">
            <h3 className="text-2xl font-bold tracking-[-0.02em] text-gray-900 md:text-3xl">Kamesh</h3>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex list-none items-center gap-8">
              {HEADER.map(({ id, href, title }) => {
                return (
                  <li key={id}>
                    <a
                      href={href}
                      target="_self"
                      className="text-base font-medium text-gray-600 transition-all hover:text-gray-900 active:text-gray-600">
                      {title}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="h-6 w-0.5 bg-gray-100"></div>
            <div className="flex items-center">
              <button className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-1.5 font-medium text-gray-50 transition-colors duration-200 hover:bg-gray-700 active:bg-gray-800">
                Download CV
              </button>
            </div>
          </div>
          {/* <button
          className="[&amp;_svg]:stroke-gray-600 [&amp;_svg]:hover:stroke-gray-700 [&amp;_svg]:w-6 [&amp;_svg]:h-6 relative flex items-center justify-center rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 md:hidden"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:R1mja:"
          data-state="closed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button> */}
        </div>
      </header>
      <Hero />
      <About />
      <Skill />
      <Experience />
      <Contact />
    </>
  );
}
