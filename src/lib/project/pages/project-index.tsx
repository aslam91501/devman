import { Card, CardBody, Skeleton } from "@nextui-org/react";
import ProgressInfographics from "../components/SubFeatureInfographics";
import getItemsByProject from "../hooks/getItemsByProject";
import getProjetById from "../hooks/getProjectById"
import getFeatures from "../hooks/getFeatures";
import CustomTitle from "../../shared/components/CustomTitle";

const ProjectIndexPage = () => {
    const { project, loading, error } = getProjetById();
    const { items, error: itemsError, loading: itemsLoading } = getItemsByProject();
    const { features, loading: featuresLoading } = getFeatures();

    if (loading) return <><CustomTitle title="" loading prefix="P" /></>
    if (error) return <><CustomTitle title="" error prefix="P" /></>

    return <>
        <CustomTitle title={project.title} prefix="P" />
        <div className="w-full h-full flex flex-col items-center pt-14">
            <h1 className="font-medium text-xl">{project.title}</h1>
            <p className="mt-3">{project.description}</p>

            <div className="mt-10 flex gap-5 items-center w-1/3">
                <Card  shadow="md" className={`flex-grow`}>
                    <Skeleton isLoaded={!featuresLoading}>
                        <CardBody className="flex flex-col items-center justify-center gap-3 py-5">
                            <span>Features</span>
                            <h1 className="font-medium text-xl">{features?.length}</h1>
                        </CardBody>
                    </Skeleton>
                </Card>

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

            <div className="">
                <ProgressInfographics items={items} isError={itemsError} />
            </div>
        </div>
    </>
}

export default ProjectIndexPage