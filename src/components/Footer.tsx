import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const partnerLogos = [
  { name: 'CSIR', url: 'https://www.csir.res.in/' },
  { name: 'DST', url: 'https://dst.gov.in/' },
  { name: 'DBT', url: 'https://dbtindia.gov.in/' },
  { name: 'MoE', url: 'https://www.education.gov.in/' },
  { name: 'NIC', url: 'https://www.nic.in/' },
  { name: 'GOI', url: 'https://www.india.gov.in/' },
];

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Partner Logos Scroll */}
      <div className="border-b border-primary-foreground/10 py-6 overflow-hidden">
        <div className="container mx-auto px-4 mb-4">
          <h3 className="text-sm font-medium text-primary-foreground/70 text-center">
            {t('footer.importantLinks')}
          </h3>
        </div>
        <div className="relative">
          <div className="flex animate-scroll">
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <a
                key={`${logo.name}-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 mx-8 px-6 py-3 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-all duration-300 group"
              >
                <span className="font-semibold text-lg group-hover:text-secondary transition-colors">
                  {logo.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <span className="font-bold text-lg">IITR</span>
              </div>
              <div>
                <h3 className="font-semibold">CSIR-IITR</h3>
                <p className="text-sm text-primary-foreground/70">Intranet Portal</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-md">
              {t('footer.address')}, {t('footer.city')}. Dedicated to excellence in toxicology research 
              for public health protection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-secondary">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {['nav.notices', 'nav.forms', 'nav.directory', 'nav.contact'].map((key) => (
                <li key={key}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-secondary">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary" />
                <span className="text-primary-foreground/80">
                  Vishvigyan Bhawan, 31, Mahatma Gandhi Marg, Lucknow - 226001
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-secondary" />
                <a href="tel:+915222628227" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  +91-522-2628227
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-secondary" />
                <a href="mailto:intranet@iitr.res.in" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  intranet@iitr.res.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} CSIR-IITR. {t('footer.rights')}.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Portal Status: Online
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
