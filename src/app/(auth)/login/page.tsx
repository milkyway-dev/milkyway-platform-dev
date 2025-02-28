"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { config } from "@/src/lib/config";
import CustomButton from "@/src/components/ui/CustomButton";
import Notification from "@/src/components/ui/Notification";
import Modal from "@/src/components/ui/Modal";
import ForgotPassword from "@/src/components/ui/ForgotPassword";

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
    }

    setLoading(false);
  };
  return (
    <div className="relative items-center sm:items-start w-screen sm:w-full -rotate-90 sm:rotate-0 h-auto flex justify-evenly">
      <Image
        src="/login.png"
        alt="login-bg"
        fill
        priority={true}
        quality={100}
        objectPosition="center"
        className=" object-cover  w-full"
      />
      <form
        onSubmit={handleSubmit}
        className="z-[3] p-[3%] sm:static flex justify-center flex-col gap-[3vw] sm:gap-[3vw] w-[80%] sm:w-[35%] h-[35vh] sm:h-[50%] m-auto absolute top-auto "
        autoComplete="off"
      >
        <div className="bg-gradient-to-b from-[#fff] p-[1px] from-[0%] via-[#a8d4f8] via-[50.72%] to-[#4b97ff] rounded-[1vw]">
          <div className="w-[100%] bg-gradient-to-b from-[#0e052d] to-[#2b3953] rounded-[1vw] h-full">
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="ACCOUNT"
              className=" caret-blue-500 placeholder-transparent sm:placeholder:text-[2vw] placeholder:text-[4vw] py-[3vw] sm:pb-[1vw] sm:pt-[1vw] px-[2vw] focus:outline-none bg-gradient-to-b from-[#fff] from-[0%] via-[#a8d4f8] via-[50.72%] to-[#4b97ff] bg-clip-text text-transparent w-full sm:text-[2vw] text-[4vw]"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#fff] p-[1px] from-[0%] via-[#a8d4f8] via-[50.72%] to-[#4b97ff]  rounded-[1vw]">
          <div className="w-[100%] bg-gradient-to-b from-[#0e052d] to-[#2b3953] rounded-[1vw] h-[100%] ">
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="PASSWORD"
              className="placeholder-transparent sm:placeholder:text-[2vw] placeholder:text-[4vw] py-[3vw] sm:pb-[1vw] sm:pt-[1vw] px-[2vw] focus:outline-none bg-gradient-to-b from-[#fff] from-[0%] via-[#a8d4f8] via-[50.72%] to-[#4b97ff] bg-clip-text text-transparent w-full sm:text-[2vw] text-[4vw]"
              autoComplete="new-password"
            ></input>
          </div>
        </div>
        <div className="sm:h-[5vw] h-[10vw] w-auto">
          <CustomButton type="submit" text="Login" />
        </div>
        <p
          onClick={() => handleModalOpen("Note")}
          className="uppercase sm:text-[2vw] text-[4vw] sm:text-left text-center bg-clip-text text-transparent bg-gradient-to-b from-[#F7C53B] via-[#C08C3A] to-[#DBC731]"
        >
          Forgot password?
        </p>
      </form>
      <Modal
        isOpen={open}
        setOpen={setOpen}
        modalType={modalType}
        setModalType={setModalType}
      >
        <ForgotPassword />
      </Modal>
      <div className="relative w-full sm:w-[45%]  min-h-screen sm:min-h-[20vw] sm:mr-0 sm:h-[50vw] m-auto">
        <Image
          src="/character.png"
          alt="login-character"
          fill
          className="z-[2] sm:object-contain bottom-0"
        />
      </div>
    </div>
  );
};

export default Login;
