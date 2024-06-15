"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import FileUploader from "./FileSelector"
import { createSticker } from "@/lib/actions/sticker.actions"

const formSchema = z.object({
  name: z.string().min(3, 'The name of the sticker must be at least 3 characters long'),
  imageUrl: z.string().url('Invalid URL')
})

const UploadForm = ({userId}: {userId: string}) => {

  const [files, setFiles] = useState<File[]>([])

  const initialValues = {
    name: '',
    imageUrl: '',
  }
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  
  const [loading, setLoading] = useState(false)
  const {startUpload } = useUploadThing('imageUploader')
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>){
    let uploadedImageUrl = values.imageUrl
    setLoading(true)
    if (files.length > 0) {
      const uploadedImage = await startUpload(files)
      if (!uploadedImage) return;
      uploadedImageUrl = uploadedImage[0].url;
    }

    try {
      const newSticker = await createSticker({
        stickerName: values.name,
        stickerUrl: uploadedImageUrl,
        userId
      })

      if (newSticker)  {
        form.reset()
        router.push('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <>
              <FormItem className="w-[95%] md:w-[500px] lg:w-[700px] flex justify-center flex-col">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>
                  Set the public name of the sticker
                </FormDescription>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                    <FormItem className={"w-full flex justify-center"}>
                        <FormControl className={"h-72"}>
                            <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
              />
            </>
          )}
        />
        <Button disabled={loading} type="submit">Upload</Button>
      </form>
    </Form>
  )
}

export default UploadForm;