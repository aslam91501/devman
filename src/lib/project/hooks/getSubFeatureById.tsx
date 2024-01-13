import { useParams } from "react-router-dom"
import pb from "../../shared/config/pb";
import { useQuery } from "@tanstack/react-query";
import {  SubFeature } from "../models";

const getSubFeatureById = (subfeatureId?: string) => {
    const {sfid} = useParams();
    const id = subfeatureId ?? sfid;

    const { data, isLoading, isFetching, isError: error, } = useQuery({
        queryKey: ['sub_features', sfid],
        queryFn: () => pb.collection('sub_features').getOne(id!)
    })

    const subFeature = data as unknown as SubFeature;
    const loading = isLoading || isFetching;

    return { subFeature, loading, error }

}

export default getSubFeatureById