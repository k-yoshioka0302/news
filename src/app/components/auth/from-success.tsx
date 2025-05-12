import { Alert, CloseButton } from '@chakra-ui/react';

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
    if (!message) return null;

    return (
        <Alert.Root mb={3} padding={1} width={250}>
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Description>{message}</Alert.Description>
            </Alert.Content>
            <CloseButton pos="relative" top="-2" insetEnd="-2" />
        </Alert.Root>
    );
};

export default FormSuccess;
