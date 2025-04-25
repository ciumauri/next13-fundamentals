import Image from "next/image";

export default function ProductPage() {
  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end">
        <Image
          src="/moletom-never-stop-learning.png"
          alt="Hero"
          width={920}
          height={920}
          quality={100}
        />
      </div>
      <div></div>
    </div>
  );
}
