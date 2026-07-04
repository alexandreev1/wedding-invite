import { memo, useCallback, useState } from 'react';
import { Avatar, FileInput, Group, Loader, Text } from '@mantine/core';
import { ImagePlus } from 'lucide-react';
import { api } from '../../shared/api';

function PhotoUpload({
    value,
    onUpload,
}: {
    value: string;
    onUpload: (url: string) => void;
}) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = useCallback(
        async (file: File | null) => {
            if (!file) {
                return;
            }

            setError(null);
            setIsUploading(true);
            try {
                const formData = new FormData();
                formData.append('file', file);
                // Content-Type не задаём — axios сам поставит multipart/form-data с границей
                const { data } = await api.post<{ url: string }>('/upload', formData);
                onUpload(data.url);
            } catch {
                setError('Не удалось загрузить фото');
            } finally {
                setIsUploading(false);
            }
        },
        [onUpload],
    );

    return (
        <div className="w-full">
            <Group align="flex-end" gap="sm" wrap="nowrap">
                <Avatar src={value || null} size={56} radius="xl" bg="gray.2">
                    <ImagePlus size={20} />
                </Avatar>
                <FileInput
                    className="w-full"
                    label="Фото"
                    placeholder="Выберите изображение"
                    accept="image/png,image/jpeg,image/gif,image/webp"
                    leftSection={isUploading ? <Loader size="xs" /> : <ImagePlus size={18} />}
                    onChange={handleFileChange}
                    disabled={isUploading}
                />
            </Group>
            {error && (
                <Text size="xs" c="red" mt={4}>
                    {error}
                </Text>
            )}
        </div>
    );
}

export default memo(PhotoUpload);