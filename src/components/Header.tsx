import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Home,
  Bell,
  FileText,
  Users,
  Monitor,
  User,
  Archive,
  Phone,
  LogIn,
  LogOut,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn = false, onLogout }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'nav.home', icon: Home, path: '/dashboard' },
    { key: 'nav.notices', icon: Bell, path: '/notices' },
    { key: 'nav.forms', icon: FileText, path: '/forms' },
    { key: 'nav.directory', icon: Users, path: '/directory' },
    { key: 'nav.itc', icon: Monitor, path: '/itc' },
    { key: 'nav.profile', icon: User, path: '/profile' },
    { key: 'nav.archive', icon: Archive, path: '/archive' },
    { key: 'nav.contact', icon: Phone, path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
      {/* Top decorative bar */}
      <div className="h-1 w-full gradient-saffron" />
      
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={isLoggedIn ? '/dashboard' : '/'} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-button group-hover:shadow-lg transition-all duration-300">
                <span className="text-primary-foreground font-bold text-lg">IITR</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary border-2 border-card animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-foreground text-sm leading-tight">CSIR-IITR</p>
              <p className="text-xs text-muted-foreground">Intranet Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {isLoggedIn && (
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{t(item.key)}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language === 'en' ? 'हिं' : 'EN'}</span>
            </Button>

            {/* Login/Logout Button */}
            {isLoggedIn ? (
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden sm:flex">
                <LogOut className="w-4 h-4 mr-2" />
                {t('nav.logout')}
              </Button>
            ) : (
              <Link to="/">
                <Button variant="default" size="sm" className="hidden sm:flex">
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('nav.login')}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            {isLoggedIn && (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isLoggedIn && mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{t(item.key)}</span>
                </Link>
              ))}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="col-span-2 mt-2"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('nav.logout')}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
