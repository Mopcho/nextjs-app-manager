import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
    try {
        const { email, firstName, lastName, password } = await req.json();
        const userAlreadyExists = await db.user.findUnique({
            where: {
                email
            }
        });

        if (userAlreadyExists) {
            throw new Error('User already exists');
        }
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
        if (err instanceof Error) {
            return NextResponse.json({error: err.message})
        } else {
            return NextResponse.json({error: err})
        }
    }
}