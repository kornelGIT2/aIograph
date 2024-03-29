import HeroPage from "@/components/heroPage/heroPage";
import { currentUser } from "@clerk/nextjs";

const Home = async () => {
  const user = await currentUser();
  if (!user) return <HeroPage />;
  return (
    <main className="mt-32 dark:text-white text-6xl font-bold text-primary">
      Home page
    </main>
  );
};

export default Home;
