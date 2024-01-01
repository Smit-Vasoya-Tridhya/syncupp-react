'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation'


export default function HomePage() {

    const isMedium = useMedia('(max-width: 1200px)', false);

    const router = useRouter()

    const onSubmit: SubmitHandler = (data) => {
        console.log('Sign in data', data);
        router.replace('/signin');
    };

    return (
        <>
            <Form
                onSubmit={onSubmit}
            >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5 p-3">
                        <Button
                            className="border-2 border-primary-light text-base font-bold float-right"
                            type="submit"
                            size={isMedium ? 'lg' : 'xl'}
                            color="info"
                            rounded="pill"
                        >
                            Sign in
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}