import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  Phone, Mail, MapPin, Clock, Send, Upload, 
  Building2, Globe, MessageSquare 
} from 'lucide-react';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(language === 'en' ? 'Message sent successfully!' : 'संदेश सफलतापूर्वक भेजा गया!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: language === 'en' ? 'Address' : 'पता',
      value: 'Vishvigyan Bhawan, 31, Mahatma Gandhi Marg, Lucknow - 226001, Uttar Pradesh',
      valueHi: 'विश्वविज्ञान भवन, 31, महात्मा गांधी मार्ग, लखनऊ - 226001, उत्तर प्रदेश',
    },
    {
      icon: Phone,
      label: language === 'en' ? 'Phone' : 'फ़ोन',
      value: '+91-522-2628227, +91-522-2628228',
      link: 'tel:+915222628227',
    },
    {
      icon: Mail,
      label: language === 'en' ? 'Email' : 'ईमेल',
      value: 'intranet@iitr.res.in',
      link: 'mailto:intranet@iitr.res.in',
    },
    {
      icon: Clock,
      label: language === 'en' ? 'Office Hours' : 'कार्यालय समय',
      value: language === 'en' ? 'Monday - Friday: 9:00 AM - 5:30 PM' : 'सोमवार - शुक्रवार: सुबह 9:00 - शाम 5:30',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg gradient-primary">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'Contact Us' : 'संपर्क करें'}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Get in touch with CSIR-IITR administration' 
              : 'CSIR-IITR प्रशासन से संपर्क करें'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  {language === 'en' ? 'Contact Information' : 'संपर्क जानकारी'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                        {info.link ? (
                          <a href={info.link} className="font-medium text-foreground hover:text-primary transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium text-foreground">
                            {info.valueHi || info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="overflow-hidden">
              <div className="h-64 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    {language === 'en' ? 'Interactive Map' : 'इंटरैक्टिव मानचित्र'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    CSIR-IITR, Lucknow
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                {language === 'en' ? 'Send a Message' : 'संदेश भेजें'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{language === 'en' ? 'Full Name' : 'पूरा नाम'}</Label>
                  <Input
                    id="name"
                    placeholder={language === 'en' ? 'Enter your name' : 'अपना नाम दर्ज करें'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{language === 'en' ? 'Email Address' : 'ईमेल पता'}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === 'en' ? 'Enter your email' : 'अपना ईमेल दर्ज करें'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{language === 'en' ? 'Subject' : 'विषय'}</Label>
                  <Input
                    id="subject"
                    placeholder={language === 'en' ? 'Enter subject' : 'विषय दर्ज करें'}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{language === 'en' ? 'Message' : 'संदेश'}</Label>
                  <Textarea
                    id="message"
                    placeholder={language === 'en' ? 'Write your message here...' : 'अपना संदेश यहाँ लिखें...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === 'en' ? 'Attachment (Optional)' : 'संलग्नक (वैकल्पिक)'}</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Click to upload or drag and drop' : 'अपलोड करने के लिए क्लिक करें'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, JPG (max 5MB)
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Send Message' : 'संदेश भेजें'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;