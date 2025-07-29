import React from 'react';
import Link from 'next/link';
import { PiCatFill } from 'react-icons/pi';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-800 mt-20">
      <div className="max-w-8xl mx-auto px-36 py-12">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg">
                <PiCatFill className="text-3xl text-white" />
              </div>
              <span className="text-3xl font-semibold font-playwrite">
                Roon
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-sm mb-6">
              Experience seamless real-time messaging with advanced privacy
              controls. Keep your conversations secure while staying connected.
            </p>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/ojasvi004"
                className="text-zinc-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com/in/ojasvidoye"
                className="text-zinc-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a
                href="mailto:ojasviverma004@gmail.com"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="text-2xl" />
              </a>
            </div>
          </div>

          <div className="flex space-x-16">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Downloads
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/ojasvi004/Roon"
                    className="text-zinc-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-800">
          <div className="text-zinc-400 text-sm mb-4 md:mb-0">
            © 2025 Roon. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
