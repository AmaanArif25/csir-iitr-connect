import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Shield,
  Globe,
  ArrowRight,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Login: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const [userForm, setUserForm] = useState({ employeeId: '', password: '', remember: false });
  const [adminForm, setAdminForm] = useState({ adminId: '', password: '', remember: false });

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.employeeId || !userForm.password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error(language === 'en' ? 'Please fill all fields' : 'कृपया सभी फ़ील्ड भरें');
      return;
    }

    setIsLoading(true);
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success(language === 'en' ? 'Login successful!' : 'लॉगिन सफल!');
    navigate('/dashboard');
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminForm.adminId || !adminForm.password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error(language === 'en' ? 'Please fill all fields' : 'कृपया सभी फ़ील्ड भरें');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success(language === 'en' ? 'Admin login successful!' : 'व्यवस्थापक लॉगिन सफल!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl animate-float" />
        <div className="absolute bottom-40 right-10 w-60 h-60 rounded-full bg-primary-foreground/5 blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-28 h-28 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center mb-6 mx-auto animate-fade-up shadow-2xl">
              <div className="text-center">
                <Building2 className="w-10 h-10 text-primary-foreground mb-1" />
                <span className="text-primary-foreground font-bold text-sm">CSIR</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary-foreground mb-2 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              CSIR-IITR
            </h1>
            <p className="text-primary-foreground/70 text-lg animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {language === 'en' 
                ? 'Indian Institute of Toxicology Research'
                : 'भारतीय विषविज्ञान अनुसंधान संस्थान'}
            </p>
          </div>

          {/* Decorative Line */}
          <div className="w-24 h-1 rounded-full gradient-saffron mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }} />

          {/* Tagline */}
          <p className="text-primary-foreground/60 max-w-md text-sm leading-relaxed animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {language === 'en'
              ? 'Secure portal for internal communication, documentation, and institutional services.'
              : 'आंतरिक संचार, दस्तावेज़ीकरण और संस्थागत सेवाओं के लिए सुरक्षित पोर्टल।'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            {[
              { value: '500+', label: language === 'en' ? 'Staff' : 'कर्मचारी' },
              { value: '50+', label: language === 'en' ? 'Labs' : 'प्रयोगशालाएं' },
              { value: '1965', label: language === 'en' ? 'Since' : 'स्थापना' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                <p className="text-xs text-primary-foreground/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4 border-b border-border/50">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">IITR</span>
            </div>
            <span className="font-semibold text-foreground">CSIR-IITR</span>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="ml-auto">
            <Globe className="w-4 h-4 mr-2" />
            {language === 'en' ? 'हिंदी' : 'English'}
          </Button>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {t('login.welcome')}
              </h2>
              <p className="text-muted-foreground">
                {t('login.subtitle')}
              </p>
            </div>

            {/* Login Tabs */}
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t('login.userTab')}
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {t('login.adminTab')}
                </TabsTrigger>
              </TabsList>

              {/* User Login */}
              <TabsContent value="user">
                <form onSubmit={handleUserLogin} className={cn("space-y-5", shake && "animate-shake")}>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">{t('login.employeeId')}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="employeeId"
                        type="text"
                        placeholder="IITR-XXXX"
                        value={userForm.employeeId}
                        onChange={(e) => setUserForm({ ...userForm, employeeId: e.target.value })}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t('login.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                        className="pl-10 pr-10 h-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={userForm.remember}
                        onCheckedChange={(checked) => setUserForm({ ...userForm, remember: !!checked })}
                      />
                      <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                        {t('login.remember')}
                      </Label>
                    </div>
                    <Button variant="link" className="text-sm p-0 h-auto">
                      {t('login.forgot')}
                    </Button>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        {language === 'en' ? 'Signing in...' : 'साइन इन हो रहा है...'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t('login.button')}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Admin Login */}
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className={cn("space-y-5", shake && "animate-shake")}>
                  <div className="space-y-2">
                    <Label htmlFor="adminId">{t('login.adminId')}</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="adminId"
                        type="text"
                        placeholder="ADMIN-XXXX"
                        value={adminForm.adminId}
                        onChange={(e) => setAdminForm({ ...adminForm, adminId: e.target.value })}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">{t('login.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="adminPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={adminForm.password}
                        onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                        className="pl-10 pr-10 h-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="adminRemember"
                        checked={adminForm.remember}
                        onCheckedChange={(checked) => setAdminForm({ ...adminForm, remember: !!checked })}
                      />
                      <Label htmlFor="adminRemember" className="text-sm text-muted-foreground cursor-pointer">
                        {t('login.remember')}
                      </Label>
                    </div>
                    <Button variant="link" className="text-sm p-0 h-auto">
                      {t('login.forgot')}
                    </Button>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        {language === 'en' ? 'Signing in...' : 'साइन इन हो रहा है...'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t('login.button')}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                🔒 {language === 'en' 
                  ? 'This is a secure government portal. Unauthorized access is prohibited.'
                  : 'यह एक सुरक्षित सरकारी पोर्टल है। अनधिकृत पहुंच निषिद्ध है।'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CSIR-IITR. {language === 'en' ? 'All Rights Reserved.' : 'सर्वाधिकार सुरक्षित।'}
        </div>
      </div>
    </div>
  );
};

export default Login;
