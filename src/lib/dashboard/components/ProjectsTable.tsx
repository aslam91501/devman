import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useState } from "react";
import { Paginator } from "../../shared/components/Paginator";
import { EditProjectModal } from "./ProjectEditForm";
import { ProjectDeleteModal } from "./ProjectDeleteModal";
import usePageData from "../../shared/hooks/usePageData";
import getProjects from "../hooks/getProjects";
import useMultiModal from "../../shared/hooks/useMultiModal";




export function ProjectsTable() {
    const { page, search } = usePageData();
    const [searchValue, setSearchValue] = useState(search ?? "");
    const { isOpen: editModalOpen, toggle: toggleEditModal } = useMultiModal();
    const { isOpen: deleteModalOpen, toggle: toggleDeleteModal } = useMultiModal();
    const { projects, loading, error, queryKey, handleSearch } = getProjects();


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
            bottomContent={<Paginator currentPage={page} totalPages={projects.totalPages} />}>
            <TableHeader>
                <TableColumn>Title</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Created</TableColumn>
                <TableColumn>Updated</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {projects ? projects.items.map((item, index) => {
                    return <TableRow key={index}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.created.toString()}</TableCell>
                        <TableCell>{item.updated.toString()}</TableCell>
                        <TableCell>
                            <EditProjectModal 
                                data={item}
                                onClose={() => toggleEditModal(item.id)}
                                isOpen={editModalOpen.get(item.id) ?? false} />

                            <ProjectDeleteModal 
                                data={item}
                                onClose={() => toggleDeleteModal(item.id)}
                                isOpen={deleteModalOpen.get(item.id) ?? false} />

                            <Dropdown>
                                <DropdownTrigger>
                                    <Button color="default">Actions</Button>
                                </DropdownTrigger>
                                <DropdownMenu>
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