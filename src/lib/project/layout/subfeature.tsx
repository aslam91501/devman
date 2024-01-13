import { Button, Card, CardBody, CardFooter, CardHeader, Skeleton, Tab, Tabs, useDisclosure } from "@nextui-org/react"
import { UpdateSubFeatureModal } from "../components/UpdateSubFeatureModal";
import { SubFeatureDeleteModal } from "../components/SubFeatureDeleteModal";
import getSubFeatureById from "../hooks/getSubFeatureById";
import { ItemsTable } from "../components/ItemsTable";
import ProgressInfographics from "../components/SubFeatureInfographics";
import getItems from "../hooks/getItems";
import CustomTitle from "../../shared/components/CustomTitle";

const SubFeatureLayout = () => {
    const { subFeature, loading, error } = getSubFeatureById();
    const { items, error: itemsError, loading: itemsLoading } = getItems();

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




    if(loading) return <><CustomTitle title="" prefix="SF" loading /> Loading</>
    if(error) return <><CustomTitle title="" prefix="SF" error /> Error</>

    return <>
        <CustomTitle title={ subFeature.name } prefix="SF" />
        
        <div className="pt-5 px-10 flex flex-col items-center h-full w-full">
            <Tabs variant="bordered" color="primary" radius="sm" classNames={{ tabList: 'bg-white' }}>
                <Tab key="home" title="Home" className="w-full h-full">
                    <div className="flex flex-col justify-center mt-5 px-20 pb-10">
                        <Card className="text-left p-3" shadow="md">
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
                       
                       <div className="mt-10 flex gap-5 items-center">
                            <Card  shadow="md" className={`flex-grow`}>
                                <Skeleton isLoaded={!itemsLoading}>
                                    <CardBody className="flex flex-col items-center justify-center gap-3 py-5">
                                        <span>Items</span>
                                        <h1 className="font-medium text-xl">{items?.length}</h1>
                                    </CardBody>
                                </Skeleton>
                            </Card>

                            <Card  shadow="md" className={`flex-grow`}>
                                <Skeleton isLoaded={!itemsLoading}>
                                    <CardBody className="flex flex-col items-center justify-center gap-3 py-5">
                                        <span>Items Done</span>
                                        <h1 className="font-medium text-xl">{items?.filter(i => i.done)?.length}</h1>
                                    </CardBody>
                                </Skeleton>
                            </Card>
                        </div>
                        
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