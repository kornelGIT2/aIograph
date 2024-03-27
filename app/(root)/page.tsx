import { currentUser } from "@clerk/nextjs";
const Home = async () => {
  const user = await currentUser();
  if (!user) return <main className="">Not signed in...</main>;
  return (
    <main className=" dark:text-white text-6xl font-bold text-primary">
      Home page
    </main>
  );
};

export default Home;
