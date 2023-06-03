import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const saltRounds = 12;

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
}

export const comparePasswords = async (plainTextPassword: string, hashedPassword: string) => {
    return bcrypt.compare(plainTextPassword, hashedPassword);
}

// TODO: Types here
export const createJWT = (user: any) => {
    // return jwt.sign({ id: user.id }, 'cookies')
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;
  
    return new SignJWT({ payload: { id: user.id, email: user.email } })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  };

  export const validateJWT = async (jwt: any) => {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
  
    return payload.payload as any;
  };

  export const getUserFromCookie = async (cookies: any) => {
    const jwt = cookies.get(process.env.COOKIE_NAME);
  
    const { id } = await validateJWT(jwt.value);
  
    const user = await db.user.findUnique({
      where: {
        id: id as string,
      },
    });
  
    return user;
  };
  