import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Select, SelectItem, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useState } from "react";
import { Paginator } from "../../shared/components/Paginator";
import usePageData from "../../shared/hooks/usePageData";
import getBugs from "../hooks/getBugs";
import useMultiModal from "../../shared/hooks/useMultiModal";
import {format} from 'timeago.js'
import { EditBugModal } from "./EditBugForm.tsx";
import { BugDeleteModal } from "./BugDeleteModal";
import { BugStatusModal } from "./BugStatusModal.tsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import getFeatures from "../hooks/getFeatures.tsx";
import { BugStatus } from "../models/index.tsx";
import CustomTitle from "../../shared/components/CustomTitle.tsx";




export function BugsTable() {
    const { page, search } = usePageData();
    const {pid} = useParams();
    const [searchValue, setSearchValue] = useState(search ?? "");
    const { isOpen: editModalOpen, toggle: toggleEditModal } = useMultiModal();
    const { isOpen: deleteModalOpen, toggle: toggleDeleteModal } = useMultiModal();
    const { isOpen: statusModalOpen, toggle: toggleStatusModal } = useMultiModal();
    const { bugs, loading, error, handleSearch } = getBugs();
    const { features, loading: featuresLoading, error: featuresError } = getFeatures();

    const [params, setParams] = useSearchParams();
    

    if (loading) return <>Loading...</>;
    if (error) return <>Could not fetch data</>;
    return <>
        <CustomTitle title="Bugs" loading={loading} error={error} />

        <div className="flex items-center gap-7 py-5 px-5 bg-white mb-5 rounded-xl drop-shadow-sm">
            {/* <span>Filters</span> */}
            {!featuresError &&
            <Skeleton isLoaded={!featuresLoading} >
                <Select
                    selectedKeys={[params.get('feature') ?? '']}
                    onChange={(e) => { params.set('feature', e.target.value); setParams(params) }}
                    classNames={{ base: "w-60 bg-white" }}
                    label="Select Feature" 
                    disabled={featuresLoading}>
                    { features?.map((feature) => <SelectItem key={feature.id}>
                            {feature.name}
                        </SelectItem> 
                    )}
                </Select>
            </Skeleton>
            }
            {featuresError && <span>Could not load features</span>}

            <Select
                selectedKeys={[params.get('status') ?? '']}
                onChange={(e) => { params.set('status', e.target.value); setParams(params) }}
                className="w-60"
                label="Select Status" 
                disabled={featuresLoading}>
                <SelectItem key="unresolved">Unresolved</SelectItem>
                <SelectItem key="resolved">Resolved</SelectItem>
                <SelectItem key="triage">Triage</SelectItem>
            </Select>

            <Button onClick={() => setParams()}>Reset Filters</Button>

        </div>
        

        <Table
            topContent={
                <>
                    <form onSubmit={handleSearch}>
                        <Input value={searchValue ?? ""} 
                            onChange={(e) => setSearchValue(e.target.value)}
                            label="Search" type="search" name="search" id="search" />
                        <input type="submit" className="hidden" />
                    </form>
                </>
            }
            bottomContent={<Paginator currentPage={page} totalPages={bugs.totalPages} />}>
            <TableHeader>
                <TableColumn>Title</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Created</TableColumn>
                <TableColumn>Updated</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {bugs ? bugs.items.map((item, index) => {
                    return <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="capitalize">{item.status}</TableCell>
                        <TableCell>{format(item.created)}</TableCell>
                        <TableCell>{format(item.updated)}</TableCell>
                        <TableCell>
                            <EditBugModal 
                                data={item}
                                onClose={() => toggleEditModal(item.id)}
                                isOpen={editModalOpen.get(item.id) ?? false} />

                            <BugStatusModal 
                                data={item}
                                onClose={() => toggleStatusModal(item.id)}
                                isOpen={statusModalOpen.get(item.id) ?? false} />

                            <BugDeleteModal 
                                data={item}
                                onClose={() => toggleDeleteModal(item.id)}
                                isOpen={deleteModalOpen.get(item.id) ?? false} />

                            <Dropdown>
                                <DropdownTrigger>
                                    <Button color="default">Actions</Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem href={`/p/${pid}/b/${item.id}`}>View</DropdownItem>
                                    <DropdownItem onClick={() => toggleEditModal(item.id)}>Edit</DropdownItem>
                                    <DropdownItem onClick={() => toggleStatusModal(item.id)}>Set Status</DropdownItem>
                                    <DropdownItem 
                                        onClick={() => toggleDeleteModal(item.id)}
                                        color="danger" 
                                        className="text-danger">Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </TableCell>
                    </TableRow>;
                }) : <></>}
            </TableBody>
        </Table>
    </>;
}