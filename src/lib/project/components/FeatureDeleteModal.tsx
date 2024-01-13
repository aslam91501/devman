import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { forwardRef } from "react";
import useFeatureMutation from "../hooks/useFeatureMutation";
import { Feature } from "../models";

interface Props{
    data: Feature,
    isOpen: boolean,
    onClose: () => void,
}


export const FeatureDeleteModal = forwardRef(function(props: Props, ref: any) {
    const { deleteFeature } = useFeatureMutation({ onClose: props.onClose });

    const title = 'Delete Feature';

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
                            <p>Are you sure you want to delete this feature? This action cannot be undone.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={props.onClose}>
                                Close
                            </Button>
                            <Button color="danger" onPress={() => deleteFeature(props.data.id)}>
                                { title }
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>;
});