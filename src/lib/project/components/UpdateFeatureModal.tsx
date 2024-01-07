import {  useRef } from 'react';
import { Modal, Input, Button, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from '@nextui-org/react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import useFeatureMutation from '../hooks/useFeatureMutation';
import { Feature } from '../models';



interface Props{
    isOpen: boolean,
    onClose: () => void,
    data: Feature
}

export const UpdateFeatureModal = (props: Props) => {
    const title = 'Update Feature';
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const { onClose, isOpen } = props;

    const updateFeatureSchema = z.object({
        name: z.string().min(3),
        description: z.string().min(10),
    })

    type Schema = z.infer<typeof updateFeatureSchema>;

    const { register, reset, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(updateFeatureSchema),
    })

    const { updateFeature } = useFeatureMutation({ onClose, reset });

    
    function submitData(data: Schema){
        updateFeature({ id: props.data.id, ...data });
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
                                label="Feature Name"
                                isInvalid={!!errors.name}
                                errorMessage={errors.name?.message}
                                defaultValue={props.data.name}
                                {...register("name")}
                            />
                            <Textarea
                                label="Description"
                                isInvalid={!!errors.description}         
                                errorMessage={errors.description?.message}
                                defaultValue={props.data.description}
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
                            Create Feature
                        </Button>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
        </Modal>
    </>
};
    