import { useRef } from 'react';
import { Modal, Input, Button, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import pb from '../../shared/config/pb';
import useProjectMutation from '../hooks/projectMutation';


// interface CreateRequest{
//     description: string;
//     title: string;
// }

// function create(data: CreateRequest) {
//     return pb.collection('enquiries').create(data);
// }

export const CreateProjectModal = () => {
    const title = 'Create Project';
    const { onClose, onOpen, isOpen, onOpenChange } = useDisclosure();
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    
    const createProjectSchema = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
    })

    type Schema = z.infer<typeof createProjectSchema>;

    const { register, reset, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(createProjectSchema)
    })

    const { createProject } = useProjectMutation({ onClose, reset });

    
    function submitData(data: Schema){
        createProject(data);
    }
    
    return <>
        <Button variant="flat" className="bg-primary text-white" onPress={onOpen}>
            Create Project
        </Button>

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
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
                                {...register("title")}
                            />
                            <Textarea
                                label="Description"
                                isInvalid={!!errors.description}         
                                errorMessage={errors.description?.message}
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
                            Create Project
                        </Button>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
        </Modal>
    </>
};
    