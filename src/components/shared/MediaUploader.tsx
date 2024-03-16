"use client"
import React from 'react'
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { dataUrl, getImageSize } from '@/lib/utils';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
 

declare type MediaUploaderProps = {
    setImage: React.Dispatch<any>;
    publicId: string;
    image: any;
    type: string;
}


const MediaUploader = ({
    setImage,
    image,
    publicId,
    type
  }: MediaUploaderProps) => {


    const onUploadSuccessHandler = (result:any)=>{
        setImage((prevState: any) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url
          }))
      
        //toast
        console.log("image uploaded")
    }
    
    const onUploadErrorHandler = ()=>{
        //toast
        console.log("error uploading image")
    }

  return (
        <CldUploadWidget 
            uploadPreset="pik_123"
            options={{
                multiple:false,
                resourceType:'image'
            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
        {({ open }) => {
                return (
                <div className='flex flex-col items-center gap-4'>
                    <h3 className='text-3xl'> Original </h3>
                                {publicId ? (
                        <>
                        <div className="cursor-pointer overflow-hidden rounded-[10px]">
                            <CldImage 
                                width={getImageSize(type, image, "width")}
                                height={getImageSize(type, image, "height")}
                                src={publicId}
                                alt="image"
                                sizes={"(max-width: 767px) 100vw, 50vw"}
                                placeholder={dataUrl as PlaceholderValue}
                                className=""
                            />
                        </div>
                        </>
                    ): (
                        <div className="flex flex-col items-center" onClick={() => open()}>
                        <div className="">
                            <Image 
                                src="/assets/icons/add.svg"
                                alt="Add Image"
                                width={24}
                                height={24}
                            />
                        </div>
                            <p className="p-14-medium">Click here to upload image</p>
                        </div>
                    )}
                    </div>
                );
        }}
        </CldUploadWidget>
  )
}

export default MediaUploader
