function Footer() {
  return (
    <footer className="mt-1 border-t border-gray-200/50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3">

        <div>
          <h3 className="font-semibold text-gray-800">
            SocioSync
          </h3>

          <p className="text-sm text-gray-500">
            Smart community service management platform
          </p>
        </div>

        <div className="text-sm text-gray-500">
          © 2026 SocioSync. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;