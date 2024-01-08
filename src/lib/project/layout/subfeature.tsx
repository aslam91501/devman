import { Button, Tab, Tabs, useDisclosure } from "@nextui-org/react"
import { UpdateSubFeatureModal } from "../components/UpdateSubFeatureModal";
import { SubFeatureDeleteModal } from "../components/SubFeatureDeleteModal";
import getSubFeatureById from "../hooks/getSubFeatureById";

const SubFeatureLayout = () => {
    const { subFeature, loading, error } = getSubFeatureById();

    const { 
        isOpen: editFeatureModalOpen, 
        onOpen: editFeatureModalOnOpen, 
        onClose: editFeatureModalOnClose 
    }  = useDisclosure();

    const { 
        isOpen: deleteFeatureModalOpen, 
        onOpen: deleteFeatureModalOnOpen, 
        onClose: deleteFeatureModalOnClose 
    }  = useDisclosure();

    if(loading) return <>Loading</>
    if(error) return <>Error</>

    return <>
        <div className="pt-5 px-10 flex flex-col h-full">
            <div className="flex justify-center">
                <Tabs variant="bordered" color="primary" className="bg-white" radius="sm">
                    <Tab key="home" title="Home" />
                    <Tab key="business" title="Requirements" />
                    <Tab key="todo" title="Todo" />
                    <Tab key="tests" title="Tests" />
                </Tabs>
            </div>

            
            <div className="flex flex-col justify-center mt-5">
                <div className="p-5 flex justify-center items-center gap-4">
                    <Button variant="flat" onClick={() => editFeatureModalOnOpen()} >Update Feature</Button>
                    <Button variant="flat" onClick={() => deleteFeatureModalOnOpen()} className="text-danger">Delete Feature</Button>
                </div>

                <UpdateSubFeatureModal data={subFeature!} isOpen={editFeatureModalOpen} onClose={editFeatureModalOnClose} />
                <SubFeatureDeleteModal data={subFeature!} isOpen={deleteFeatureModalOpen} onClose={deleteFeatureModalOnClose} />
            </div>
        </div>
    </>
}

export default SubFeatureLayout