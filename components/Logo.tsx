import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/assets/weanLogo.svg" alt="Wean logo" width={32} height={32} />
      <span className="text-xl font-semibold text-black">Wean</span>
    </div>
  );
}

export default Logo;
