"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FIleUpload from '@/components/file-upload'
import { useRouter } from 'next/navigation'
import axios from 'axios'
const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required'
  }).max(32),
  imageUrl: z.string().min(1, {
    message: 'Server image is required'
  })
})

const InitialModal = () => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setMounted(true)
  }, [])


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: ''
    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values)
      form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  if (!mounted) return null

  return (
    <Dialog open>
      <DialogContent className='bg-white text-black overflow-hidden p-0'>
        <DialogHeader className='p-5'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Welcome to Discord
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            You can create a server or join an existing one.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='p-5 pt-0'>
            <div className='space-y-8'>
              <div className='flex justify-center items-center'>
                <FormField
                  control={form.control}
                  name='imageUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FIleUpload
                          endpoint='serverImage'
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold text-black' >
                      Server Name
                    </FormLabel>
                    <FormControl >
                      <Input
                        disabled={isLoading}
                        placeholder='Enter a server name'
                        className='bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 '
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button variant={'primary'}
                disabled={isLoading}
              >
                Create
              </Button>
            </DialogFooter>

          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}

export default InitialModal