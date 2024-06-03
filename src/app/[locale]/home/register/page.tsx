import LocaleSwitchBtn from "@/components/locale-switch-btn";
import "../home.css";
import { Register } from "@/components/register";
export default function RegisterPage() {
  return (
    <section>
      <LocaleSwitchBtn />
      <div className="w-full max-w-md">
        <Register />
      </div>
    </section>
  );
}
