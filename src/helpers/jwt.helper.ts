import jwt from 'jsonwebtoken';

function verifyToken(token: string): boolean {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function generateToken(payload: object): string {  
  return jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data: payload }, process.env.JWT_SECRET);
}

export default { verifyToken, generateToken };