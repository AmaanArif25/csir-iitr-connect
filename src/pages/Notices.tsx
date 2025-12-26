import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Download, Calendar, Building2, Filter, Bell } from 'lucide-react';

const notices = [
  {
    id: 1,
    title: 'Annual General Meeting Notice',
    titleHi: 'वार्षिक सामान्य बैठक सूचना',
    date: '2024-12-20',
    department: 'Administration',
    category: 'General',
    priority: 'normal',
    archived: false,
  },
  {
    id: 2,
    title: 'Laboratory Safety Guidelines Update',
    titleHi: 'प्रयोगशाला सुरक्षा दिशानिर्देश अपडेट',
    date: '2024-12-18',
    department: 'Research',
    category: 'Research',
    priority: 'urgent',
    archived: false,
  },
  {
    id: 3,
    title: 'Holiday Schedule for January 2025',
    titleHi: 'जनवरी 2025 के लिए अवकाश सूची',
    date: '2024-12-15',
    department: 'HR',
    category: 'Admin',
    priority: 'normal',
    archived: false,
  },
  {
    id: 4,
    title: 'IT System Maintenance Notification',
    titleHi: 'आईटी सिस्टम रखरखाव अधिसूचना',
    date: '2024-12-10',
    department: 'IT Cell',
    category: 'Admin',
    priority: 'urgent',
    archived: false,
  },
  {
    id: 5,
    title: 'Research Funding Application Deadline',
    titleHi: 'अनुसंधान निधि आवेदन की अंतिम तिथि',
    date: '2024-11-25',
    department: 'Finance',
    category: 'Research',
    priority: 'normal',
    archived: true,
  },
];

const Notices: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.titleHi.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentNotices = filteredNotices.filter(n => !n.archived);
  const archivedNotices = filteredNotices.filter(n => n.archived);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg gradient-primary">
              <Bell className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'Notice Board' : 'सूचना पट्ट'}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Stay updated with the latest announcements and notifications' 
              : 'नवीनतम घोषणाओं और सूचनाओं से अपडेट रहें'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={language === 'en' ? 'Search notices...' : 'सूचनाएं खोजें...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              {language === 'en' ? 'All' : 'सभी'}
            </Button>
            <Button
              variant={selectedCategory === 'Admin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('Admin')}
            >
              {language === 'en' ? 'Admin' : 'प्रशासन'}
            </Button>
            <Button
              variant={selectedCategory === 'Research' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('Research')}
            >
              {language === 'en' ? 'Research' : 'अनुसंधान'}
            </Button>
            <Button
              variant={selectedCategory === 'General' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('General')}
            >
              {language === 'en' ? 'General' : 'सामान्य'}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="current">
              {language === 'en' ? 'Current Notices' : 'वर्तमान सूचनाएं'} ({currentNotices.length})
            </TabsTrigger>
            <TabsTrigger value="archived">
              {language === 'en' ? 'Archived' : 'संग्रहीत'} ({archivedNotices.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="grid gap-4">
              {currentNotices.map((notice) => (
                <Card key={notice.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {notice.priority === 'urgent' && (
                            <Badge variant="destructive">
                              {language === 'en' ? 'Urgent' : 'अत्यावश्यक'}
                            </Badge>
                          )}
                          <Badge variant="secondary">{notice.category}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {language === 'en' ? notice.title : notice.titleHi}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {notice.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {notice.department}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Download' : 'डाउनलोड'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archived">
            <div className="grid gap-4">
              {archivedNotices.map((notice) => (
                <Card key={notice.id} className="opacity-75 hover:opacity-100 transition-opacity">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">{notice.category}</Badge>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {language === 'en' ? notice.title : notice.titleHi}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {notice.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {notice.department}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Download' : 'डाउनलोड'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Notices;