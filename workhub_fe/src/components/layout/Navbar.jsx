import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from '@mui/icons-material';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">WorkHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-gray-700 hover:text-primary">
              Tìm việc
            </Link>
            <Link to="/companies" className="text-gray-700 hover:text-primary">
              Công ty
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-primary">
              Tài nguyên
            </Link>
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              Đăng nhập
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/jobs"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
            >
              Tìm việc
            </Link>
            <Link
              to="/companies"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
            >
              Công ty
            </Link>
            <Link
              to="/resources"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
            >
              Tài nguyên
            </Link>
            <div className="relative px-3 py-2">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-6 top-4 text-gray-400" />
            </div>
            <Link
              to="/login"
              className="block px-3 py-2 text-white bg-primary rounded-lg hover:bg-primary/90"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 