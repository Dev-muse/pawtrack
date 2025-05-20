import LogoImage from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image src={LogoImage} alt="PetSoft logo" />
    </Link>
  );
};

export default Logo;
