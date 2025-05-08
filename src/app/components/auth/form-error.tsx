import { Alert } from '@chakra-ui/react';

interface FormErrorProps {
    message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;
    
    return (
        <Alert.Root status="error" mb={2}>
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title>無効な入力</Alert.Title>
                <Alert.Description>
                    {message}
                </Alert.Description>
            </Alert.Content>
        </Alert.Root>
    );
};

export default FormError;
