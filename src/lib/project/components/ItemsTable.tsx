import { Button, Input, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import {format} from 'timeago.js'
import getItems from "../hooks/getItems";
import { Item, ItemType } from "../models";
import useItemMutation from "../hooks/useItemMutation";
import classNames from "classnames";


interface Props{
    type: ItemType,
}

export function ItemsTable(props: Props) {
    const [textValue, setTextValue] = useState("");
    const { items, loading, error } = getItems();
    const [filteredItems, setFilteredItems] = useState<Item[]>([])
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
    const [hideDone, setHideDone] = useState(false);

    const itemMutation = useItemMutation({ reset: () => setSelectedKeys(new Set([])) });


    useEffect(() => {
        if(items)
            setFilteredItems(items.filter(i => i.type === props.type))
    }, [items])

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        itemMutation.createItem({
            name: textValue,
            type: props.type
        })

        setTextValue("");
    }

    const handleDelete = () => {
        selectedKeys.forEach(id => itemMutation.deleteItem(id))
    }

    const handleSetDone = () => {
        selectedKeys.forEach(id => itemMutation.updateItemStatus({ id, done: true }))
    }

    const handleSetNotDone = () => {
        selectedKeys.forEach(id => itemMutation.updateItemStatus({ id, done: false }))
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
                <div className="flex flex-col gap-3">
                    <form onSubmit={handleCreate}>
                        <Input value={textValue ?? ""} 
                            onChange={(e) => setTextValue(e.target.value)}
                            label="New" type="text" />
                        <input type="submit" className="hidden" disabled={textValue.length < 3} />
                    </form>

                    <div className="flex items-center gap-4">
                        <Button variant="flat" onClick={handleSetDone} isDisabled={selectedKeys.size === 0} >Set Done</Button>
                        <Button variant="flat" onClick={handleSetNotDone} isDisabled={selectedKeys.size === 0} >Set Not Done</Button>
                        <Button variant="flat" onClick={handleDelete} isDisabled={selectedKeys.size === 0} className="text-danger">Delete</Button>
                        <Switch isSelected={hideDone} onValueChange={setHideDone}>Hide Done</Switch>
                    </div>
                </div>
            }
        >
            <TableHeader>
                <TableColumn>Title</TableColumn>
                <TableColumn>Done</TableColumn>
                <TableColumn>Added</TableColumn>
            </TableHeader>
            <TableBody emptyContent={<p>No content</p>}>
                {filteredItems?.map((item) => {
                    return <TableRow key={item.id} 
                            className={classNames({ "hidden": item.done && hideDone, "bg-slate-200": item.done })}
                            // className={item.done && hideDone ? "hidden" : "" }
                        >
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