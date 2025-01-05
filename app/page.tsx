import Image from "next/image";
import AdventistLogo from './church.png';
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          className=""
          src={AdventistLogo}
          alt="logo-adventista"
          width={180}
          height={38}
          priority
        />
        <div className="text-center">
          <h1 className="font-semibold">Igreja Adventista do Sétimo dia</h1>
          <h2>Campina verde</h2>
        </div>

        <div className="w-full flex gap-4 items-center flex-col">
          <Link
            className="rounded-md border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-4"
            href="/agenda"
            rel="noopener noreferrer"
          >
            Agenda de culto
          </Link>
          <Link
            className="flex items-center justify-center px-2 hover:underline text-xs "
            href="/login"
            rel="noopener noreferrer"
          >
            Gerenciar Ministério
          </Link>
        </div>
      </main>
    </div>
  );
}
