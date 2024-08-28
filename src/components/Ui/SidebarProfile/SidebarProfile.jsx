import React from "react";
import Link from "next/link";
import Image from "next/image";

const SidebarProfile = ({ logo }) => {

  return (
    <div className="flex items-center justify-center  py-2 px-2 bg-gray gap-2">
      <Link
        className="flex items-center align-center justifyContent-center gap-1"
        href="/"
      >
        <Image
          
          height={60}
          width={100}
          src={logo}
          className="w-40 "
          alt=""
        />
      </Link>
    </div>
  );
};

export default SidebarProfile;
