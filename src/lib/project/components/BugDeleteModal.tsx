import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { forwardRef } from "react";
import { Bug } from "../models";
import useBugsMutation from "../hooks/bugsMutation";

interface Props{
    data: Bug,
    isOpen: boolean,
    onClose: () => void,
}


export const BugDeleteModal = forwardRef(function(props: Props, ref: any) {
    const { deleteBug } = useBugsMutation({ onClose: props.onClose });

    const title = 'Delete Bug';

    return <>
        <Button ref={ref} color="primary" className='hidden w-fit'>{title}</Button>

        <Modal
            isOpen={props.isOpen}
            title={title}
            onClose={props.onClose}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to delete this bug? This action cannot be undone.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={props.onClose}>
                                Close
                            </Button>
                            <Button color="danger" onPress={() => deleteBug(props.data.id)}>
                                { title }
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>;
});