import Navbar from "./Navbar";
import CrousleSection from "./CrousleSection";

function Header() {
  return (
    <div className="bg-[#000D51] text-white w-full h-[680px]">
      <div className="w-[80%] mx-auto">
        <Navbar />
        <CrousleSection />
      </div>
    </div>
  );
}

export default Header;
