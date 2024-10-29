import Image from "next/image";
import AdventistLogo from './church.png';
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className=""
          src={AdventistLogo}
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="text-center">
          <h1 className="font-semibold">Igreja Adventista do Sétimo dia</h1>
          <h2>Campina verde</h2>
        </div>

        

        <div className="w-full flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-md border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/agenda"
            rel="noopener noreferrer"
          >
            Agenda de culto
          </Link>
        </div>
      </main>
    </div>
  );
}
