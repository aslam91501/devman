import { Button, Card, CardBody, CardFooter, CardHeader, Tab, Tabs, useDisclosure } from "@nextui-org/react"
import { UpdateSubFeatureModal } from "../components/UpdateSubFeatureModal";
import { SubFeatureDeleteModal } from "../components/SubFeatureDeleteModal";
import getSubFeatureById from "../hooks/getSubFeatureById";
import { ItemsTable } from "../components/ItemsTable";
import ProgressInfographics from "../components/SubFeatureInfographics";
import getItems from "../hooks/getItems";

const SubFeatureLayout = () => {
    const { subFeature, loading, error } = getSubFeatureById();
    const { items, error: itemsError } = getItems();

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
        <div className="pt-5 px-10 flex flex-col items-center h-full w-full">
            <Tabs variant="bordered" color="primary" radius="sm" classNames={{ tabList: 'bg-white' }}>
                <Tab key="home" title="Home" className="w-full h-full">
                    <div className="flex flex-col justify-center mt-5 px-20">
                        <Card className="text-left p-3" shadow="sm">
                            <CardHeader>
                                <h1 className="text-xl font-medium">{ subFeature.name }</h1>
                            </CardHeader>
                            <CardBody>
                                <p className="text-sm">{ subFeature.description }</p>
                            </CardBody>
                            <CardFooter>
                            <div className="flex justify-center items-center gap-4">
                            <Button variant="flat" onClick={() => editFeatureModalOnOpen()} >Update Feature</Button>
                            <Button variant="flat" onClick={() => deleteFeatureModalOnOpen()} className="text-danger">Delete Feature</Button>
                        </div>
                            </CardFooter>
                        </Card>

                        {/* <div className="p-5 flex justify-center items-center gap-4">
                            <Button variant="flat" onClick={() => editFeatureModalOnOpen()} >Update Feature</Button>
                            <Button variant="flat" onClick={() => deleteFeatureModalOnOpen()} className="text-danger">Delete Feature</Button>
                        </div> */}

                        <UpdateSubFeatureModal data={subFeature!} isOpen={editFeatureModalOpen} onClose={editFeatureModalOnClose} />
                        <SubFeatureDeleteModal data={subFeature!} isOpen={deleteFeatureModalOpen} onClose={deleteFeatureModalOnClose} />
                    
                        <ProgressInfographics isError={itemsError} items={items} />
                    </div>
                </Tab>


                <Tab key="business" title="Requirements" className="w-full h-full">
                    <ItemsTable type="business" />
                </Tab>


                <Tab key="todo" title="Todo" className="w-full h-full">
                    <ItemsTable type="todo" />
                </Tab>

                <Tab key="tests" title="Tests" className="w-full h-full">
                    <ItemsTable type="test" />
                </Tab>
            </Tabs>
        </div>
    </>
}

export default SubFeatureLayout