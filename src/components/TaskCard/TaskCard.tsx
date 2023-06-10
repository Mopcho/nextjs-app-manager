import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Card from "../Card/Card";
import { cx } from "class-variance-authority";
import NewTask from "../NewTask/NewTask";
import DeleteProject from "../DeleteProject/DeleteProject";

interface Task {
    id: string;
    name: string;
    description: string;
}

interface Props {
    title: string;
    tasks?: Task[];
    titleClassName?: string;
    projectId: string;
}

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};
const TaskCard = async ({ title, tasks, titleClassName, projectId }: Props) => {
  const data = tasks || (await getData());

  return (
    <Card className="flex flex-col text-center mx-0 md:mx-5 lg:mx-5 xl:mx-5">
      <div className="flex justify-center items-center flex-col md:flex-col lg:flex-col xl:flex-col flex-wrap">
        <div>
          <span className={cx("text-3xl text-gray-600", titleClassName)}>{title}</span>
        </div>
        <div className="flex items-center justify-center">
          <NewTask projectId={projectId}></NewTask>
          <DeleteProject projectId={projectId} projectName={title}></DeleteProject>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task: Task) => (
              <div className="py-2" key={task.id}>
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;