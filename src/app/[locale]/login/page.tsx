import LocaleSwitchBtn from "@/components/locale-switch-btn";
import "../home.css";
import Login from "@/components/login";
export default function LoginPage() {
  return (
    <>
      <LocaleSwitchBtn />
      <div className="w-full max-w-md">
        <Login />
      </div>
    </>
  );
}
