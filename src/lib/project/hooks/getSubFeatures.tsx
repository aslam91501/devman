import { useParams } from "react-router-dom"
import pb from "../../shared/config/pb";
import { useQuery } from "@tanstack/react-query";
import { Feature } from "../models";

const getSubFeatures = (featureId?: string) => {
    const {fid} = useParams();
    const id = featureId ?? fid;

    const { data, isLoading, isFetching, isError: error, } = useQuery({
        queryKey: ['sub_features', fid],
        queryFn: () => pb.collection('sub_features').getFullList({ 
            filter: `feature = "${id}"`
        }),
        enabled: (!!id)
    })

    const subFeatures = data as unknown as Feature[];
    const loading = isLoading || isFetching;

    return { subFeatures, loading, error }

}

export default getSubFeatures