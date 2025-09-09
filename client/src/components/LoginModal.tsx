import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthActions, useIsLoginOpen } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const { closeLogin, openRegister, setUser } = useAuthActions();
  const isLoginOpen = useIsLoginOpen();
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return response.json();
    },
    onSuccess: (userData) => {
      setUser(userData);
      closeLogin();
      toast({
        title: "লগইন সফল",
        description: "আপনি সফলভাবে লগইন করেছেন।",
      });
    },
    onError: () => {
      toast({
        title: "লগইন ব্যর্থ",
        description: "ইমেইল অথবা পাসওয়ার্ড ভুল।",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={closeLogin}
        data-testid="login-overlay"
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">সাইন ইন</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeLogin}
              data-testid="button-close-login"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  ইউজারনেম বা ইমেইল ঠিকানা *
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                  data-testid="input-login-email"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-foreground">
                  পাসওয়ার্ড *
                </Label>
                <div className="relative mt-2">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-12"
                    data-testid="input-login-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loginMutation.isPending}
                data-testid="button-submit-login"
              >
                {loginMutation.isPending ? "লগইন হচ্ছে..." : "লগ ইন"}
              </Button>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    data-testid="checkbox-remember-me"
                  />
                  <Label htmlFor="remember" className="text-muted-foreground">
                    আমাকে মনে রাখুন
                  </Label>
                </div>
                <Button variant="link" className="p-0 h-auto text-primary" data-testid="link-forgot-password">
                  পাসওয়ার্ড ভুলে গেছেন?
                </Button>
              </div>
            </form>
            
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-muted-foreground mb-4">এখনও অ্যাকাউন্ট নেই?</p>
              <Button 
                variant="link" 
                onClick={() => {
                  closeLogin();
                  openRegister();
                }}
                className="text-primary font-medium"
                data-testid="button-switch-to-register"
              >
                একটি অ্যাকাউন্ট তৈরি করুন
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
