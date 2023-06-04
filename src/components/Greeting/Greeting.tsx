import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { Button } from "../Buttons/Button";
import Card from "../Card/Card";
import { delay } from "@/lib/async";

const getData = async () => {
  await delay(5000);
  const user = await getUserFromCookie(cookies());
  return user;
};

const Greetings = async () => {
  const user = await getData();

  return (
    <Card className="w-full py-4 relative flex flex-col items-center justify-center text-center mx-0 md:mx-5 lg:mx-5 xl:mx-5">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user ? user.firstName : 'User'}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large">Today&apos;s Schedule</Button>
      </div>
    </Card>
  );
};

export default Greetings;