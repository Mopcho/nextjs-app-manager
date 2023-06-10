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
            },
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
    if (err instanceof Error) {
      return NextResponse.json({error: err.message})
    } else {
      return NextResponse.json({error: err})
    }
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const cookieName = process.env.COOKIE_NAME || '';
    const user = await validateJWT(req.cookies.get(cookieName)?.value);
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId') || '';

    const project = await db.project.findUnique({
      where: {
        id: projectId,
      }
    });

    if (!project) {
      throw new Error('No project with this id exists');
    }

    if (user.id !== project?.ownerId) {
      throw new Error('You are not the owner of this project');
    }

    
    const deleteTaskDatabseResponse = await db.task.deleteMany({
      where: {
        projectId,
      }
    });

    const databaseResponse = await db.project.delete({
      where: {
        id: projectId,
      },
      include: {
        tasks: {
          where: {
            projectId,
          },
        }
      }
    });

    console.log(databaseResponse);
    console.log(deleteTaskDatabseResponse);

    return NextResponse.json({data: databaseResponse});
  } catch(err) {
    if (err instanceof Error) {
      return NextResponse.json({error: err.message})
    } else {
      return NextResponse.json({error: err})
    }
  }
}