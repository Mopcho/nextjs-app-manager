import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

interface RegisterData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        const { email, firstName, lastName, password } = await req.json();
        const user = await db.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: await hashPassword(password)
            }
        });
        const jwt = await createJWT(user);
        const cookieName = process.env.COOKIE_NAME || '';
        return NextResponse.json(user, {
            headers: {
                'Set-Cookie': serialize(cookieName, jwt, {
                    httpOnly: true,
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7,
                })
            }
        })
    } catch(err) {
        console.error(err);
    }
}