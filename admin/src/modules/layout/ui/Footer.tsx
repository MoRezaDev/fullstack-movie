import { FaGithub, FaLinkedin, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Mo.Reza
          </h2>
          <p className="mt-4 text-sm leading-relaxed">
            Made with ❤️ by Mo.Reza
            <br />
            <a
              href="mailto:moreza.dev@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              moreza.dev@gmail.com
            </a>
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Projects
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect</h3>
          <div className="flex gap-5 text-xl">
            <a
              href="https://github.com/MoRezaDev"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-reza-akhshabi-08958b247"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://wa.me/private"
              target="_blank"
              className="hover:text-white transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-800 text-center py-5 text-xs text-neutral-500">
        © {new Date().getFullYear()} Mo.Reza. All rights reserved.
      </div>
    </footer>
  );
}
