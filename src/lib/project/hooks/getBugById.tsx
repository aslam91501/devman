import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import pb from "../../shared/config/pb";
import { Bug } from "../models";

const getBugById = (id?: string) => {
    const bugId = id ?? useParams().bid; 

    const { data, isLoading, isFetching, isError: error } = useQuery({
        queryKey: ['bugs', bugId],
        queryFn: () => pb.collection('bugs').getOne(bugId!)
    })

    const bug = data as unknown as Bug;
    const loading = isLoading || isFetching;

    return { bug, loading, error }
}

export default getBugById