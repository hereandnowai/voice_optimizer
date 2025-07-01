
import React from 'react';
import { BRAND_CONFIG } from '../constants.ts';
import { SocialLink } from '../types.ts';
import { BlogIcon, LinkedInIcon, InstagramIcon, GithubIcon, XIcon, YoutubeIcon } from './common/Icons.tsx';

const socialLinks: SocialLink[] = [
  { name: 'Blog', url: BRAND_CONFIG.brand.socialMedia.blog, icon: <BlogIcon className="w-5 h-5" /> },
  { name: 'LinkedIn', url: BRAND_CONFIG.brand.socialMedia.linkedin, icon: <LinkedInIcon className="w-5 h-5" /> },
  { name: 'Instagram', url: BRAND_CONFIG.brand.socialMedia.instagram, icon: <InstagramIcon className="w-5 h-5" /> },
  { name: 'GitHub', url: BRAND_CONFIG.brand.socialMedia.github, icon: <GithubIcon className="w-5 h-5" /> },
  { name: 'X', url: BRAND_CONFIG.brand.socialMedia.x, icon: <XIcon className="w-5 h-5" /> },
  { name: 'YouTube', url: BRAND_CONFIG.brand.socialMedia.youtube, icon: <YoutubeIcon className="w-5 h-5" /> },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#004040] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img className="h-12 w-auto mb-4" src={BRAND_CONFIG.brand.logo.title} alt={BRAND_CONFIG.brand.shortName} />
            <p className="text-sm mb-2">{BRAND_CONFIG.brand.longName}</p>
            <p className="text-sm italic">"{BRAND_CONFIG.brand.slogan}"</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#FFDF00] mb-4">Contact</h3>
            <p className="text-sm mb-1">Email: <a href={`mailto:${BRAND_CONFIG.brand.email}`} className="hover:text-[#FFDF00]">{BRAND_CONFIG.brand.email}</a></p>
            <p className="text-sm mb-1">Mobile: <a href={`tel:${BRAND_CONFIG.brand.mobile.replace(/\s/g, '')}`} className="hover:text-[#FFDF00]">{BRAND_CONFIG.brand.mobile}</a></p>
            <p className="text-sm">Website: <a href={BRAND_CONFIG.brand.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#FFDF00]">{BRAND_CONFIG.brand.website}</a></p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#FFDF00] mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" title={link.name} className="text-gray-300 hover:text-[#FFDF00]">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-teal-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {BRAND_CONFIG.brand.shortName}. All rights reserved. Developed by Bilmia M Binson.</p>
        </div>
      </div>
    </footer>
  );
};
