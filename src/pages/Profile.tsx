import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Mail, Phone, Building2, MapPin, Calendar, 
  Edit, Upload, FileText, Clock, CheckCircle 
} from 'lucide-react';

const userProfile = {
  name: 'Dr. Rajesh Kumar',
  nameHi: 'डॉ. राजेश कुमार',
  employeeId: 'IITR-2018-0542',
  designation: 'Senior Scientist',
  designationHi: 'वरिष्ठ वैज्ञानिक',
  department: 'Toxicology Division',
  departmentHi: 'विषविज्ञान प्रभाग',
  email: 'rajesh.kumar@iitr.res.in',
  phone: '+91-522-2628301',
  office: 'Block A, Room 201',
  joiningDate: '2018-04-15',
  profileCompletion: 85,
};

const recentActivity = [
  {
    action: 'Leave application submitted',
    actionHi: 'अवकाश आवेदन जमा किया गया',
    date: '2024-12-20',
    status: 'pending',
  },
  {
    action: 'Profile photo updated',
    actionHi: 'प्रोफ़ाइल फ़ोटो अपडेट किया गया',
    date: '2024-12-18',
    status: 'completed',
  },
  {
    action: 'Training request approved',
    actionHi: 'प्रशिक्षण अनुरोध स्वीकृत',
    date: '2024-12-15',
    status: 'completed',
  },
];

const uploadedDocuments = [
  { name: 'ID Card Copy', type: 'PDF', date: '2024-01-10' },
  { name: 'Educational Certificates', type: 'PDF', date: '2024-01-10' },
  { name: 'Address Proof', type: 'PDF', date: '2024-01-10' },
];

const Profile: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg gradient-primary">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'My Profile' : 'मेरी प्रोफ़ाइल'}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'View and manage your personal information' 
              : 'अपनी व्यक्तिगत जानकारी देखें और प्रबंधित करें'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                      RK
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full w-8 h-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {language === 'en' ? userProfile.name : userProfile.nameHi}
                </h2>
                <p className="text-muted-foreground mb-2">
                  {language === 'en' ? userProfile.designation : userProfile.designationHi}
                </p>
                <Badge variant="secondary">{userProfile.employeeId}</Badge>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      {language === 'en' ? 'Profile Completion' : 'प्रोफ़ाइल पूर्णता'}
                    </span>
                    <span className="font-medium text-foreground">{userProfile.profileCompletion}%</span>
                  </div>
                  <Progress value={userProfile.profileCompletion} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details & Activity */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">
                  {language === 'en' ? 'Personal Info' : 'व्यक्तिगत जानकारी'}
                </TabsTrigger>
                <TabsTrigger value="documents">
                  {language === 'en' ? 'Documents' : 'दस्तावेज़'}
                </TabsTrigger>
                <TabsTrigger value="activity">
                  {language === 'en' ? 'Activity' : 'गतिविधि'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{language === 'en' ? 'Personal Information' : 'व्यक्तिगत जानकारी'}</CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Edit' : 'संपादित करें'}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">{language === 'en' ? 'Email' : 'ईमेल'}</p>
                          <p className="font-medium text-foreground">{userProfile.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Phone className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">{language === 'en' ? 'Phone' : 'फ़ोन'}</p>
                          <p className="font-medium text-foreground">{userProfile.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Building2 className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">{language === 'en' ? 'Department' : 'विभाग'}</p>
                          <p className="font-medium text-foreground">
                            {language === 'en' ? userProfile.department : userProfile.departmentHi}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">{language === 'en' ? 'Office' : 'कार्यालय'}</p>
                          <p className="font-medium text-foreground">{userProfile.office}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">{language === 'en' ? 'Joining Date' : 'कार्यग्रहण तिथि'}</p>
                          <p className="font-medium text-foreground">{userProfile.joiningDate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{language === 'en' ? 'Uploaded Documents' : 'अपलोड किए गए दस्तावेज़'}</CardTitle>
                    <Button size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'Upload' : 'अपलोड'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {uploadedDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium text-foreground">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">{doc.type} • {doc.date}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            {language === 'en' ? 'View' : 'देखें'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Recent Activity' : 'हाल की गतिविधि'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {activity.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              {language === 'en' ? activity.action : activity.actionHi}
                            </p>
                            <p className="text-sm text-muted-foreground">{activity.date}</p>
                          </div>
                          <Badge variant={activity.status === 'completed' ? 'secondary' : 'outline'}>
                            {activity.status === 'completed' 
                              ? (language === 'en' ? 'Completed' : 'पूर्ण') 
                              : (language === 'en' ? 'Pending' : 'लंबित')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;