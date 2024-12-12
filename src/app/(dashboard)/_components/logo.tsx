import Image from "next/image";
import Link from "next/link";

export function Logo({
  width = 25,
  height = 20,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Link
      href="/"
      className="flex items-center gap-x-2 transition-all hover:rounded-md hover:bg-zinc-500/20 hover:p-2"
    >
      <Image
        src="/logo-lightMode.svg"
        alt="Think Vault"
        width={width}
        height={height}
      />

      <h1 className="text-xl font-bold text-black">Think Vault</h1>
    </Link>
  );
}
