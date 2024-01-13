import { Modal, Button, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import { Bug, BugStatus } from '../models';
import useBugsMutation from '../hooks/bugsMutation';



interface Props{
    isOpen: boolean,
    onClose: () => void,
    data: Bug
}

export const BugStatusModal = (props: Props) => {
    const title = 'Set Bug Status';
    const { onClose, isOpen } = props;

    const { updateBug } = useBugsMutation({ onClose });

    
    function select(status: BugStatus){
        updateBug({ id: props.data.id, status });
    }
    
    return <>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            className='max-h-screen overflow-y-auto  w-64 py-5 px-3'
        >
            <ModalContent>
                {() => (
                <>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-3">
                            <Button color={props.data.status === 'unresolved' ? 'primary' : 'default' }  onClick={() => select('unresolved')}>Unresolved</Button>
                            <Button color={props.data.status === 'triage' ? 'primary' : 'default' }  onClick={() => select('triage')}>Triage</Button>
                            <Button color={props.data.status === 'resolved' ? 'primary' : 'default' }  onClick={() => select('resolved')}>Resolved</Button>
                        </div>
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                    </ModalFooter> */}
                </>
                )}
            </ModalContent>
        </Modal>
    </>
};
    