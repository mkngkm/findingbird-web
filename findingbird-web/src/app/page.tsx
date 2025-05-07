import Image from "next/image";
import Logo from '@/app/assets/img/Logo.png';
import LoginForm from "./ui/components/auth/login-form";

export default function Home() {
  return (
    <div className='px-10 mb-10 flex flex-col items-center'>
      <div className="mt-8 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
