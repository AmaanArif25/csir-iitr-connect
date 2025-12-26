import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, Archive as ArchiveIcon, Calendar, ChevronDown, Download, FileText } from 'lucide-react';

const archivedNotices = {
  '2024': [
    { id: 1, title: 'End of Year Report Submission', titleHi: 'वर्ष के अंत की रिपोर्ट जमा', date: '2024-11-30', department: 'Admin' },
    { id: 2, title: 'Diwali Holiday Schedule', titleHi: 'दीवाली अवकाश सूची', date: '2024-10-25', department: 'HR' },
    { id: 3, title: 'Research Grant Applications Open', titleHi: 'अनुसंधान अनुदान आवेदन खुले', date: '2024-09-15', department: 'Research' },
    { id: 4, title: 'Independence Day Celebration', titleHi: 'स्वतंत्रता दिवस समारोह', date: '2024-08-10', department: 'Admin' },
  ],
  '2023': [
    { id: 5, title: 'Annual Performance Review', titleHi: 'वार्षिक प्रदर्शन समीक्षा', date: '2023-12-15', department: 'HR' },
    { id: 6, title: 'Lab Equipment Upgrade Notice', titleHi: 'प्रयोगशाला उपकरण अपग्रेड सूचना', date: '2023-11-20', department: 'Research' },
    { id: 7, title: 'New Safety Protocols', titleHi: 'नए सुरक्षा प्रोटोकॉल', date: '2023-10-05', department: 'Admin' },
    { id: 8, title: 'IT Security Update', titleHi: 'आईटी सुरक्षा अपडेट', date: '2023-09-01', department: 'IT Cell' },
  ],
  '2022': [
    { id: 9, title: 'Building Renovation Notice', titleHi: 'भवन नवीनीकरण सूचना', date: '2022-08-10', department: 'Admin' },
    { id: 10, title: 'COVID-19 Guidelines Update', titleHi: 'COVID-19 दिशानिर्देश अपडेट', date: '2022-05-15', department: 'HR' },
    { id: 11, title: 'New Research Initiative Launch', titleHi: 'नई अनुसंधान पहल लॉन्च', date: '2022-03-20', department: 'Research' },
  ],
};

const Archive: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [openYears, setOpenYears] = useState<string[]>(['2024']);

  const toggleYear = (year: string) => {
    setOpenYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const filterNotices = (notices: typeof archivedNotices['2024']) => {
    if (!searchQuery) return notices;
    return notices.filter(notice => 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.titleHi.includes(searchQuery) ||
      notice.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg gradient-primary">
              <ArchiveIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'Archive' : 'संग्रह'}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Access past notices and archived documents' 
              : 'पिछली सूचनाएं और संग्रहीत दस्तावेज़ देखें'}
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={language === 'en' ? 'Search archived notices...' : 'संग्रहीत सूचनाएं खोजें...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {Object.entries(archivedNotices).map(([year, notices]) => {
            const filteredNotices = filterNotices(notices);
            if (filteredNotices.length === 0 && searchQuery) return null;
            
            return (
              <Collapsible 
                key={year} 
                open={openYears.includes(year)} 
                onOpenChange={() => toggleYear(year)}
              >
                <Card>
                  <CollapsibleTrigger asChild>
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">{year}</h2>
                        <Badge variant="secondary">{filteredNotices.length} {language === 'en' ? 'notices' : 'सूचनाएं'}</Badge>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openYears.includes(year) ? 'rotate-180' : ''}`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t border-border">
                      {filteredNotices.map((notice, index) => (
                        <div 
                          key={notice.id} 
                          className={`p-4 flex items-center justify-between hover:bg-muted/30 transition-colors ${
                            index !== filteredNotices.length - 1 ? 'border-b border-border/50' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                            <div>
                              <h3 className="font-medium text-foreground">
                                {language === 'en' ? notice.title : notice.titleHi}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{notice.date}</span>
                                <span>•</span>
                                <span>{notice.department}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            {language === 'en' ? 'Download' : 'डाउनलोड'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>

        {searchQuery && Object.values(archivedNotices).every(notices => filterNotices(notices).length === 0) && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === 'en' ? 'No archived notices found' : 'कोई संग्रहीत सूचना नहीं मिली'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Archive;