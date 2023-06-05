import Greetings from "@/components/Greeting/Greeting";
import GreetingsSkeleton from "@/components/GreetingsSkeleton/GreetingsSkeleton";
import NewProject from "@/components/NewProject/NewProject";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import TaskCard from "@/components/TaskCard/TaskCard";
import { getProjects } from "@/lib/api";
import { getUserFromCookie } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const authCookie = headers().get('Cookie') || '';
  if (!authCookie) {
    return;
  }
  const data = await getProjects(user?.id || '', authCookie);

  return { projects: data.data };
};

export default async function Home() {
  const { projects } = await getData();
  return (
    <div className="h-full overflow-y-auto w-full">
      <div className="h-full items-stretch w-full">
        <div className="flex-1 grow flex w-full">
          <Suspense fallback={<GreetingsSkeleton />}>
            {/* @ts-ignore */}
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 flex-col md:flex-row">
          {projects && projects.map((project: any) => (
              <div className="px-7 py-3 w-full lg:w-1/3 md:w-1/2" key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              </div>
              ))
            }
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            {/* @ts-ignore */}
            <TaskCard title="Your next todos !" titleClassName="break-words"/>
          </div>
        </div>
      </div>
    </div>
  );
}