import Image from "next/image";
import Link from "next/link";
import profilePic from "../../public/pic.png";

export default function Home() {
  return (
    <div className="leading-loose text-sm text-slate-600 dark:text-slate-400 md:flex md:justify-center md:items-center md:text-base md:leading-loose md:gap-12">
      <Image src={profilePic} alt="Profile Picture" className="p-12 m-auto" />
      <section className="max-w-sm">
        <span className="text-xs font-bold block text-center pb-1 md:text-base md:text-left">
          FRONTEND DEVELOPER
        </span>
        <h1 className="text-3xl font-bold text-center pb-8 text-slate-800 dark:text-slate-100 md:text-5xl md:text-left">
          Michal Rodek
        </h1>
        <p className="pb-4">Hello 👋</p>
        <p className="pb-4">
          My name is Michal and I work as a Frontend Developer but I am not
          afraid of touching a backend either.
        </p>
        <p>
          I am also a fan of nice and clean design so sometimes I try to
          prototype some {""}
          <Link href="/ui-design" className="underline hover:no-underline">
            UI Components
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
