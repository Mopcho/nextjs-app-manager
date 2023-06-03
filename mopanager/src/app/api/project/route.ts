import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name } = await req.json();
        const cookieName = process.env.COOKIE_NAME || '';
        console.log(cookieName);
        console.log(req.cookies.get(cookieName));
        const user = await validateJWT(req.cookies.get(cookieName)?.value);
      
        await db.project.create({
          data: {
            name,
            ownerId: user.id,
          },
        });

        revalidateTag('project');

        return NextResponse.json({ data: { message: "ok" } });
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: { message: err } });
    }

}