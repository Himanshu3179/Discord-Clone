"use client"
import { UploadDropzone } from '@/lib/uploadthing'
import React from 'react'
import "@uploadthing/react/styles.css"
import Image from 'next/image';
import { X } from 'lucide-react';

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "serverImage" | "messageFile"
}

const FIleUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps
) => {
    const fileType = value?.split(".").pop()

    if (value && fileType != "pdf") {
        return (
            <div className='relative h-20 w-20'>
                <Image
                    fill
                    src={value}
                    alt='Upload'
                    className='rounded-lg'
                />
                <button
                    className='bg-rose-500 text-white -top-2 -right-2 absolute rounded-full shadow-sm p-1'
                    type='button'
                >
                    <X className='h-4 w-4 ' />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}

export default FIleUpload 