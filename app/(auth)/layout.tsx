import Image from "next/image";
import authBg from "../../public/assets/images/auth-bg.png";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col ">
      <main className="relative flex-1 flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <Image
            src={authBg}
            alt="background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
        </div>

        <div className="absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-orange-950/20 blur-[120px] pointer-events-none z-1" />
        <div className="absolute left-[-5%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-zinc-900/40 blur-[120px] pointer-events-none z-1" />

        <div className="relative z-10 w-full py-20 md:py-30">{children}</div>
      </main>
    </div>
  );
}
