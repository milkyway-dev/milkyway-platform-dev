"use client";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import Sound from "./Sound";
import Password from "./Password";

const PasswordMusic = () => {
    const [option, setOption] = useState('');
    const [typeImage, setTypeImage] = useState("");
    const sideMenu = [{ img: '/assets/popup/Sound.png', title: "Sound" }, { img: '/assets/popup/Password.png', title: "Password" }];
    const [open, setOpen] = useState(false);

    const handleModalOpen = (type: string) => {
        switch (type) {
            case "Sound":
                setTypeImage('/assets/popup/Sound.png');
                break;

            case "Password":
                setTypeImage('/assets/popup/Password.png');
                break;
            default:
                setTypeImage("");
        }
        setOption(type);
        setOpen(true);
    };


    let ModalContent;
    switch (option) {
        case "Sound":
            ModalContent = <Sound />;

            break;

        case "Password":
            ModalContent = <div className="landscape:text-[1.2vw] portrait:text-[1.2vh]">Please contact your agent to change your password.</div>;
            break;
        default:
            ModalContent = null;
    }

    const handleClick = () => {
        setOpen(false);
    };

    return (
        <div className="h-full w-full relative text-white flex flex-col items-center justify-evenly">
            <div className="h-[50%] w-full flex flex-col items-center justify-evenly">
                <div className="h-full w-[70%] mx-auto portrait:gap-x-[2.5vh] landscape:gap-x-[2.5vw] flex">
                    {sideMenu?.map((data, index) => (
                        <div
                            key={index}
                            className="flex items-center hover:scale-90 transition-all justify-center w-full h-full cursor-pointer"
                            onClick={() => {
                                handleModalOpen(data.title);
                            }}
                        >
                            <Image src={data.img} alt="img" width={600} height={200} quality={100} className={` w-[80%] h-auto`} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Nested Modal  */}
            {open && (
                <div className="absolute w-full h-full flex justify-center items-center">
                    <div
                        style={{
                            backgroundImage: "url(/assets/popup/sound-password-bg.png)",
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "80%",
                            aspectRatio: "16/9", // Adjust this based on the image's natural aspect ratio
                        }}
                        className="rounded-[0.5vw] relative flex justify-center items-center p-6"
                    >
                        {/* Modal Content */}
                        <div className="w-full flex relative justify-center items-center text-center">
                            <button
                                className="absolute translate-y-[-260%] sm:translate-y-[-260%] lg:translate-y-[-250%] translate-x-[-20%] sm:translate-x-[25%] lg:translate-x-[-15%] xl:translate-x-[-40%] top-3 right-0 cursor-pointer hover:scale-[1.1] transition-all  landscape:h-[2.5vw] landscape:w-[2.5vw] portrait:h-[2.5vh] portrait:w-[2.5vh] flex justify-center items-center z-10"
                                onClick={handleClick}
                            >
                                <svg width="100%" height="100%" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_499_1121)">
                                        <g filter="url(#filter1_i_499_1121)">
                                            <circle cx="68" cy="62" r="50" fill="#343433" />
                                        </g>
                                        <g clipPath="url(#clip0_499_1121)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M48.3407 37.0879C46.8902 35.6374 44.5384 35.6374 43.0879 37.0879C41.6374 38.5384 41.6374 40.8902 43.0879 42.3407L62.7472 62L43.0879 81.6593C41.6374 83.1098 41.6374 85.4617 43.0879 86.9121C44.5384 88.3625 46.8902 88.3625 48.3407 86.9121L68 67.2528L87.6593 86.9121C89.1098 88.3625 91.4617 88.3625 92.9121 86.9121C94.3625 85.4617 94.3625 83.1098 92.9121 81.6593L73.2528 62L92.9121 42.3407C94.3625 40.8902 94.3625 38.5384 92.9121 37.0879C91.4617 35.6374 89.1098 35.6374 87.6593 37.0879L68 56.7472L48.3407 37.0879Z" fill="black" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M48.3407 37.0879C46.8902 35.6374 44.5384 35.6374 43.0879 37.0879C41.6374 38.5384 41.6374 40.8902 43.0879 42.3407L62.7472 62L43.0879 81.6593C41.6374 83.1098 41.6374 85.4617 43.0879 86.9121C44.5384 88.3625 46.8902 88.3625 48.3407 86.9121L68 67.2528L87.6593 86.9121C89.1098 88.3625 91.4617 88.3625 92.9121 86.9121C94.3625 85.4617 94.3625 83.1098 92.9121 81.6593L73.2528 62L92.9121 42.3407C94.3625 40.8902 94.3625 38.5384 92.9121 37.0879C91.4617 35.6374 89.1098 35.6374 87.6593 37.0879L68 56.7472L48.3407 37.0879Z" fill="url(#paint0_linear_499_1121)" />
                                        </g>
                                    </g>
                                </svg>
                            </button>
                            {ModalContent}
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default PasswordMusic;
