import Nav from "@/components/Navbar";
import "./globals.css";
import { Poppins } from "@next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-slate-100 dark:bg-slate-900 h-screen flex justify-center items-center">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
              ) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            `,
          }}
        />
        <div
          className={`${poppins.className} flex flex-col flex-auto gap-12 p-8 md:p-12 h-full max-h-[950px] max-w-[1800px]`}
        >
          <Nav />
          <main className="flex flex-auto bg-slate-300 dark:bg-slate-800 rounded-3xl p-8 md:p-12 justify-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
