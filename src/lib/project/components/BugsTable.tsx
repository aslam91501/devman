import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useState } from "react";
import { Paginator } from "../../shared/components/Paginator";
import usePageData from "../../shared/hooks/usePageData";
import getBugs from "../hooks/getBugs";
import useMultiModal from "../../shared/hooks/useMultiModal";
import {format} from 'timeago.js'
import { EditBugModal } from "./EditBugForm.tsx";
import { BugDeleteModal } from "./BugDeleteModal";




export function BugsTable() {
    const { page, search } = usePageData();
    const [searchValue, setSearchValue] = useState(search ?? "");
    const { isOpen: editModalOpen, toggle: toggleEditModal } = useMultiModal();
    const { isOpen: deleteModalOpen, toggle: toggleDeleteModal } = useMultiModal();
    const { bugs, loading, error, handleSearch } = getBugs();


    if (loading) return <>Loading...</>;
    if (error) return <>Could not fetch data</>;
    return <>
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
                <TableColumn>Created</TableColumn>
                <TableColumn>Updated</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {bugs ? bugs.items.map((item, index) => {
                    return <TableRow key={index}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{format(item.created)}</TableCell>
                        <TableCell>{format(item.updated)}</TableCell>
                        <TableCell>
                            <EditBugModal 
                                data={item}
                                onClose={() => toggleEditModal(item.id)}
                                isOpen={editModalOpen.get(item.id) ?? false} />

                            <BugDeleteModal 
                                data={item}
                                onClose={() => toggleDeleteModal(item.id)}
                                isOpen={deleteModalOpen.get(item.id) ?? false} />

                            <Dropdown>
                                <DropdownTrigger>
                                    <Button color="default">Actions</Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem href={`/p/${item.id}`}>View</DropdownItem>
                                    <DropdownItem onClick={() => toggleEditModal(item.id)}>Edit</DropdownItem>
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