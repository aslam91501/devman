import { useRef } from 'react';
import { Modal, Input, Button, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, Skeleton, Select, SelectItem } from '@nextui-org/react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import useBugsMutation from '../hooks/bugsMutation';
import { useParams } from 'react-router-dom';
import getFeatures from '../hooks/getFeatures';

export const CreateBugModal = () => {
    const {pid} = useParams();

    const title = 'Report Bug';
    const { onClose, onOpen, isOpen, onOpenChange } = useDisclosure();
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const { features, loading: featuresLoading, error: featuresError } = getFeatures();

    
    const createBugSchema = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        feature: z.string().optional()
    })

    type Schema = z.infer<typeof createBugSchema>;

    const { register, reset, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(createBugSchema)
    })

    const { createBug } = useBugsMutation({ onClose, reset });

    
    function submitData(data: Schema){
        createBug({ ...data, project: pid!, status: 'unresolved' });
    }
    
    return <>
        <Button variant="flat" className="bg-primary text-white" onPress={onOpen}>
            New Bug
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

                            {!featuresError &&
                            <Skeleton isLoaded={!featuresLoading} >
                                <Select
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
                            Report Bug
                        </Button>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
        </Modal>
    </>
};
    