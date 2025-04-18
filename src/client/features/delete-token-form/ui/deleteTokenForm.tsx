import { Button } from '@plex-inc/bricks/components';

import { useTokensMutations } from '@/shared/modules/tokensHooks';

interface Props {
    code: string;
    onClose: () => void;
}

export const DeleteTokenForm = ({ code, onClose }: Props) => {
    const { deleteToken } = useTokensMutations();
    const handleSubmit = async () => {
        try {
            const res = await deleteToken(code);
            if (!res._isError) {
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return <Button view="danger" onClick={handleSubmit} text="Удалить" />;
};
