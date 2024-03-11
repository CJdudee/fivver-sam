import Packages from "@/models/Packages";
import { simpleJson } from "@/utils/helpers";
import BookHomePage from "../components/BookHomePage";
import { connectingMongoose } from "../lib/connectMongo";

export default async function Home() {
  await connectingMongoose()
  const pricePackages = await Packages.find().limit(5).exec();

  return (
    <main className="h-full">
      <BookHomePage pricePackages={simpleJson(pricePackages)} />
    </main>
  );
}

{
  /* <main className="flex min-h-full flex-col items-center justify-start bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 w-full overflow-hidden "> */
}
{
  /* <HomePageComp /> */
}
