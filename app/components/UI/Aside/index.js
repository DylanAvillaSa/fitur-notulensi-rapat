import Link from "next/link";
import Image from "next/image";
import { logo, notulen, notes, category } from "@/app/assets";

const Aside = ({ isSidebar, pathName }) => {
  return (
    <aside
      className={` ${
        isSidebar &&
        "transition-all duration-1000 lg:w-[260px]  min-h-screen fixed top-0 left-0 bg-white flex flex-col py-4 z-20 items-center justify-start border-[.5px]"
      } `}
    >
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          width={60}
          height={60}
          style={{ borderRadius: "50%", width: "auto" }}
          alt="logo"
        />
        <h2 className="text-2xl flex flex-col font-semibold">
          SISTEM
          <span className="text-light-purple font-bold">KLINIK</span>
        </h2>
      </div>

      <div className="flex flex-col w-[90%] mt-14 gap-3">
        <h2 className="font-bold">HOME</h2>
        <Link href="/" className="flex gap-3 w-[90%]">
          <Image src={category} width={25} height={25} alt="category" />
          <p className="font-medium">Dashboard</p>
        </Link>

        <h2 className="font-bold mt-5">INFORMASI</h2>
        <Link
          href="/notulensi-rapat"
          className={`${
            pathName === "/notulensi-rapat" &&
            "bg-light-purple text-white rounded-md flex justify-start gap-4 w-[90%] p-3"
          } 
          
          ${
            pathName != "/notulensi-rapat" &&
            "font-medium flex gap-2 p-3 rounded-md hover:bg-slate-100 transition-all duration-700"
          }
          
          `}
        >
          {pathName != "/notulensi-rapat" ? (
            <>
              <Image src={notes} width={25} height={25} alt="notulen" />
              <p className="font-medium">Notulensi Rapat</p>
            </>
          ) : (
            <>
              <Image src={notulen} width={25} height={25} alt="notulen" />
              <p className="font-medium">Notulensi Rapat</p>
            </>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
