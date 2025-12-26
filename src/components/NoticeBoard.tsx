import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Download,
  Calendar,
  Building2,
  AlertCircle,
  FileText,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notice {
  id: number;
  titleEn: string;
  titleHi: string;
  date: string;
  department: string;
  priority: 'urgent' | 'normal';
  category: string;
}

const sampleNotices: Notice[] = [
  {
    id: 1,
    titleEn: 'Annual General Meeting - All Staff Required',
    titleHi: 'वार्षिक आम बैठक - सभी कर्मचारी आवश्यक',
    date: '2024-12-20',
    department: 'Administration',
    priority: 'urgent',
    category: 'Admin',
  },
  {
    id: 2,
    titleEn: 'New Research Equipment Installation Notice',
    titleHi: 'नए अनुसंधान उपकरण स्थापना सूचना',
    date: '2024-12-18',
    department: 'Research Division',
    priority: 'normal',
    category: 'Research',
  },
  {
    id: 3,
    titleEn: 'Holiday Schedule for January 2025',
    titleHi: 'जनवरी 2025 के लिए छुट्टी अनुसूची',
    date: '2024-12-15',
    department: 'HR Department',
    priority: 'normal',
    category: 'General',
  },
  {
    id: 4,
    titleEn: 'IT System Maintenance - Service Interruption',
    titleHi: 'आईटी सिस्टम रखरखाव - सेवा में रुकावट',
    date: '2024-12-14',
    department: 'IT Cell',
    priority: 'urgent',
    category: 'IT',
  },
  {
    id: 5,
    titleEn: 'Workshop on Advanced Toxicology Methods',
    titleHi: 'उन्नत विषविज्ञान विधियों पर कार्यशाला',
    date: '2024-12-12',
    department: 'Training Division',
    priority: 'normal',
    category: 'Training',
  },
];

const NoticeBoard: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNotices = sampleNotices.filter((notice) => {
    const title = language === 'en' ? notice.titleEn : notice.titleHi;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Admin', 'Research', 'General', 'IT', 'Training'];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Notice Board */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-saffron flex items-center justify-center shadow-button">
                    <FileText className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  {t('notices.title')}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {language === 'en' ? 'Stay updated with the latest announcements' : 'नवीनतम घोषणाओं से अपडेट रहें'}
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {language === 'en' ? 'Filters' : 'फ़िल्टर'}
              </Button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('notices.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card shadow-card border-border/50"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? (language === 'en' ? 'All' : 'सभी') : category}
                </Button>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="current">{t('notices.current')}</TabsTrigger>
                <TabsTrigger value="archived">{t('notices.archived')}</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-4">
                {filteredNotices.map((notice, index) => (
                  <NoticeCard 
                    key={notice.id} 
                    notice={notice} 
                    language={language} 
                    t={t}
                    delay={index * 0.1}
                  />
                ))}
              </TabsContent>

              <TabsContent value="archived">
                <div className="text-center py-12 text-muted-foreground">
                  {language === 'en' ? 'No archived notices' : 'कोई पुरालेख सूचना नहीं'}
                </div>
              </TabsContent>
            </Tabs>

            {/* View All */}
            <div className="mt-6 text-center">
              <Button variant="outline" className="group">
                {t('notices.viewAll')}
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <aside className="lg:w-80 space-y-4">
            <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
              <h3 className="font-semibold text-foreground mb-4">
                {language === 'en' ? 'Quick Stats' : 'त्वरित आंकड़े'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Total Notices' : 'कुल सूचनाएं'}
                  </span>
                  <span className="font-bold text-foreground">142</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Urgent' : 'अत्यावश्यक'}
                  </span>
                  <span className="font-bold text-destructive">3</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'This Week' : 'इस सप्ताह'}
                  </span>
                  <span className="font-bold text-secondary">12</span>
                </div>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
              <h3 className="font-semibold text-foreground mb-4">
                {language === 'en' ? 'Recent Updates' : 'हाल के अपडेट'}
              </h3>
              <div className="space-y-3">
                {sampleNotices.slice(0, 3).map((notice) => (
                  <div key={notice.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground line-clamp-1">
                        {language === 'en' ? notice.titleEn : notice.titleHi}
                      </p>
                      <p className="text-muted-foreground text-xs">{notice.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

interface NoticeCardProps {
  notice: Notice;
  language: string;
  t: (key: string) => string;
  delay: number;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, language, t, delay }) => {
  return (
    <div 
      className="group bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover border border-border/50 transition-all duration-300 animate-fade-up cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant={notice.priority === 'urgent' ? 'destructive' : 'secondary'}
              className="text-xs"
            >
              {notice.priority === 'urgent' ? (
                <><AlertCircle className="w-3 h-3 mr-1" />{t('notices.urgent')}</>
              ) : (
                t('notices.normal')
              )}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {notice.category}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {language === 'en' ? notice.titleEn : notice.titleHi}
          </h3>
          
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {notice.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              {notice.department}
            </span>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default NoticeBoard;
