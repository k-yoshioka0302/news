import * as z from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'メールアドレスを入力してください'
    }),
    password: z.string().min(6, {
        message: 'パスワードは6文字以上で入力してください'
    }),
    
});
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　