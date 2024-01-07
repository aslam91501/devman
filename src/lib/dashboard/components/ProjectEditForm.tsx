import {  useRef } from 'react';
import { Modal, Input, Button, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from '@nextui-org/react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import useProjectMutation from '../hooks/projectMutation';
import { Project } from '../models';


interface Props{
    data: Project,
    isOpen: boolean,
    onClose: () => void,
}

export const EditProjectModal = (props: Props) => {
    const title = 'Update Project';
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const { onClose, isOpen, data: project} = props;

    const updateProjectSchema = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
    })

    type Schema = z.infer<typeof updateProjectSchema>;

    const { register, reset, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(updateProjectSchema),
    })

    const { updateProject } = useProjectMutation({ onClose, reset });

    
    function submitData(data: Schema){
        updateProject({ id: project.id, ...data });
    }
    
    return <>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            className='max-h-screen overflow-y-auto'
        >
            <ModalContent>
                {(onClose) => (
                <>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        <form className='flex flex-col gap-5'  onSubmit={handleSubmit(submitData)}>
                            <Input
                                label="Title"
                                isInvalid={!!errors.title}
                                errorMessage={errors.title?.message}
                                defaultValue={project.title}
                                {...register("title")}
                            />
                            <Textarea
                                label="Description"
                                isInvalid={!!errors.description}         
                                errorMessage={errors.description?.message}
                                defaultValue={project.description}
                                {...register("description")}
                            />
                            <button type="submit" value="asdf" className='invisible h-0 w-0' ref={submitButtonRef} />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onPress={() => {submitButtonRef.current?.click();}}>
                            Update Project
                        </Button>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
        </Modal>
    </>
};
    