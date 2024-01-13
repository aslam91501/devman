import { useParams } from "react-router-dom"
import pb from "../../shared/config/pb";
import { useQuery } from "@tanstack/react-query";
import { Item } from "../models";

const getItemsByFeature = () => {
    const {fid} = useParams();
    const id = fid!;

    const { data, isLoading, isFetching, isError: error } = useQuery({
        queryKey: ['items', id],
        queryFn: () => pb.collection('items').getFullList({ 
            filter: `subfeature.feature="${id}"`,
            sort: 'done'
        })
    })

    const items = data as unknown as Item[];
    const loading = isLoading || isFetching;
    return { items, loading, error }
}

export default getItemsByFeature