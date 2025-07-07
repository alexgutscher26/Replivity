import type { SourcePlatform } from '@/schemas/source'
import type { StatusFormData } from '@/schemas/status'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useContentParser } from '@/hooks/useContentParser'
import { statusSchema } from '@/schemas/status'
import { tones } from '@/schemas/tone'
import { zodResolver } from '@hookform/resolvers/zod'
import { TRPCClientError } from '@trpc/client'
import { Loader2 } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

export function Status({ source }: { source: SourcePlatform }) {
    const trpc = useTRPC()
    const parser = useContentParser(source)
    const formRef = useRef<HTMLFormElement>(null)
    const [loadingTone, setLoadingTone] = useState<null | string>(null)

    const form = useForm<StatusFormData>({
        defaultValues: {
            keyword: '',
            tone: 'neutral', // Set default tone
        },
        resolver: zodResolver(statusSchema),
    })

    const onSubmit = async (formData: StatusFormData) => {
        setLoadingTone(formData.tone)
        try {
            const response = await trpc.generate.mutate({
                source,
                text: formData.keyword,
                tone: formData.tone,
                type: 'status',
            })
            if (!response)
                return

            await parser.setText(response.text, formRef.current || undefined)
        }
        catch (error) {
            await parser.setText(error instanceof TRPCClientError ? error.message : 'Error: Unknown error', formRef.current || undefined)
        }
        finally {
            setLoadingTone(null)
        }
    }

    return (
        <Form {...form}>
            <form
                className="flex gap-2"
                onSubmit={form.handleSubmit(onSubmit)}
                ref={formRef}
            >
                <FormField
                    control={form.control}
                    name="keyword"
                    render={({ field }) => (
                        <FormItem className="flex-1 relative z-10">
                            <FormControl>
                                <input
                                    placeholder="Enter keywords to inspire your tweet ..."
                                    {...field}
                                    onClick={e => e.stopPropagation()}
                                    onFocus={e => e.stopPropagation()}
                                    value={field.value ?? ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <select
                                    {...field}
                                    onClick={e => e.stopPropagation()}
                                    onFocus={e => e.stopPropagation()}
                                    value={field.value}
                                >
                                    {tones.map(({ emoji, name }) => (
                                        <option key={name} value={name}>
                                            {emoji}
                                            {' '}
                                            {name.charAt(0).toUpperCase() + name.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={!form.formState.isValid || loadingTone !== null} type="submit">
                    {loadingTone
                        ? (
                            <>
                                <Loader2 className="animate-spin" />
                                {' '}
                                Generating
                            </>
                        )
                        : (
                            'Generate'
                        )}
                </Button>
            </form>
        </Form>
    )
}
