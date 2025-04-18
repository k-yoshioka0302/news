'use client';
import React from 'react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const LoginButton = () => {
    const router = useRouter();
    const onClick = () => {
        router.push('/auth/login');
    };
    return (
        <Button onClick={onClick} mb={3} colorScheme="teal" width={250}>
            ログイン
        </Button>
    );
};
export default LoginButton;
