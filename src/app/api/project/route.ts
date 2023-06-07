import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name } = await req.json();
        const cookieName = process.env.COOKIE_NAME || '';
        const user = await validateJWT(req.cookies.get(cookieName)?.value);

        const projectExists = await db.project.findUnique({
          where: {
            ownerId_name: {
              ownerId: user.id,
              name
            }
          }
        });

        if (projectExists) {
          throw new Error('Project with this name already exists');
        }
      
        await db.project.create({
          data: {
            name,
            ownerId: user.id,
          },
        });

        return NextResponse.json({ data: { message: "ok" } });
    } catch(err) {
      if (err instanceof Error) {
        return NextResponse.json({error: err.message})
      } else {
        return NextResponse.json({error: err})
      }
    }
}

export async function GET(req: Request) {
  try {
      const cookieName = process.env.COOKIE_NAME || '';
      // @ts-ignore
      const user = await validateJWT(req.cookies.get(cookieName)?.value);
      const { searchParams } = new URL(req.url);
      const ownerId = searchParams.get('ownerId') || '';
    
      const projects = await db.project.findMany({
        where: {
          ownerId,
        },
      });

      return NextResponse.json({ data: projects });
  } catch(err) {
      console.error(err);
      return NextResponse.json({ error: { message: err } });
  }
}