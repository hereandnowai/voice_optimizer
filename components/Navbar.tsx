
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND_CONFIG, FeatureModule } from '../constants.ts';
import { NavItem } from '../types.ts';
import { MenuIcon, CloseIcon, AnalyzeIcon, KeywordIcon, OptimizeIcon, SimulateIcon, BriefIcon, DashboardIcon, PrivacyIcon } from './common/Icons.tsx';

const moduleNavItems: NavItem[] = [
  { name: FeatureModule.ContentAnalyzer, path: `/${FeatureModule.ContentAnalyzer.toLowerCase().replace(/\s+/g, '-')}`, icon: <AnalyzeIcon className="w-5 h-5 mr-2" /> },
  { name: FeatureModule.KeywordGenerator, path: `/${FeatureModule.KeywordGenerator.toLowerCase().replace(/\s+/g, '-')}`, icon: <KeywordIcon className="w-5 h-5 mr-2" /> },
  { name: FeatureModule.SeoOptimizer, path: `/${FeatureModule.SeoOptimizer.toLowerCase().replace(/\s+/g, '-')}`, icon: <OptimizeIcon className="w-5 h-5 mr-2" /> },
  { name: FeatureModule.CommandSimulator, path: `/${FeatureModule.CommandSimulator.toLowerCase().replace(/\s+/g, '-')}`, icon: <SimulateIcon className="w-5 h-5 mr-2" /> },
  { name: FeatureModule.BriefGenerator, path: `/${FeatureModule.BriefGenerator.toLowerCase().replace(/\s+/g, '-')}`, icon: <BriefIcon className="w-5 h-5 mr-2" /> },
  { name: FeatureModule.Dashboard, path: `/${FeatureModule.Dashboard.toLowerCase().replace(/\s+/g, '-')}`, icon: <DashboardIcon className="w-5 h-5 mr-2" /> },
  { name: FeatureModule.Privacy, path: `/${FeatureModule.Privacy.toLowerCase().replace(/\s+/g, '-')}`, icon: <PrivacyIcon className="w-5 h-5 mr-2" /> },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#004040] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-12 w-auto" src={BRAND_CONFIG.brand.logo.title} alt={BRAND_CONFIG.brand.shortName} />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {moduleNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-[#FFDF00] text-[#004040]'
                      : 'text-gray-300 hover:bg-teal-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-teal-800 inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <MenuIcon className="block h-6 w-6" /> : <CloseIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {moduleNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-[#FFDF00] text-[#004040]'
                    : 'text-gray-300 hover:bg-teal-700 hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};