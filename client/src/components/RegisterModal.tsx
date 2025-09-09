import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function RegisterModal() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const { isRegisterOpen, closeRegister, openLogin, setUser } = useAuth();
  const { toast } = useToast();

  const registerMutation = useMutation({
    mutationFn: async (data: { email: string; username: string; password: string; name: string }) => {
      const response = await apiRequest("POST", "/api/auth/register", data);
      return response.json();
    },
    onSuccess: (userData) => {
      setUser(userData);
      closeRegister();
      toast({
        title: "রেজিস্ট্রেশন সফল",
        description: "আপনার অ্যাকাউন্ট তৈরি হয়েছে।",
      });
    },
    onError: () => {
      toast({
        title: "রেজিস্ট্রেশন ব্যর্থ",
        description: "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate({ email, username, password, name });
  };

  if (!isRegisterOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={closeRegister}
        data-testid="register-overlay"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">My account</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeRegister}
                data-testid="button-close-register"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex mb-6 border-b border-border">
              <div className="flex-1 py-3 text-sm font-medium border-b-2 border-primary text-primary text-center">
                রেজিস্টার
              </div>
              <Button 
                variant="ghost" 
                className="flex-1 py-3 text-sm font-medium text-muted-foreground"
                onClick={() => {
                  closeRegister();
                  openLogin();
                }}
                data-testid="button-switch-to-login"
              >
                লগইন
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  নাম *
                </Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2"
                  data-testid="input-register-name"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-foreground">
                  ইউজারনেম *
                </Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-2"
                  data-testid="input-register-username"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-foreground">
                  ইমেইল ঠিকানা *
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                  data-testid="input-register-email"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-foreground">
                  পাসওয়ার্ড *
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2"
                  data-testid="input-register-password"
                />
              </div>
              
              <div className="text-sm text-muted-foreground mb-4">
                নতুন পাসওয়ার্ড সেট করার জন্য আপনার ইমেইল ঠিকানায় একটি লিংক পাঠানো হবে।
              </div>
              
              <div className="text-sm text-muted-foreground mb-6">
                আপনার ব্যক্তিগত তথ্য এই ওয়েবসাইট জুড়ে আপনার অভিজ্ঞতা সমর্থন করতে, আপনার অ্যাকাউন্টে অ্যাক্সেস পরিচালনা করতে ব্যবহার করা হবে।
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={registerMutation.isPending}
                data-testid="button-submit-register"
              >
                {registerMutation.isPending ? "রেজিস্টার হচ্ছে..." : "রেজিস্টার"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
