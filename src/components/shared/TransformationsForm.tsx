"use client"
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { aspectRatioOptions, defaultValues, transformationTypes } from '@/constants';
import { AspectRatioKey, debounce, deepMergeObjects } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import MediaUploader from './MediaUploader';


export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
});

const TransformationForm = ({action,data=null,userId,creditBalance,config=null,type}:TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config)
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState("");// select value
  const router = useRouter()

  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    aspectRatio: data?.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId,
  } : defaultValues
   
  const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:initialValues
      });

      async function onSubmit(values: z.infer<typeof formSchema>){
          console.log(values)
      }

      const onSelectFieldHandler=(value:string)=>{

            const imageSize = aspectRatioOptions[value as AspectRatioKey]

            setImage((prevState:any)=>({
                ...prevState,
                aspectRatio:imageSize.aspectRatio,
                width:imageSize.width,
                height:imageSize.height
            }))

            setNewTransformation(transformationType.config)

            return value
      }

      const onInputChange=(value:string)=>{
            debounce(()=>{
                setNewTransformation((prevState: any) => ({
                    ...prevState,
                    [type]: {
                      ...prevState?.[type],
                      [value === 'prompt' ? 'prompt' : 'to' ]: value 
                    }
                  }))
            },1000)()

        return value
      }

     const onTransformHandler = async() => {
        setIsTransforming(true);

        setTransformationConfig(
            deepMergeObjects(newTransformation, transformationConfig)
          )
      
          setNewTransformation(null)
      
          startTransition(async () => {
            // await updateCredits(userId, creditFee)
          })

     }  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex flex-col items-center bg-gray-400'>

          <div className=' flex flex-col items-center w-full bg-blue-300 p-5'>
            <h2> Image Title </h2>
            <input {...register('title')} />            
          </div>

          {type === 'fill' && (
            <div className=' flex flex-col items-center w-full bg-blue-300 p-5'>
                <h2> Aspect Ratio </h2>
                <select {...register('aspectRatio')} 
                        onChange={(event) => {
                            setValue(event.target.value); // Update the selected value in the state
                            onSelectFieldHandler(event.target.value); // Call your handler function
                          }} 
                        value={value}      
                >
                <option> Select Size</option>
                {Object.keys(aspectRatioOptions).map((key) => {
                    return (
                        <option key={key} value={key}>
                             {aspectRatioOptions[key as AspectRatioKey].label}
                        </option>
                    );
                })}
            </select>
            </div>
          )}


        {(type==='remove' || type==='recolor' ) && (
            <div className=' flex flex-col items-center w-full bg-blue-300 p-5'>
                <h2> {type==='remove' ? 'Object to Remove':'Object to Recolor'} </h2>
                <input {...register('prompt')} value={value} onChange={(e)=>onInputChange(e.target.value)}/>    
            </div>
        )}


        {type==='recolor' && (
            <div className=' flex flex-col items-center w-full bg-blue-300 p-5'>
            <h2> Replacement Color </h2>
            <input {...register('color')} value={value} onChange={(e)=>onInputChange(e.target.value)}/>    
        </div>
        )}
            
        </div>

        <div className='flex flex-col items-center bg-purple-300'>
          <MediaUploader
            setImage={setImage}
            publicId={value}
            image={image}
            type={type}
          />
        </div>

        <div className='flex flex-col gap-4'>
            <button 
                type='button' 
                disabled={isTransforming || newTransformation==null} 
                className='bg-orange-400 rounded p-3' 
                onClick={onTransformHandler}
            > 
                 {isTransforming ? 'Transforming...' : 'Apply Transformation'} 
            </button>
            <button 
                type='submit' 
                disabled={isSubmitting} 
                className='bg-orange-400 rounded p-3' 
                onClick={handleSubmit(onSubmit)}
            > 
                {isSubmitting ? 'Submitting...' : 'Save Image'}
            </button>
        </div>

    </form>
  )
}

export default TransformationForm