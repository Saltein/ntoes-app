import { useCallback, useRef, useState } from "react";

interface UseDebouncedSaveOptions {
    delay?: number;
    onSave?: () => void;
    onError?: (error: Error) => void;
}

export function useDebouncedSave<T>(
    saveFunction: (data: T) => Promise<void>,
    options: UseDebouncedSaveOptions = {},
) {
    const { delay = 1000, onSave, onError } = options;
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined,
    );
    const pendingDataRef = useRef<T | null>(null);

    const debouncedSave = useCallback(
        (data: T) => {
            pendingDataRef.current = data;

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(async () => {
                if (pendingDataRef.current) {
                    setIsSaving(true);
                    try {
                        await saveFunction(pendingDataRef.current);
                        setLastSaved(new Date());
                        onSave?.();
                    } catch (error) {
                        onError?.(error as Error);
                    } finally {
                        setIsSaving(false);
                        pendingDataRef.current = null;
                    }
                }
            }, delay);
        },
        [delay, saveFunction, onSave, onError],
    );

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            pendingDataRef.current = null;
        }
    }, []);

    return {
        debouncedSave,
        isSaving,
        lastSaved,
        cancel,
    };
}
