import Image from "next/image";
import { menu, profile } from "@/app/assets";
import { Button as ButtonComponent } from "../../Elements";

const Navbar = ({ handleSidebar }) => {
  return (
    <nav className="w-full fixed top-0 left-0 right-0 p-4 flex items-center justify-between gap-4  lg:z-20 z-30 lg:bg-transparent bg-white">
      <Image
        src={menu}
        width={32}
        height={32}
        alt="menu"
        className="cursor-pointer"
        onClick={handleSidebar}
      />
      <div className="flex items-center gap-3">
        <ButtonComponent variant="main-btn">Rapat</ButtonComponent>
        <Image
          src={profile}
          width={47}
          height={47}
          alt="profile"
          className="rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
