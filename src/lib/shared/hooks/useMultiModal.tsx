import { useState } from "react";

const useMultiModal = () => {
    const [isOpen, setIsOpen] = useState<Map<string, boolean>>(new Map<string, boolean>());

    const toggle = (id: string) => {
        setIsOpen((prev) => {
            const newState = new Map(prev);

            newState.set(id, !prev.get(id));

            return newState;
        });
    }

    return {
        isOpen,
        toggle
    }
}

export default useMultiModal;