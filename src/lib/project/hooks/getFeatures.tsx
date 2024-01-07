import { useParams } from "react-router-dom"
import pb from "../../shared/config/pb";
import { useQuery } from "@tanstack/react-query";
import { Feature } from "../models";

const getFeatures = (projectId?: string) => {
    const {pid} = useParams();
    const id = projectId ?? pid;

    const { data, isLoading, isFetching, isError: error } = useQuery({
        queryKey: ['features', id],
        queryFn: () => pb.collection('features').getFullList({ projectId: id })
    })

    const features = data as unknown as Feature[];
    const loading = isLoading || isFetching;

    return { features, loading, error }

}

export default getFeatures