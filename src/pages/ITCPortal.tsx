import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, Headphones, Download, Settings, 
  CheckCircle, AlertCircle, Clock, Ticket,
  Wifi, Server, Shield, HelpCircle
} from 'lucide-react';

const systemStatus = [
  { name: 'Email Server', status: 'online', icon: Server },
  { name: 'Intranet Portal', status: 'online', icon: Monitor },
  { name: 'WiFi Network', status: 'online', icon: Wifi },
  { name: 'VPN Service', status: 'maintenance', icon: Shield },
];

const quickTools = [
  {
    title: 'Helpdesk Tickets',
    titleHi: 'हेल्पडेस्क टिकट',
    description: 'Submit and track IT support requests',
    descriptionHi: 'आईटी सहायता अनुरोध जमा करें और ट्रैक करें',
    icon: Headphones,
    count: 3,
  },
  {
    title: 'Software Requests',
    titleHi: 'सॉफ्टवेयर अनुरोध',
    description: 'Request new software installations',
    descriptionHi: 'नए सॉफ्टवेयर इंस्टॉलेशन का अनुरोध करें',
    icon: Download,
    count: 0,
  },
  {
    title: 'System Settings',
    titleHi: 'सिस्टम सेटिंग्स',
    description: 'Configure your workstation settings',
    descriptionHi: 'अपने वर्कस्टेशन सेटिंग्स कॉन्फ़िगर करें',
    icon: Settings,
    count: null,
  },
  {
    title: 'IT FAQ',
    titleHi: 'आईटी FAQ',
    description: 'Common questions and solutions',
    descriptionHi: 'सामान्य प्रश्न और समाधान',
    icon: HelpCircle,
    count: null,
  },
];

const recentTickets = [
  {
    id: 'TKT-001',
    subject: 'Email not syncing',
    status: 'open',
    date: '2024-12-20',
  },
  {
    id: 'TKT-002',
    subject: 'Printer connection issue',
    status: 'in-progress',
    date: '2024-12-19',
  },
  {
    id: 'TKT-003',
    subject: 'VPN access request',
    status: 'resolved',
    date: '2024-12-18',
  },
];

const ITCPortal: React.FC = () => {
  const { language } = useLanguage();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Online</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Maintenance</Badge>;
      case 'offline':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Offline</Badge>;
      default:
        return null;
    }
  };

  const getTicketStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline" className="text-blue-600">Open</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="text-yellow-600">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="text-green-600">Resolved</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg gradient-primary">
              <Monitor className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'ITC Portal' : 'आईटीसी पोर्टल'}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'IT Cell services, support tickets, and system status' 
              : 'आईटी सेल सेवाएं, सहायता टिकट और सिस्टम स्थिति'}
          </p>
        </div>

        {/* System Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">
              {language === 'en' ? 'System Status' : 'सिस्टम स्थिति'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {systemStatus.map((system) => {
                const IconComponent = system.icon;
                return (
                  <div key={system.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <IconComponent className="w-5 h-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{system.name}</p>
                    </div>
                    {getStatusBadge(system.status)}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.title} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-accent group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {tool.count !== null && tool.count > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {tool.count}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {language === 'en' ? tool.title : tool.titleHi}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? tool.description : tool.descriptionHi}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                {language === 'en' ? 'Recent Tickets' : 'हाल के टिकट'}
              </CardTitle>
              <CardDescription>
                {language === 'en' ? 'Your IT support requests' : 'आपके आईटी सहायता अनुरोध'}
              </CardDescription>
            </div>
            <Button>
              <Ticket className="w-4 h-4 mr-2" />
              {language === 'en' ? 'New Ticket' : 'नया टिकट'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{ticket.subject}</p>
                      <p className="text-sm text-muted-foreground">{ticket.id} • {ticket.date}</p>
                    </div>
                  </div>
                  {getTicketStatusBadge(ticket.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ITCPortal;