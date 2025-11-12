export interface User {
  email: string;
  name: string;
  role: 'student' | 'admin';
}

export const DEMO_USERS = {
  student: {
    email: 'demo@student.com',
    password: '12345',
    name: 'Demo Student',
    role: 'student' as const
  },
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const
  }
};

export const login = (email: string, password: string): User | null => {
  if (email === DEMO_USERS.student.email && password === DEMO_USERS.student.password) {
    const user = { email: DEMO_USERS.student.email, name: DEMO_USERS.student.name, role: DEMO_USERS.student.role };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  
  if (email === DEMO_USERS.admin.email && password === DEMO_USERS.admin.password) {
    const user = { email: DEMO_USERS.admin.email, name: DEMO_USERS.admin.name, role: DEMO_USERS.admin.role };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const signup = (email: string, password: string, name: string): User => {
  const user = { email, name, role: 'student' as const };
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  return JSON.parse(userStr);
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};
