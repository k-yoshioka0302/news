import { Alert, CloseButton } from '@chakra-ui/react';

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
    if (!message) return null;

    return (
        <Alert.Root>
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title>アカウントを登録しました</Alert.Title>
                <Alert.Description>
                    {message}
                </Alert.Description>
            </Alert.Content>
            <CloseButton pos="relative" top="-2" insetEnd="-2" />
        </Alert.Root>
    );
};

export default FormSuccess;
