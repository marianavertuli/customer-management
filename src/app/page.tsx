import Image from "next/image";

import hero from "@/assets/hero.svg";

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-160px)]">
      <h2 className="font-medium text-2xl mb-2 md:text-3xl">Manage your company</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">Manage your clients</h1>
      <Image
        src={hero}
        alt="Dev Control hero image"
        // quality={100}
        priority={true}
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
