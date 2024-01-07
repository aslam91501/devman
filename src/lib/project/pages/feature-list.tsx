import { Button, Listbox, ListboxItem, Select, SelectItem, SelectSection, Selection, Skeleton, useDisclosure } from "@nextui-org/react"
import { Outlet, useLocation, useParams } from "react-router-dom"
import { FaPlus } from "react-icons/fa6";
import getFeatures from "../hooks/getFeatures";
import { ChangeEvent, useState } from "react";
import { CreateFeatureModal } from "../components/CreateFeatureModal";

const FeatureListPage = () => {
    const { features, loading, error } = getFeatures();

    const path = useLocation().pathname;
    const {pid} = useParams();
    const featureSelected = path.startsWith(`/p/${pid}/f/`) && path !== `/p/${pid}/f/`;


    const [selection, setSelection] = useState("");
    
    const { 
        isOpen: createFeatureModalOpen, 
        onOpen: createFeatureModalOnOpen, 
        onClose: createFeatureModalOnClose 
    }  = useDisclosure();

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const key = e.target.value;

        if(key === 'new_feature') createFeatureModalOnOpen();
        else if(key === 'new_sub_feature') return;
        else
            setSelection(key);
    }

    if(error) return <>Something went wrong</>

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
                        <SelectItem key="new_sub_feature">New Sub-Feature </SelectItem>
                    </SelectSection>
                    <SelectSection title="Features">
                        { features?.map((feature) => <SelectItem key={feature.id}>{feature.name}</SelectItem> ) }
                    </SelectSection>
                </Select>
                </Skeleton>
            </div>

            <CreateFeatureModal isOpen={createFeatureModalOpen} onClose={createFeatureModalOnClose} />

            { featureSelected &&
            <Listbox className="px-5 mt-5">
                <ListboxItem key="login1" description="Due in 4 days">Login</ListboxItem>
                <ListboxItem key="login2" description="Due in 4 days">Registration</ListboxItem>
                <ListboxItem key="login3" description="Due in 4 days">Generating JWT Cookies</ListboxItem>
                <ListboxItem key="login4" description="Due in 4 days">Role Based Auth</ListboxItem>
                <ListboxItem key="login6" description="Due in 4 days">Logout</ListboxItem>
            </Listbox>
            }
            
        </div>
        <div className="flex-grow">
            <Outlet />
        </div>
        </>
    )
}

export default FeatureListPage