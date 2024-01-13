import { Modal, Button, useDisclosure, ModalContent, ModalHeader, ModalBody, Card, Skeleton, CardBody, Spinner } from '@nextui-org/react';
import getItemsByFeature from '../hooks/getItemsByFeature';
import ProgressInfographics from './SubFeatureInfographics';
import getSubFeatures from '../hooks/getSubFeatures';
import classNames from 'classnames';

export const FeatureProgressModal = () => {
    const { items, loading, error } = getItemsByFeature();
    const { subFeatures, loading: subFeaturesLoading, error: subFeaturesError } = getSubFeatures();

    const title = 'Feature Progress';
    const { onClose, onOpen, isOpen, onOpenChange } = useDisclosure();
   
    if(loading) return <>Loading</>
    
    return <>
        <Button 
            variant="flat" 
            isDisabled={loading} 
            className={classNames({"bg-primary text-white" : !(loading || subFeaturesLoading) })} 
            onPress={onOpen}>
            { (loading || subFeaturesLoading) ? <Spinner color='primary' /> :  "View Feature Status" }
        </Button>

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            title={title}
            className='max-h-screen'
            size='4xl'
        >
            <ModalContent>
                {(onClose) => (
                <>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody className='pb-10'>
                        <div className="mt-10 flex gap-5 items-center w-full">
                            <Card  shadow="md" className={`flex-grow`}>
                                <Skeleton isLoaded={!subFeaturesLoading}>
                                    <CardBody className="flex flex-col items-center justify-center gap-3 py-5">
                                        <span>Sub-Features</span>
                                        <h1 className="font-medium text-xl">{subFeatures.length}</h1>
                                    </CardBody>
                                </Skeleton>
                            </Card>

                            <Card  shadow="md" className={`flex-grow`}>
                                <Skeleton isLoaded={!loading}>
                                    <CardBody className="flex flex-col items-center justify-center gap-3 py-5">
                                        <span>Items</span>
                                        <h1 className="font-medium text-xl">{items.length}</h1>
                                    </CardBody>
                                </Skeleton>
                            </Card>
                        </div>
                        
                        <ProgressInfographics items={items} isError={error} />
                    </ModalBody>
                </>
                )}
            </ModalContent>
        </Modal>
    </>
};
    