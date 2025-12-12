import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiUser,
  FiMessageCircle,
  FiFileText,
  FiMenu,
  FiX,
  FiChevronDown,
} from 'react-icons/fi';

const NavLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        active
          ? 'text-[var(--text)] bg-[var(--surface-strong)] shadow-sm'
          : 'text-gray-700 hover:text-[var(--text)] hover:bg-[var(--surface-strong)]'
      }`}
    >
      <Icon className="text-lg" />
      <span>{label}</span>
      <span
        className={`absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-[var(--accent-strong)] transition-all duration-200 ${
          active ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-60 group-hover:scale-100'
        }`}
      />
    </Link>
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-[var(--surface)]/90 backdrop-blur border-b border-[var(--border)] sticky top-0 z-40 shadow-sm transition-shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-[var(--accent-strong)] text-[var(--text)] flex items-center justify-center text-xl font-bold shadow-md transition-transform duration-200 hover:-translate-y-0.5">
                HB
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-gray-900 leading-tight">HealBuddy</div>
                <div className="text-xs text-gray-500">AI health companion</div>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/upload-report" icon={FiFileText} label="Reports" />
            <NavLink to="/chatbot" icon={FiMessageCircle} label="AI Chat" />
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-[var(--text)] hover:bg-[var(--surface-strong)] transition-all"
            >
              <FiUser />
              <span className="hidden sm:block">Profile</span>
              <FiChevronDown className="text-sm" />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-[var(--surface-strong)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <div className={`md:hidden border-t border-[var(--border)] ${mobileOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col gap-1 py-3 bg-[var(--surface)] rounded-b-xl shadow-inner">
            <NavLink to="/upload-report" icon={FiFileText} label="Reports" />
            <NavLink to="/chatbot" icon={FiMessageCircle} label="AI Chat" />
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-[var(--text)] hover:bg-[var(--surface-strong)] transition-all"
            >
              <FiUser />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
