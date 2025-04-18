'use client';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsTwitterX } from 'react-icons/bs';
import {
    Button,
    Flex,
    Heading,
    HStack,
    Input,
    Field,
    Stack
} from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginButton from '@/app/components/auth/login-button';
import { useState } from 'react';
import * as z from 'zod';
import { RegisterSchema } from '@/app/utils/schemas';

const LoginForm = () => {
    const [value, setValue] = useState('');
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        mode: 'onChange', //どのタイミングでエラーを出すかを決める
        resolver: zodResolver(RegisterSchema) // ←ここでZodとつなげる！
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log(values);
    };

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex
                direction="column"
                background="gray.100"
                padding={20}
                rounded={6}
            >
                <Heading mb={6} fontSize={28}>
                    ログイン
                </Heading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap={1}>
                        <Field.Root invalid={!!errors.email}>
                            <Field.Label>メールアドレス</Field.Label>
                            <Input
                                {...register('email')}
                                placeholder=" sample@sample.com"
                                size="lg"
                                variant="outline"
                                mb={1}
                                width={250}
                                type="email"
                            />

                            <Field.ErrorText>
                                {errors.email?.message}
                            </Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.password}>
                            <Field.Label>パスワード</Field.Label>
                            <PasswordInput
                                value={value}
                                {...register('password', {
                                    onChange: (e) => setValue(e.target.value)
                                })}
                                placeholder=" パスワード"
                                size="lg"
                                variant="outline"
                                css={{ '--focus-color': '#dcdcdc' }}
                                mb={2}
                                width={250}
                                type="password"
                            />
                            <Field.ErrorText>
                                {errors.password?.message}
                            </Field.ErrorText>
                        </Field.Root>
                        <Button type="submit" mb={3}>
                            アカウント登録
                        </Button>
                    </Stack>
                </form>
                <LoginButton />

                <HStack wrap="wrap" gap="6">
                    <Button
                        variant="outline"
                        colorPalette="gray"
                        padding={3}
                        width={113}
                    >
                        <FcGoogle />
                    </Button>

                    <Button
                        variant="outline"
                        colorPalette="gray"
                        padding={3}
                        width={113}
                    >
                        <BsTwitterX />
                    </Button>
                </HStack>
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
