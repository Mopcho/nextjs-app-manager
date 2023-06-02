import { comparePasswords, createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
    try {
        const { email, firstName, lastName, password } = await req.json();
        const user = await db.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            return NextResponse.json({error: 'User does not exist'}, {status: 401});
        }

        const isUser = await comparePasswords(password, user.password);

        if (!isUser) {
            return NextResponse.json({error: 'Invalid Credentials'}, {status: 401});
        }

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