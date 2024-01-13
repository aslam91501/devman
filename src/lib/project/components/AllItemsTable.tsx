import { Button, Input, Link, Select, SelectItem, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useState } from "react";
import { Paginator } from "../../shared/components/Paginator.tsx";
import usePageData from "../../shared/hooks/usePageData.tsx";
import {format} from 'timeago.js'
import { useParams, useSearchParams } from "react-router-dom";
import getFeatures from "../hooks/getFeatures.tsx";
import CustomTitle from "../../shared/components/CustomTitle.tsx";
import getAllItems from "../hooks/getAllItems.tsx";




export function AllItemsTable() {
    const {pid} = useParams();
    const { search } = usePageData();
    const [searchValue, setSearchValue] = useState(search ?? "");
    const { features, loading: featuresLoading, error: featuresError } = getFeatures();
    const { items, loading, error, handleSearch } = getAllItems();
    const [params, setParams] = useSearchParams();
    

    if (loading) return <>Loading...</>;
    if (error) return <>Could not fetch data</>;
    return <>
        <CustomTitle title="All Items" loading={loading} error={error} />

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
                selectedKeys={[params.get('done') ?? '']}
                onChange={(e) => { params.set('done', e.target.value); setParams(params) }}
                className="w-60"
                label="Select Status" 
                
                >
                <SelectItem key="true">Done</SelectItem>
                <SelectItem key="false">Not Done</SelectItem>
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
            bottomContent={<Paginator currentPage={items.page} totalPages={items.totalPages} />}>
            <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Created</TableColumn>
                <TableColumn>Updated</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {items ? items.items.map((item) => {
                    return <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="capitalize">{item.done ? "Done" : "Not Done"}</TableCell>
                        <TableCell>{format(item.created)}</TableCell>
                        <TableCell>{format(item.updated)}</TableCell>
                        <TableCell>
                            <Button variant="flat" color="primary"
                                as={Link}
                                href={`/p/${pid}/f/${item.expand.subfeature.feature}/sf/${item.expand.subfeature.id}`}
                                target="_blank">View</Button>
                        </TableCell>
                    </TableRow>
                }) : <></>}
            </TableBody>
        </Table>
    </>;
}