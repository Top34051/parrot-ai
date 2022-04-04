import tw from "twin.macro";
import NextLink from 'next/link'
import { FcSpeaker } from "react-icons/fc";
import { BsRecordFill, BsStopFill } from "react-icons/bs";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";


function Button({
    buttonType,
    size,  
    onClick
}: {
    buttonType: string,
    size: string,
    onClick?: () => void,
}) : JSX.Element {

    if (buttonType === 'audio') {
        return (
            <button onClick={onClick}>
                {size === 'normal' && <FcSpeaker size={20} tw='text-white rounded-full border border-gray-400 h-16 w-16 p-2'/>}
                {size === 'mini' && <FcSpeaker size={20} tw='text-white rounded-3xl border border-gray-300 h-9 w-14'/>}
            </button>
        );
    }

    if (buttonType === 'start-record') {
        return (
            <button onClick={onClick}>
                {size === 'normal' && <BsRecordFill size={10} color='#de5246' tw='text-white rounded-full bg-gray-300 h-16 w-16 p-2'/>}
                {size === 'mini' && <BsRecordFill size={10} color='#de5246' tw='text-white rounded-3xl bg-gray-300 h-9 w-14 p-1'/>}
            </button>
        );
    }

    if (buttonType === 'stop-record') {
        return (
            <button onClick={onClick}>
                {size === 'normal' && <BsStopFill size={10} color='#de5246' tw='text-white rounded-full bg-gray-300 h-16 w-16 p-2'/>}
                {size === 'mini' && <BsStopFill size={10} color='#de5246' tw='text-white rounded-3xl bg-gray-300 h-9 w-14 p-1'/>}
            </button>
        );
    }

    if (buttonType === 'next') {
        return (
            <button onClick={onClick}>
                {size === 'normal' && <HiArrowSmRight size={20} tw='text-white rounded-3xl bg-green-500 h-12 w-24'/>}
                {size === 'mini' && <HiArrowSmRight size={20} tw='text-white rounded-3xl bg-green-500 h-9 w-14'/>}
            </button>
        );
    }

    if (buttonType === 'back') {
        return (
            <button onClick={onClick}>
                {size === 'normal' && <HiArrowSmLeft size={20} tw='text-white rounded-3xl bg-gray-400 h-12 w-24'/>}
                {size === 'mini' && <HiArrowSmLeft size={20} tw='text-white rounded-3xl bg-gray-400 h-9 w-14'/>}
            </button>
        );
    }

    return <HiArrowSmRight size={20} tw='text-white rounded-3xl bg-green-500 h-9 w-14'/>;
};

function LinkedButton({
    buttonType,
    size,
    href
}: {
    buttonType: string,
    size: string,
    href: string
}) : JSX.Element {
    return (
        <NextLink href={href} passHref>
            <a>
                <Button buttonType={buttonType} size={size}/>
            </a>
        </NextLink>
    )
}

export default {
    Button,
    LinkedButton
}