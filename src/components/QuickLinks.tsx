import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  Monitor,
  Archive,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickLink {
  key: string;
  descKey: string;
  icon: React.ElementType;
  path: string;
  gradient: string;
  iconBg: string;
}

const quickLinks: QuickLink[] = [
  {
    key: 'quick.forms',
    descKey: 'quick.formsDesc',
    icon: FileText,
    path: '/forms',
    gradient: 'from-blue-500/10 to-blue-600/5',
    iconBg: 'bg-blue-500',
  },
  {
    key: 'quick.directory',
    descKey: 'quick.directoryDesc',
    icon: Users,
    path: '/directory',
    gradient: 'from-emerald-500/10 to-emerald-600/5',
    iconBg: 'bg-emerald-500',
  },
  {
    key: 'quick.itc',
    descKey: 'quick.itcDesc',
    icon: Monitor,
    path: '/itc',
    gradient: 'from-purple-500/10 to-purple-600/5',
    iconBg: 'bg-purple-500',
  },
  {
    key: 'quick.archive',
    descKey: 'quick.archiveDesc',
    icon: Archive,
    path: '/archive',
    gradient: 'from-amber-500/10 to-amber-600/5',
    iconBg: 'bg-amber-500',
  },
];

const QuickLinks: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'en' ? 'Quick Access' : 'त्वरित पहुंच'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {language === 'en' ? 'Essential Services' : 'आवश्यक सेवाएं'}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Access key institutional services and resources with a single click'
              : 'एक क्लिक में प्रमुख संस्थागत सेवाओं और संसाधनों तक पहुंचें'}
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <Link
              key={link.key}
              to={link.path}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={cn(
                  "relative h-full p-6 rounded-2xl bg-gradient-to-br border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300",
                  "hover:-translate-y-1",
                  link.gradient
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110",
                    link.iconBg
                  )}
                >
                  <link.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(link.key)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(link.descKey)}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2">
                  <span>{language === 'en' ? 'Access now' : 'अभी पहुंचें'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Decorative */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
