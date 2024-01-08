import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { forwardRef } from "react";
import { Feature, SubFeature } from "../models";
import useSubFeatureMutation from "../hooks/useSubFeatureMutation";

interface Props{
    data: SubFeature,
    isOpen: boolean,
    onClose: () => void,
}


export const SubFeatureDeleteModal = forwardRef(function(props: Props, ref: any) {
    const { deleteSubFeature } = useSubFeatureMutation({ onClose: props.onClose });

    const title = 'Delete Sub-Feature';

    return <>
        <Button ref={ref} color="primary" className='hidden w-fit'>{title}</Button>

        <Modal
            isOpen={props.isOpen}
            title={title}
            onClose={props.onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to delete this sub-feature? This action cannot be undone.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={props.onClose}>
                                Close
                            </Button>
                            <Button color="danger" onPress={() => deleteSubFeature(props.data.id)}>
                                { title }
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>;
});