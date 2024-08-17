export type AuthenticationRequest = {
  username: string;
  password: string;
};

export type AuthenticationResponse = {
  access_token: string
}

export type JWTPayload = {
  role: string;
  iss: string;
  name: string;
  oid: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
};

export type BoardUser = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  username: `${string}`;
  name: `${string} ${string}`;
  email: `${string}@${string}`;
  role: 'LECTURER' | 'STAFF' | 'STUDENT';
};
