import { Button, Listbox, ListboxItem, Select, SelectItem, SelectSection } from "@nextui-org/react"
import { Outlet } from "react-router-dom"
import { FaPlus } from "react-icons/fa6";

const FeatureListPage = () => {
    return (
        <>
        <div className="basis-80 bg-white border">
            <div className="pt-7 px-5">
                <Select label="Select Feature">
                    <SelectSection title="Features">
                        <SelectItem key="new_feature">New Feature</SelectItem>
                        <SelectItem key="new_sub_feature">New Sub-Feature </SelectItem>
                    </SelectSection>
                    <SelectSection title="Features">
                        <SelectItem key="1">Misc</SelectItem>
                        <SelectItem key="2">Auth</SelectItem>
                        <SelectItem key="3">Product Management</SelectItem>
                        <SelectItem key="4">Categories Management</SelectItem>
                    </SelectSection>
                </Select>
            </div>

            <Listbox className="px-5 mt-5">
                <ListboxItem key="login" description="Due in 4 days">Login</ListboxItem>
                <ListboxItem key="login" description="Due in 4 days">Registration</ListboxItem>
                <ListboxItem key="login" description="Due in 4 days">Generating JWT Cookies</ListboxItem>
                <ListboxItem key="login" description="Due in 4 days">Role Based Auth</ListboxItem>
                <ListboxItem key="login" description="Due in 4 days">Logout</ListboxItem>
            </Listbox>
            
        </div>
        <div className="flex-grow">
            <Outlet />
        </div>
        </>
    )
}

export default FeatureListPage