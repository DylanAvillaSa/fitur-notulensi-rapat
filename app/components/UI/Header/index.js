import { right } from "@/app/assets";
import Link from "next/link";
import Image from "next/image";
const Header = ({ path }) => {
  return (
    <header className="border shadow-sm w-full  py-5 px-2 flex items-center gap-2 rounded-md">
      <Link href="/" className="text-light-purple font-bold text-base">
        Dashboard
      </Link>
      <Image src={right} width={18} height={18} alt="right" />
      <Link href="/notulensi-rapat" className="text-base font-medium">
        Notulensi Rapat
      </Link>
      {path && (
        <>
          <Image src={right} width={18} height={18} alt="right" />
          <p className="text-base font-medium">{path}</p>
        </>
      )}
    </header>
  );
};

export default Header;
