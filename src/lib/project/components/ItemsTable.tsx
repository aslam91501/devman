import { Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import {format} from 'timeago.js'
import getItems from "../hooks/getItems";
import { Item, ItemType } from "../models";


interface Props{
    type: ItemType,
}

export function ItemsTable(props: Props) {
    const [textValue, setTextValue] = useState("");
    const { items, loading, error } = getItems();
    const [filteredItems, setFilteredItems] = useState<Item[]>([])
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

    
    useEffect(() => {
        if(items)
            setFilteredItems(items.filter(i => i.type === props.type))
    }, [items])

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    }

    const handleSelect = (keys: 'all' | Set<Key>) => {
        if(keys === 'all'){
            setSelectedKeys(new Set(filteredItems.map(i => i.id)))
        }
        else{
            let ls = new Set([...keys]) as Set<string>
                setSelectedKeys(ls)
        }
    }

    if (loading) return <>Loading...</>;
    if (error) return <>Could not fetch data</>;

    

    return <>
        <Table
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelect}
            topContent={
                <>
                    <form onSubmit={handleCreate}>
                        <Input value={textValue ?? ""} 
                            onChange={(e) => setTextValue(e.target.value)}
                            label="New" type="text" />
                        <input type="submit" className="hidden" disabled={textValue.length < 3} />
                    </form>
                </>
            }
        >
            <TableHeader>
                <TableColumn>Title</TableColumn>
                <TableColumn>Done</TableColumn>
                <TableColumn>Added</TableColumn>
            </TableHeader>
            <TableBody emptyContent={<p>No content</p>}>
                {filteredItems?.map((item) => {
                    return <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.done ? "Yes" : "No"}</TableCell>
                        <TableCell>{format(item.created)}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
        
        {/* { filteredItems.length == 0 || !filteredItems || !items && "No Items"  } */}
    </>;
}