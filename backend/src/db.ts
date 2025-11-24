
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this should be hashed!
  name?: string;
  learnerId: string;
}

export const getUsers = (): User[] => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

export const createUser = (email: string, password: string): User => {
  const newUser: User = {
    id: uuidv4(),
    email,
    password, // Plain text for demo purposes only
    learnerId: uuidv4(), // Generate a unique learner ID
  };
  saveUser(newUser);
  return newUser;
};
