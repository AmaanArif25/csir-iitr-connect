import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Phone, Mail, MapPin, Filter } from 'lucide-react';

const staff = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    nameHi: 'डॉ. राजेश कुमार',
    designation: 'Senior Scientist',
    designationHi: 'वरिष्ठ वैज्ञानिक',
    department: 'Toxicology',
    email: 'rajesh.kumar@iitr.res.in',
    phone: '+91-522-2628301',
    office: 'Block A, Room 201',
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    nameHi: 'डॉ. प्रिया शर्मा',
    designation: 'Principal Scientist',
    designationHi: 'प्रधान वैज्ञानिक',
    department: 'Biochemistry',
    email: 'priya.sharma@iitr.res.in',
    phone: '+91-522-2628302',
    office: 'Block B, Room 105',
  },
  {
    id: 3,
    name: 'Mr. Amit Singh',
    nameHi: 'श्री अमित सिंह',
    designation: 'Technical Officer',
    designationHi: 'तकनीकी अधिकारी',
    department: 'IT Cell',
    email: 'amit.singh@iitr.res.in',
    phone: '+91-522-2628303',
    office: 'IT Block, Room 12',
  },
  {
    id: 4,
    name: 'Dr. Sunita Verma',
    nameHi: 'डॉ. सुनीता वर्मा',
    designation: 'Chief Scientist',
    designationHi: 'मुख्य वैज्ञानिक',
    department: 'Environmental Sciences',
    email: 'sunita.verma@iitr.res.in',
    phone: '+91-522-2628304',
    office: 'Block C, Room 301',
  },
  {
    id: 5,
    name: 'Mr. Vikram Patel',
    nameHi: 'श्री विक्रम पटेल',
    designation: 'Administrative Officer',
    designationHi: 'प्रशासनिक अधिकारी',
    department: 'Administration',
    email: 'vikram.patel@iitr.res.in',
    phone: '+91-522-2628305',
    office: 'Admin Block, Room 101',
  },
  {
    id: 6,
    name: 'Dr. Meena Gupta',
    nameHi: 'डॉ. मीना गुप्ता',
    designation: 'Senior Scientist',
    designationHi: 'वरिष्ठ वैज्ञानिक',
    department: 'Pharmacology',
    email: 'meena.gupta@iitr.res.in',
    phone: '+91-522-2628306',
    office: 'Block A, Room 305',
  },
];

const Directory: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const departments = ['all', 'Toxicology', 'Biochemistry', 'IT Cell', 'Environmental Sciences', 'Administration', 'Pharmacology'];

  const filteredStaff = staff.filter(person => {
    const matchesSearch = 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.nameHi.includes(searchQuery) ||
      person.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'all' || person.department === selectedDept;
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
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'Staff Directory' : 'कर्मचारी निर्देशिका'}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Find contact information for CSIR-IITR staff members' 
              : 'CSIR-IITR कर्मचारियों की संपर्क जानकारी खोजें'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={language === 'en' ? 'Search by name, designation, or email...' : 'नाम, पदनाम या ईमेल से खोजें...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {departments.slice(0, 4).map(dept => (
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

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((person) => (
            <Card key={person.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {language === 'en' ? person.name : person.nameHi}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {language === 'en' ? person.designation : person.designationHi}
                    </p>
                    <Badge variant="secondary" className="mb-3">
                      {person.department}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    <a href={`mailto:${person.email}`} className="hover:text-primary truncate">
                      {person.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href={`tel:${person.phone}`} className="hover:text-primary">
                      {person.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{person.office}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === 'en' ? 'No staff members found' : 'कोई कर्मचारी नहीं मिला'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Directory;