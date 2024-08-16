import React from "react";
import Link from "next/link";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import Image from "next/image";
import Logo from '@/public/logo.png'

// SVG Components as React Icons
const GithubIcon = () => <FiGithub className="w-6 h-6" />;
const LinkedInIcon = () => <FiLinkedin className="w-6 h-6" />;

const SmallFooter = (props) => {
  // Common anchor styles
  const anchorStyles =
    "text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80 cursor-pointer";

  return (
    <section className="py-12 bg-gradient-to-r from-[#EB095F] to-orange-700">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
          <div className="xl:flex xl:items-center xl:justify-start">
            <Image
              className="w-auto mx-auto h-10"
              src={Logo}
              alt="Card Flix Logo"
              height={300}
              width={300}
            />
            <p className="mt-5 text-sm text-white xl:ml-6 xl:mt-0">
              © Copyright 2024 Card Flix
            </p>
          </div>

          <div className="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
              <li>
                <Link href="/generate">
                  <span className={anchorStyles}>Create</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className={anchorStyles}>About</span>
                </Link>
              </li>
              <li>
                <Link href="https://kannankarthikeyan.com">
                  <span className={anchorStyles}>Developer</span>
                </Link>
              </li>
              <li>
                <Link href="/support">
                  <span className={anchorStyles}>Support</span>
                </Link>
              </li>
            </ul>

            <div className="w-full h-px mt-8 mb-5 xl:w-px xl:m-0 xl:h-6 bg-gray-50/20"></div>

            <ul className="flex items-center justify-center space-x-8 xl:justify-end">
              <li>
                <a
                  href="https://github.com/notkannan"
                  title="Github"
                  className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/kannankarthikeyan4/"
                  title="LinkedIn"
                  className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmallFooter;
