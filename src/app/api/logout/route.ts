import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/lib/auth";
import { serialize } from "cookie";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const cookieName = process.env.COOKIE_NAME || '';
        // @ts-ignore
        const user = await validateJWT(req.cookies.get(cookieName)?.value);
        const cookie = req.cookies.get(cookieName);
  
        return NextResponse.json({ data: { deleted: true }}, {
            headers: {
                'Set-Cookie': serialize(cookieName, '', {
                    httpOnly: true,
                    path: "/",
                    maxAge: Date.now(),
                    expires: new Date(Date.now()),
                })
            }
        });
    } catch(err) {
      if (err instanceof Error) {
        return NextResponse.json({error: err.message})
      } else {
        return NextResponse.json({error: err})
      }
    }
  }