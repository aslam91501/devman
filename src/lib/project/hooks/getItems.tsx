import { useParams } from "react-router-dom"
import pb from "../../shared/config/pb";
import { useQuery } from "@tanstack/react-query";
import { Item } from "../models";

const getItems = (subfeatureId?: string) => {
    const {sfid} = useParams();
    const id = subfeatureId ?? sfid;

    const { data, isLoading, isFetching, isError: error } = useQuery({
        queryKey: ['items', id],
        queryFn: () => pb.collection('items').getFullList({ 
            filter: `subfeature="${id}"`,
            sort: 'done'
        })
    })

    const items = data as unknown as Item[];
    const loading = isLoading || isFetching;
    return { items, loading, error }
}

export default getItems