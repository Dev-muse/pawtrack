import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Image
        src="/images/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <p className="text-lg">This is a sample Next.js application.</p>
      <p className="text-lg">It uses Tailwind CSS for styling.</p>
      <p className="text-lg">Enjoy coding!</p>
    </div>
  );
}
