import { Button, Listbox, ListboxItem, Select, SelectItem, SelectSection, Skeleton, useDisclosure } from "@nextui-org/react"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import getFeatures from "../hooks/getFeatures";
import { ChangeEvent, useEffect, useState } from "react";
import { CreateFeatureModal } from "../components/CreateFeatureModal";
import { CreateSubFeatureModal } from "../components/CreateSubFeatureModal";
import getSubFeatures from "../hooks/getSubFeatures";
import { UpdateFeatureModal } from "../components/UpdateFeatureModal";
import { Feature } from "../models";
import { FeatureDeleteModal } from "../components/FeatureDeleteModal";
import { set } from "zod";

const FeatureListPage = () => {
    const { features, loading, error } = getFeatures();
    const { subFeatures, loading: subFeaturesLoading, error: subFeaturesError } = getSubFeatures();

    const path = useLocation().pathname;
    const {pid, fid, sfid} = useParams();
    const featureSelected = path.startsWith(`/p/${pid}/f/`) && path !== `/p/${pid}/f/`;
    const [feature, setFeature] = useState<Feature>();

    useEffect(() => { 
        if(features && features.length > 0 && featureSelected) {
            setFeature(features.find((feature) => feature.id === fid));
        }
    }, [features])

    const navigate = useNavigate();

    const [selection, setSelection] = useState( fid ?? "");
    
    const { 
        isOpen: createFeatureModalOpen, 
        onOpen: createFeatureModalOnOpen, 
        onClose: createFeatureModalOnClose 
    }  = useDisclosure();

    const { 
        isOpen: createSubFeatureModalOpen, 
        onOpen: createSubFeatureModalOnOpen, 
        onClose: createSubFeatureModalOnClose 
    }  = useDisclosure();


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
    

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const key = e.target.value;

        if(key === 'new_feature') createFeatureModalOnOpen();
        else if(key === 'new_sub_feature') createSubFeatureModalOnOpen();
        else{
            setSelection(key);
            navigate(`/p/${pid}/f/${key}`)
        }

        setFeature(features?.find((feature) => feature.id === key));
    }

    if(error || subFeaturesError) return <>Something went wrong</>

    return (
        <>
        <div className="basis-80 bg-white border">
            <div className="pt-7 px-5">
                <Skeleton isLoaded={!loading} >
                <Select
                    selectedKeys={[selection]} 
                    label="Select Feature" 
                    disabled={loading}  
                    onChange={(e) => handleSelect(e)}>
                    <SelectSection title="Actions">
                        <SelectItem key="new_feature">New Feature</SelectItem>
                        <SelectItem key="new_sub_feature" className={!featureSelected ? "hidden" : ""}>New Sub-Feature </SelectItem>
                    </SelectSection>
                    <SelectSection title="Features">
                        { features?.map((feature) => <SelectItem key={feature.id}>
                                {feature.name}
                            </SelectItem> 
                        )}
                    </SelectSection>
                </Select>
                </Skeleton>
            </div>

            <CreateFeatureModal isOpen={createFeatureModalOpen} onClose={createFeatureModalOnClose} />
            <CreateSubFeatureModal isOpen={createSubFeatureModalOpen} onClose={createSubFeatureModalOnClose} />

            <UpdateFeatureModal data={feature!} isOpen={editFeatureModalOpen} onClose={editFeatureModalOnClose} />
            <FeatureDeleteModal data={feature!} isOpen={deleteFeatureModalOpen} onClose={deleteFeatureModalOnClose} />
     
            { featureSelected &&
            <div className="p-5 flex justify-center items-center gap-4">
                <Button variant="flat" onClick={() => editFeatureModalOnOpen()} >Update Feature</Button>
                <Button variant="flat" onClick={() => deleteFeatureModalOnOpen()} className="text-danger">Delete Feature</Button>
            </div>
            }

            { featureSelected &&
            <Skeleton isLoaded={!subFeaturesLoading}>
                <Listbox className="px-5">
                    { subFeatures?.map((subFeature) => {
                        return <ListboxItem 
                            
                            key={subFeature.id} 
                            href={`/p/${pid}/f/${fid}/sf/${subFeature.id}`}
                            description={subFeature.description}>
                                {subFeature.name}
                            </ListboxItem>
                    })}
                </Listbox>
            </Skeleton>
            }
            
        </div>
        <div className="flex-grow">
            <Outlet />
        </div>
        </>
    )
}

export default FeatureListPage