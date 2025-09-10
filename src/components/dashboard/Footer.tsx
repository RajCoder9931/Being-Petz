import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className=" container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Links */}
        <div className="flex gap-6 text-sm mb-3 md:mb-0">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-and-conditions" className="hover:underline">
            Terms & Conditions
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
