import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Download, FileText, Users, Wallet, Plane, 
  GraduationCap, Building2, ClipboardList, FileCheck 
} from 'lucide-react';

const forms = [
  {
    id: 1,
    name: 'Leave Application Form',
    nameHi: 'अवकाश आवेदन पत्र',
    department: 'HR',
    icon: Plane,
    format: 'PDF',
  },
  {
    id: 2,
    name: 'Travel Allowance Claim',
    nameHi: 'यात्रा भत्ता दावा',
    department: 'Finance',
    icon: Wallet,
    format: 'PDF',
  },
  {
    id: 3,
    name: 'Medical Reimbursement Form',
    nameHi: 'चिकित्सा प्रतिपूर्ति फार्म',
    department: 'HR',
    icon: FileCheck,
    format: 'DOC',
  },
  {
    id: 4,
    name: 'Training Request Form',
    nameHi: 'प्रशिक्षण अनुरोध प्रपत्र',
    department: 'HR',
    icon: GraduationCap,
    format: 'PDF',
  },
  {
    id: 5,
    name: 'Asset Requisition Form',
    nameHi: 'संपत्ति मांग प्रपत्र',
    department: 'Admin',
    icon: ClipboardList,
    format: 'PDF',
  },
  {
    id: 6,
    name: 'Project Proposal Template',
    nameHi: 'परियोजना प्रस्ताव टेम्पलेट',
    department: 'Research',
    icon: FileText,
    format: 'DOC',
  },
  {
    id: 7,
    name: 'Conference Attendance Form',
    nameHi: 'सम्मेलन उपस्थिति प्रपत्र',
    department: 'Research',
    icon: Users,
    format: 'PDF',
  },
  {
    id: 8,
    name: 'Equipment Request Form',
    nameHi: 'उपकरण अनुरोध प्रपत्र',
    department: 'Admin',
    icon: Building2,
    format: 'PDF',
  },
];

const OfficialForms: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const departments = ['all', 'HR', 'Finance', 'Admin', 'Research'];

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.nameHi.includes(searchQuery);
    const matchesDept = selectedDept === 'all' || form.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg gradient-primary">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'Official Forms' : 'आधिकारिक प्रपत्र'}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Download and submit official forms for various departments' 
              : 'विभिन्न विभागों के लिए आधिकारिक प्रपत्र डाउनलोड और जमा करें'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={language === 'en' ? 'Search forms...' : 'प्रपत्र खोजें...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {departments.map(dept => (
              <Button
                key={dept}
                variant={selectedDept === dept ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDept(dept)}
              >
                {dept === 'all' ? (language === 'en' ? 'All' : 'सभी') : dept}
              </Button>
            ))}
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredForms.map((form) => {
            const IconComponent = form.icon;
            return (
              <Card key={form.id} className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {language === 'en' ? form.name : form.nameHi}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{form.department}</Badge>
                    <Badge variant="outline">{form.format}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Download' : 'डाउनलोड'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OfficialForms;