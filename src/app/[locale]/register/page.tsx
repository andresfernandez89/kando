import LocaleSwitchBtn from "@/components/locale-switch-btn";
import "../home.css";
import { Register } from "@/components/register";
export default function Home() {
  return (
    <>
      <LocaleSwitchBtn />
      <div className="w-full max-w-md">
        <Register />
      </div>
    </>
  );
}
