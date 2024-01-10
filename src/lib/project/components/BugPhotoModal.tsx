import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';



interface Props{
    isOpen: boolean,
    onClose: () => void,
    url: string
}

export const BugPhotoModal = (props: Props) => {
    const title= 'Photo';
    const { onClose, isOpen } = props;
    
    return <>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            className='max-h-screen overflow-y-auto z-[1000]'
        >
            <ModalContent>
                {(onClose) => (
                <>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        <img src={props.url} className="w-full" />
                    </ModalBody>
                </>
                )}
            </ModalContent>
        </Modal>
    </>
};
    