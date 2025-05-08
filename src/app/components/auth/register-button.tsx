'use client';
import React from 'react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';




const RegisterButton = () => {
    const router = useRouter();
    const onClick = () => {
        router.push('/auth/register');
    };
    return (
        <>
            <Button onClick={onClick} mb={4} colorScheme="teal" width={250}>
                アカウント登録
            </Button>
        </>
    );
};
export default RegisterButton;
