import Image from "next/image";

export default function NotFound() {
  return (
    <div className="font-extrabold flex flex-col gap-[20px] items-center h-full w-full my-[50px]">
        <Image
        src={'/404.png'}
        alt="404"
        width="500"
        height="500"
        />
        <p className="text-red-500 text-center text-3xl">Página não encontrada!</p>
    </div>
  )
}