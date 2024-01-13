import {  useRef } from 'react';
import { Modal, Input, Button, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, Skeleton, Select, SelectItem } from '@nextui-org/react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Bug } from '../models';
import getFeatures from '../hooks/getFeatures';
import useBugsMutation from '../hooks/bugsMutation';



interface Props{
    isOpen: boolean,
    onClose: () => void,
    data: Bug
}

export const EditBugModal = (props: Props) => {
    const title = 'Edit Bug Details';
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const { onClose, isOpen } = props;

    const { features, loading: featuresLoading, error: featuresError } = getFeatures();

    
    const editBugSchema = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        feature: z.string().optional()
    })

    type Schema = z.infer<typeof editBugSchema>;

    const { register, reset, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(editBugSchema),
    })

    const { updateBug } = useBugsMutation({ onClose, reset });

    
    function submitData(data: Schema){
        updateBug({ id: props.data.id, ...data });
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
                                defaultValue={props.data.title}
                                {...register("title")}
                            />
                            <Textarea
                                label="Description"
                                isInvalid={!!errors.description}         
                                errorMessage={errors.description?.message}
                                defaultValue={props.data.description}
                                {...register("description")}
                            />

                            {!featuresError &&
                            <Skeleton isLoaded={!featuresLoading} >
                                <Select
                                    selectedKeys={[props.data.feature ?? '']}
                                    label="Select Feature" 
                                    disabled={featuresLoading}  
                                    {...register("feature")}>
                                    { features?.map((feature) => <SelectItem key={feature.id}>
                                            {feature.name}
                                        </SelectItem> 
                                    )}
                                </Select>
                            </Skeleton>
                            }
                            {featuresError && <span>Could not load features</span>}
                            <button type="submit" value="asdf" className='invisible h-0 w-0' ref={submitButtonRef} />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onPress={() => {submitButtonRef.current?.click();}}>
                            Update Bug Details
                        </Button>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
        </Modal>
    </>
};
    