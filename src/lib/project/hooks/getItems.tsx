import { useParams } from "react-router-dom"
import pb from "../../shared/config/pb";
import { useQuery } from "@tanstack/react-query";
import { Item, ItemType } from "../models";
import { useState } from "react";

const getItems = (subfeatureId?: string) => {
    const {sfid} = useParams();
    const id = subfeatureId ?? sfid;

    const [business, setBusiness] = useState<Item[]>([])
    const [todo, setTodo] = useState<Item[]>([])
    const [tests, setTests] = useState<Item[]>([])

    const { data, isLoading, isFetching, isError: error } = useQuery({
        queryKey: ['items', id],
        queryFn: () => pb.collection('items').getFullList({ 
            filter: `subfeature="${id}"`,
            sort: '-done'
        })
    })


    const items = data as unknown as Item[];

    // if(items && !error){
    //     console.log("ooy")

    //     setBusiness(items.filter(i => i.type === 'business'))
    //     setTodo(items.filter(i => i.type === 'todo'))
    //     setTests(items.filter(i => i.type === 'test'))
    // }

    const filter = (items: Item[], type: ItemType) => {
        return items.filter(i => i.type === type)
    }

    const loading = isLoading || isFetching;

    return { items, filter, loading, error }

}

export default getItems