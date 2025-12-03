import { useEffect, useRef, useState } from "react";
import {
  Landmark,
  Banknote,
  Building,
  CreditCard,
  CircleDollarSign,
  Building2,
  Wallet,
} from "lucide-react";

function Partner() {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const BANKS = [
    { name: "Axis Bank", icon: <Landmark size={48} /> },
    { name: "HDFC Bank", icon: <Building size={48} /> },
    { name: "ICICI Bank", icon: <Banknote size={48} /> },
    { name: "Kotak Bank", icon: <CreditCard size={48} /> },
    { name: "AU Small Finance Bank", icon: <CircleDollarSign size={48} /> },
    { name: "IndusInd Bank", icon: <Building2 size={48} /> },
    { name: "Other Banks", icon: <Wallet size={48} /> },
  ];

  const LOOP_BANKS = [...BANKS, ...BANKS];

  useEffect(() => {
    const container = scrollRef.current;
    let scrollSpeed = 1;

    const move = () => {
      if (!container || isHovering) {
        requestAnimationFrame(move);
        return;
      }

      container.scrollLeft += scrollSpeed;

      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      requestAnimationFrame(move);
    };

    requestAnimationFrame(move);
  }, [isHovering]);

  return (
    <div className="w-full pt-6 bg-gray-50">
      <h2 className="text-4xl font-bold text-[#0c2d59] px-4 mb-6 text-center">
        Our Partners We Work With
      </h2>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex gap-6 overflow-x-hidden px-4 pb-4"
        style={{ whiteSpace: "nowrap" }}
      >
        {LOOP_BANKS.map((item, index) => (
          <div
            key={index}
            className="
              min-w-[220px] 
              h-[180px] 
              bg-white 
              shadow-md 
              rounded-xl 
              p-6 
              border 
              hover:border-[#0c2d59] 
              hover:shadow-xl 
              transform 
              hover:scale-105 
              duration-300 
              flex 
              flex-col 
              items-center 
              justify-center 
              shrink-0
            "
          >
            <div className="mb-3 text-[#0c2d59]">{item.icon}</div>
            <p className="font-semibold text-gray-800 text-lg text-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partner;
