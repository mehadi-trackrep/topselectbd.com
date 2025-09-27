import { useAuthStore } from "@/lib/auth-store";
import { User } from "@/shared/schema";

// Simple test component to verify authentication functionality
export default function AuthTest() {
  const { user, login, logout, checkAuthStatus } = useAuthStore();
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Authentication Test</h2>
      
      <div className="mb-4">
        <p className="mb-2">User Status: {user ? `Logged in as ${user.username}` : "Not logged in"}</p>
        
        <button 
          onClick={() => checkAuthStatus()}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Check Auth Status
        </button>
        
        <button 
          onClick={() => login({ 
            id: "1", 
            username: "testuser", 
            email: "test@example.com", 
            name: "Test User",
            createdAt: new Date().toISOString()
          } as User)}
          className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Simulate Login
        </button>
        
        <button 
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}