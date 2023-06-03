import TaskCard from "@/components/TaskCard/TaskCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

interface Props {
    params: {
        id: string;
    }
}

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id, ownerId: user?.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

export default async function ProjectPage({ params }: Props) {
  const project = await getData(params.id);

  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <TaskCard tasks={project?.tasks} title={project?.name || ''} />
    </div>
  );
}