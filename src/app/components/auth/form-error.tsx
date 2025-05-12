import { Alert } from '@chakra-ui/react';

interface FormErrorProps {
    message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;

    return (
        <Alert.Root status="error" mb={3} padding={1} width={250}>
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Description>{message}</Alert.Description>
            </Alert.Content>
        </Alert.Root>
    );
};

export default FormError;
