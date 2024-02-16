// Import the jwt-decode library
import Role from '@/models/Role';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: number; // Assuming the user ID is stored in the 'sub' claim
  roles: Role[] | Role // Assuming you have a 'role' claim
  // Add any other claims you expect in your JWT payload
}

// Function to decode JWT and extract user ID and role
export default function decodeToken(token: string): JwtPayload {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT', error);
    return { sub: 0, roles: Role.ROLE_USER }; // Return a default or empty object in case of error
  }
}
