import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {validateJWT} from '@/lib/auth'

export async function POST(req: NextRequest) {
    try {
        const cookieName = process.env.COOKIE_NAME || '';
        // @ts-ignore
        const user = await validateJWT(req.cookies.get(cookieName)?.value);

        const {name, description, projectId, status} = await req.json();

        const databaseResponse = await db.task.create({
            data: {
                name,
                description,
                status,
                project: {
                    connect: {
                        id: projectId,
                    }
                },
                owner: { connect: { id: user.id } },
            },
            include: {
                project: true
            }
        })

        return NextResponse.json({data: databaseResponse});
    } catch(err) {
        if (err instanceof Error) {
            return NextResponse.json({error: err.message})
          } else {
            return NextResponse.json({error: err})
          }
    }
}