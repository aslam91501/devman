import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PageRequest, Page } from "../../shared/config/baseModels";
import { useState } from "react";
import { Paginator } from "../../shared/components/Paginator";
import pb from "../../shared/config/pb";
import { Project } from "../models";
import { EditProjectModal } from "./ProjectEditForm";
import { ProjectDeleteModal } from "./ProjectDeleteModal";


export async function fetch(request: PageRequest, search?: string) {
    let sort = request.sort;

    sort = (request.direction === 'ascending') ? sort : `-${sort}`;

    if (typeof search === 'string') {
        return await pb.collection('projects').getList(request.pageNo, request.size ?? 10, {
            sort: sort,
            filter: `name~"${search}"`
        });
    }
    else {
        return await pb.collection('projects').getList(request.pageNo, request.size ?? 10, {
            sort: sort,
        });
    }
}

export function ProjectsTable() {
    const [searchParams] = useSearchParams();

    const page = searchParams.get('page') as unknown as number ?? 1;
    const search = searchParams.get('search') ?? undefined;
    const sort = searchParams.get('sort') ?? 'updated';
    const direction = searchParams.get('direction') ?? 'descending';

    const [searchValue, setSearchValue] = useState(search ?? "");

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ['amenities', page, search, sort, direction],
        queryFn: () => fetch({ pageNo: page, sort, direction }, search),
        placeholderData: keepPreviousData
    });

    const [editModalOpen, setEditModalOpen] = useState<Map<string, boolean>>(new Map<string, boolean>());
    const [deleteModalOpen, setDeleteModalOpen] = useState<Map<string, boolean>>(new Map<string, boolean>());

    function toggleEditModal(id: string) {
        setEditModalOpen((prev) => {
            const newState = new Map(prev);

            newState.set(id, !prev.get(id));

            return newState;
        });
    }

    function toggleDeleteModal(id: string) {
        setDeleteModalOpen((prev) => {
            const newState = new Map(prev);

            newState.set(id, !prev.get(id));

            return newState;
        });
    }

    const navigate = useNavigate();
    const currentRoute = useLocation().pathname.replace(/\/+$/, '');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const search = formData.get('search') as string;

        navigate({
            pathname: currentRoute,
            search: `?page=${page}&search=${search}&sort=${sort}&direction=${direction}`,
        }, { replace: true });
    }

    if (isLoading || isFetching) return <>Loading...</>;

    if (isError) return <>Could not fetch data</>;

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
            bottomContent={<Paginator currentPage={page} totalPages={(data as unknown as Page<Project>).totalPages} />}>
            <TableHeader>
                <TableColumn>Title</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Created</TableColumn>
                <TableColumn>Updated</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {data ? (data as unknown as Page<Project>).items.map((item, index) => {
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