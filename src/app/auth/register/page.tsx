'use client';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useState, useTransition } from 'react';
import { FormError } from '../../components/auth/form-error';
import { FormSuccess } from '../../components/auth/from-success';
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
import * as z from 'zod';
import { RegisterSchema } from '@/app/utils/schemas';
import { RegisterServer } from '@/app/actions/register';

const LoginForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        mode: 'onChange', //どのタイミングでエラーを出すかを決める.
        resolver: zodResolver(RegisterSchema) // ←ここでZodとつなげる！
    });
    // エラーメッセージの表示/非表示を制御するstate
    const [error, setError] = useState<string | undefined>('');
    // 成功メッセージの表示/非表示を制御するstate
    const [success, setSuccess] = useState<string | undefined>('');
    // 非同期処理の実行中かどうかを管理するstate
    const [isPending, startTransition] = useTransition();

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');
        // エラー・成功メッセージを一旦リセット（空にする）
        startTransition(async () => {
            try {
                const response = await RegisterServer(values);
                if (response.error) {
                    setError(response.error); // エラーメッセージをセット
                } else {
                    setSuccess(response.success);
                }
            } catch (error) {
                setError('エラーが発生しました');
            }
        });
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
                                {/* errors.emailがnullまたはundefinedの場合でも、エラーを発生させずにundefinedを返します */}
                            </Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={!!errors.password}>
                            <Field.Label>パスワード</Field.Label>
                            <Input
                                {...register('password')}
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

                        <FormError message={error} />
                        <FormSuccess message={success} />
                        {/* 処理中はボタンを無効にして再送信を防ぐ */}
                        <Button type="submit" mb={3} disabled={isPending}>
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
                {/* <a href="#">
                    <button>アカウント登録済みの人</button>
                </a> */}
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
