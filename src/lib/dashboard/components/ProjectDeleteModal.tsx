import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { forwardRef } from "react";
import { Project } from "../models";
import useProjectMutation from "../hooks/projectMutation";

interface Props{
    data: Project,
    isOpen: boolean,
    onClose: () => void,
}


export const ProjectDeleteModal = forwardRef(function(props: Props, ref: any) {
    const { deleteProject } = useProjectMutation({ onClose: props.onClose });

    const title = 'Delete Project';

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
                            <p>Are you sure you want to delete this project? This action cannot be undone.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={props.onClose}>
                                Close
                            </Button>
                            <Button color="danger" onPress={() => deleteProject(props.data.id)}>
                                { title }
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>;
});