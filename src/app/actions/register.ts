'use server';

import { z } from 'zod';
import { RegisterSchema } from '@/app/utils/schemas';

export const RegisterServer = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    console.log(validatedFields.data);

    if (!validatedFields.success) {
        return { error: '入力内容を修正してください' };
    }
    return { error: 'エラーが発生しました' };
};
