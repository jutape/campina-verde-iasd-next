import { apiClient } from './api-client';
import { LoginRequest, LoginResponse, AuthState } from '../models/auth';

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  constructor() {
    // Initialize with stored values if available
    this.loadFromStorage();
  }

  private authState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null
  };

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userJson = localStorage.getItem(this.USER_KEY);
    
    if (token && userJson) {
      const user = JSON.parse(userJson);
      this.authState = {
        isAuthenticated: true,
        token,
        user
      };
    }
  }

  private saveToStorage(token: string, user: any) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private clearStorage() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const loginRequest: LoginRequest = { email, password };
      const response = await apiClient.post<LoginResponse>('/auth/login', loginRequest);
      
      // Save auth data
      this.authState = {
        isAuthenticated: true,
        token: response.token,
        user: response.user
      };
      
      this.saveToStorage(response.token, response.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  logout(): void {
    this.authState = {
      isAuthenticated: false,
      token: null,
      user: null
    };
    this.clearStorage();
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  getUser() {
    return this.authState.user;
  }

  getToken() {
    return this.authState.token;
  }
}

export const authService = new AuthService();
