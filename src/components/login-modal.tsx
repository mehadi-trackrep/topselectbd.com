import { X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/lib/auth-store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema, type LoginData, type RegisterData } from "@/shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function LoginModal() {
  const { 
    isLoginOpen, 
    isRegisterMode, 
    setLoginOpen, 
    toggleRegisterMode, 
    login 
  } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      address: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await apiRequest("POST", "/auth/login", data);
      return await response.json();
    },
    onSuccess: (user) => {
      login(user);
      toast({
        title: "Success",
        description: "Successfully logged in!",
      });
      loginForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Login failed",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const { confirmPassword, ...userData } = data;
      const response = await apiRequest("POST", "/auth/register", userData);
      return await response.json();
    },
    onSuccess: (user) => {
      login(user);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      registerForm.reset();
    },
    onError: (error: any) => {
      // Handle 404 errors specifically for missing endpoints
      if (error.message && error.message.includes("404")) {
        toast({
          title: "Error",
          description: "Registration endpoint not found. Please contact support.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Registration failed",
          variant: "destructive",
        });
      }
    },
  });

  const onLoginSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterData) => {
    registerMutation.mutate(data);
  };

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" data-testid="login-modal">
      <div className="bg-card rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isRegisterMode ? "Create Account" : "Sign In"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLoginOpen(false)}
              data-testid="close-login-modal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {isRegisterMode ? (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    {...registerForm.register("name")}
                    className="mt-1"
                    data-testid="input-name"
                  />
                  {registerForm.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {registerForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    type="text"
                    {...registerForm.register("username")}
                    className="mt-1"
                    data-testid="input-username"
                  />
                  {registerForm.formState.errors.username && (
                    <p className="text-sm text-destructive mt-1">
                      {registerForm.formState.errors.username.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...registerForm.register("email")}
                  className="mt-1"
                  data-testid="input-email"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  {...registerForm.register("phone")}
                  className="mt-1"
                  data-testid="input-phone"
                />
                {registerForm.formState.errors.phone && (
                  <p className="text-sm text-destructive mt-1">
                    {registerForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Your address"
                  {...registerForm.register("address")}
                  className="mt-1"
                  data-testid="input-address"
                />
                {registerForm.formState.errors.address && (
                  <p className="text-sm text-destructive mt-1">
                    {registerForm.formState.errors.address.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="register-password">Password *</Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    {...registerForm.register("password")}
                    className="mt-1 pr-10"
                    data-testid="input-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="toggle-password"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...registerForm.register("confirmPassword")}
                    className="mt-1 pr-10"
                    data-testid="input-confirm-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    data-testid="toggle-confirm-password"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                disabled={registerMutation.isPending}
                data-testid="button-register"
              >
                {registerMutation.isPending ? "Creating Account..." : "CREATE ACCOUNT"}
              </Button>
            </form>
          ) : (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="login-username">Username or email address *</Label>
                <Input
                  id="login-username"
                  type="text"
                  {...loginForm.register("username")}
                  className="mt-1"
                  data-testid="input-login-username"
                />
                {loginForm.formState.errors.username && (
                  <p className="text-sm text-destructive mt-1">
                    {loginForm.formState.errors.username.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="login-password">Password *</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    {...loginForm.register("password")}
                    className="mt-1 pr-10"
                    data-testid="input-login-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="toggle-login-password"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                disabled={loginMutation.isPending}
                data-testid="button-login"
              >
                {loginMutation.isPending ? "Logging in..." : "LOG IN"}
              </Button>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember" data-testid="checkbox-remember" />
                  <Label htmlFor="remember" className="ml-2 text-sm">
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline" data-testid="link-forgot-password">
                  Lost your password?
                </a>
              </div>
            </form>
          )}
          
          <hr className="my-6" />
          
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {isRegisterMode ? "Already have an account?" : "No account yet?"}
            </p>
            <Button
              variant="outline"
              onClick={toggleRegisterMode}
              data-testid="button-toggle-mode"
            >
              {isRegisterMode ? "SIGN IN" : "CREATE AN ACCOUNT"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}