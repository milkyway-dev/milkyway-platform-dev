"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import Notification from "@/src/components/ui/Notification";


interface DecodedToken {
  role: string;
}

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [randomCharacter, setRandomCharacter] = useState<number | null>(1);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    setRandomCharacter(randomNumber);
  }, []);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleModalOpen = (type: string) => {
    setModalType(type);
    setOpen(true);
  };

  const validateForm = () => {
    if (username === "" || password === "") {
      toast.custom((t) => (
        <Notification
          className="sm:rotate-0 -rotate-90"
          visible={t.visible}
          message="Username and password are required"
        />
      ));
      setTimeout(() => {
        toast.remove();
      }, 2000);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      toast.custom((t) => (
        <Notification
          className="-rotate-90 sm:rotate-0"
          visible={t.visible}
          message="Loggin In..."
        />
      ));
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", 
      });

      const data = await response.json();

      if (response.ok) {
        if (data?.isUnderMaintenance) {
          toast.remove();
          return toast.custom((t) => (
            <Notification
              className="-rotate-90 sm:rotate-0"
              visible={t.visible}
              message={data.message}
            />
          ));
        }
        const token = data?.token;
        if (token) {
          const decodedToken: DecodedToken = jwtDecode(token);

          if (decodedToken.role === "player") {
            toast.remove();
            toast.custom((t) => (
              <Notification
                className="-rotate-90 sm:rotate-0"
                visible={t.visible}
                message="Login Successful"
              />
            ));
            Cookies.set("token", token);
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            Cookies.set("index", randomNumber.toString());
            router.push("/");
          } else {
            toast.remove();
            toast.custom((t) => (
              <Notification
                className="-rotate-90 sm:rotate-0"
                visible={t.visible}
                message="Access Denied: Not a player"
              />
            ));
          }
        } else {
          toast.remove();
          toast.custom((t) => (
            <Notification
              className="-rotate-90 sm:rotate-0"
              visible={t.visible}
              message="Invalid Token"
            />
          ));
        }
      } else {
        toast.remove();
        toast.custom((t) => (
          <Notification
            className="-rotate-90 sm:rotate-0"
            visible={t.visible}
            message={data.message || data.error || "Login failed"}
          />
        ));
        setTimeout(() => {
          toast.remove();
        }, 2000);
      }
    } catch (error) {
      toast.remove();
      toast.custom((t) => (
        <Notification
          visible={t.visible}
          className="-rotate-90 sm:rotate-0"
          message="An error occured! Please try again"
        />
      ));
      setTimeout(() => {
        toast.remove();
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="relative macando items-center  sm:items-start w-screen sm:w-full -rotate-90 sm:rotate-0 h-auto flex justify-evenly">
        <Image
          src="/assets/images/bgimage.png"
          alt="login-bg"
          fill
          priority={true}
          quality={100}
          objectPosition="center"
          className=" object-cover  w-full"
        />
        <div className="relative w-full sm:w-[45%]  min-h-screen sm:min-h-[20vw] sm:mr-0 sm:h-[50vw] m-auto">
          <Image
            src={`/assets/images/character${randomCharacter}.png`}
            alt="login-character"
            fill
            className="z-[2] object-cover md:object-contain top-0"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="z-[3]  sm:static flex justify-center flex-col portrait:gap-[2vh] landscape:gap-[1vw] w-[90%] sm:w-[50%] h-[35vh] sm:h-[50%] m-auto absolute top-auto "
          autoComplete="off"
        >
          <div className="flex justify-center">
            <Image
              src={'/assets/images/logo.webp'}
              alt="Power Panda Logo"
              width={1000}
              height={1000}
              quality={100}
              className="w-[50%] sm:w-[35%]"
            />
          </div>
          {/* Input Field Component */}
          {['ACCOUNT', 'PASSWORD'].map((placeholder, idx) => (
            <div
              key={idx}
              className="w-full lg:w-[70%] mx-auto flex items-center justify-center bg-gradient-to-t border-t-[3.5px] border-yellow-400 border-b-[4px] from-[#255510] via-[#0E4010] to-[#1A410F] rounded-full "
            >
              <Image
                src={'/assets/images/inputframe.webp'}
                alt="Input Frame"
                quality={100}
                width={200}
                height={200}
                className="portrait:w-[2.7vh] landscape:w-[2.3vw] 2xl:landscape:w-[1.7vw]"
              />
              <input
                type={placeholder === 'PASSWORD' ? 'password' : 'text'}
                placeholder={placeholder}
                onChange={placeholder === 'ACCOUNT' ? handleUsernameChange : handlePasswordChange}
                className="w-full pl-4 portrait:py-[1.1vh] landscape:py-[1.3vw]  2xl:landscape:py-[.7vw] text-xs bg-transparent lg:text-[1rem] 2xl:text-2xl border-[3.5px] border-[#335a06] text-yellow-400 placeholder:text-yellow-400  font-bold bg-no-repeat bg-contain outline-none"
                style={{ fontFamily: 'Macondo' }}
              />
              <Image
                src={'/assets/images/inputframe.webp'}
                alt="Input Frame"
                quality={100}
                width={200}
                height={200}
                className="portrait:w-[2.7vh] landscape:w-[2.3vw] 2xl:landscape:w-[1.7vw] rotate-180"
              />
            </div>
          ))}

          {/* Login Button */}
          <div
            className="w-[70%] sm:w-[60%] lg:w-[35%] portrait:mt-[1.5vh] landscape:mt-[1.5vw] flex items-center justify-center border-t-[3.5px] rounded-full border-yellow-400 border-b-[3.5px]  mx-auto"
            style={{
              background:
                "radial-gradient(circle at bottom, #F88D4D 0%, #AC1616 30%, #7A2525 70%, #4E1F1F 100%)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Image
              src={'/assets/images/inputframe.webp'}
              alt="Input Frame"
              quality={100}
              width={200}
              height={200}
              className="portrait:w-[3vh] landscape:w-[2.4vw] 2xl:landscape:w-[1.7vw]"
            />
            <button
              className="w-full border-[3.5px] portrait:py-[.8vh] landscape:py-[.5vw] lg:landscape:py-[.5vw] text-yellow-400 text-xl lg:text-2xl 2xl:text-4xl font-bold outline-none"
              style={{
                borderImage: "linear-gradient(to bottom, #652020, #a62b10, #a3290f) 1",
                fontFamily: 'Macondo',
              }}
            >
              LOGIN
            </button>
            <Image
              src={'/assets/images/inputframe.webp'}
              alt="Input Frame"
              quality={100}
              width={200}
              height={200}
              className="portrait:w-[3vh] landscape:w-[2.4vw] 2xl:landscape:w-[1.7vw] rotate-180"
            />
          </div>
        </form>
      </div>



    </>
  );
};

export default Login;