export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-2 text-center">
        {/* Branding */}
        <span className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">MoReza</span>. All rights
          reserved.
        </span>

        {/* Contact */}
        <a
          href="mailto:moreza.dev@gmail.com"
          className="text-green-400 hover:text-green-300 transition text-sm"
        >
          ✉ moreza.dev@gmail.com
        </a>
      </div>
    </footer>
  );
}
