'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Setting from './Setting';
import Password from './Password';
import Annoucement from './Annoucement';
import Share from './Share';
import Modal from '../ui/Modal';

const Settings = () => {
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState("");


    const handleModalOpen = (type: string) => {
        setModalType(type);
        setOpen(true);
    };

    // Dynamically render the modal content based on modalType using a switch statement
    let ModalContent;
    switch (modalType) {
        case "SETTING":
            ModalContent = <Setting />;

            break;
        case "MODIFY PASSWORD":
            ModalContent = <Password />;
            break;

        case "ANNOUNCEMENT":
            ModalContent = <Annoucement />;
            break;

        case "SHARE":
            ModalContent = <Share />;
            break;
        default:
            ModalContent = null; // No modal content by default
    }

    return (
        <>
            <div className="flex justify-center portrait:pl-[2vh] landscape:pl-[2vw] items-center portrait:gap-x-[2.5vh] landscape:gap-x-[2.5vw] pt-[.6vw]">
                {/* Icon 1 */}
                <button onClick={() => handleModalOpen("SHARE")} className="flex cursor-pointer hover:opacity-50 transition-all flex-col  items-center">
                    <Image src="/assets/images/share.png" alt="Share" width={100} height={100} quality={100} className='portrait:w-[1.7vh] portrait:h-[1.7vh] landscape:w-[1.7vw] landscape:h-[1.7vw]' />
                    <p className=" tracking-wide
bg-gradient-to-b from-[#FFF4A3] via-[#F8F4A8] to-[#FFFFFF] 
bg-clip-text text-transparent 
portrait:text-[.9vh] landscape:text-[.9vw] font-bold">
                        Share
                    </p>

                </button>

                {/* Icon 2 */}
                <button onClick={() => handleModalOpen("ANNOUNCEMENT")} className="flex flex-col cursor-pointer hover:opacity-50 transition-all items-center">
                    <Image src="/assets/images/announcment.png" alt="Announcement" width={100} height={100} quality={100} className='portrait:w-[1.7vh] portrait:h-[1.7vh] landscape:w-[1.7vw] landscape:h-[1.7vw]' />
                    <p className=" tracking-wide
bg-gradient-to-b from-[#FFF4A3] via-[#F8F4A8] to-[#FFFFFF] 
bg-clip-text text-transparent 
portrait:text-[.9vh] landscape:text-[.9vw] font-bold">Announcement</p>
                </button>

                {/* Icon 3 */}
                <button onClick={() => handleModalOpen("MODIFY PASSWORD")} className="flex flex-col cursor-pointer hover:opacity-50 transition-all items-center">
                    <Image src="/assets/images/password.png" alt="Password" width={100} height={100} quality={100} className='portrait:w-[1.7vh] portrait:h-[1.7vh] landscape:w-[1.7vw] landscape:h-[1.7vw]' />
                    <p className=" tracking-wide
bg-gradient-to-b from-[#FFF4A3] via-[#F8F4A8] to-[#FFFFFF] 
bg-clip-text text-transparent 
portrait:text-[.9vh] landscape:text-[.9vw] font-bold">Password</p>
                </button>

                {/* Icon 4 */}
                <button onClick={() => handleModalOpen("SETTING")} className="flex flex-col cursor-pointer hover:opacity-50 transition-all items-center">
                    <Image src="/assets/images/setting.png" alt="setting" width={100} height={100} quality={100} className='portrait:w-[1.7vh] portrait:h-[1.7vh] landscape:w-[1.7vw] landscape:h-[1.7vw]' />
                    <p className=" tracking-wide
bg-gradient-to-b from-[#FFF4A3] via-[#F8F4A8] to-[#FFFFFF] 
bg-clip-text text-transparent 
portrait:text-[.9vh] landscape:text-[.9vw] font-bold">Setting</p>
                </button>
            </div>
            <Modal
                isOpen={open}
                setOpen={setOpen}
                modalType={modalType}
                setModalType={setModalType}
            >
                {ModalContent}
            </Modal>
        </>
    )
}

export default Settings
