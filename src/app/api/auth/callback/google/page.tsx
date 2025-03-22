'use client';
import React from 'react';
import {
    Button, Flex, Heading, Input,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { auth } from '../../../..//auth';
import { SignOut } from '../../../../components/auth/signout/signout-button';

// const Logout = () => {
//     // const session = await auth();
//     // if (!session?.user) return <SignIn />;

//     return (
//         <>
//             {/* {session && ( */}
//             <>

//                 <p>ユーザーはログインしています。</p>
//                 <SignOut />
//             </>
//             {/* )} */}
//         </>
//     );
// };
const LoginForm = () => {

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex
                direction="column"
                background="gray.100"
                padding={20}
                rounded={6}
            >
                <Heading mb={6} fontSize={28} >ログイン</Heading>
                
                <Input
                    placeholder="sample@sample.com"
                    variant="outline"
                    mb={5}
                    width={250}
                    type="email"
                />
                
                <Input
                    placeholder="パスワード"
                    variant="outline"
                    mb={6}
                    type="password"
                />
                
                <Button mb={6} colorScheme="teal">
                    ログイン
                </Button>
            </Flex>
        </Flex>
    );
};
export default LoginForm;

export function Home() {
    return (
        <>
            <LoginForm />
        </>
    );
}
