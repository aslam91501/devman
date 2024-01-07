import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import pb from "../../shared/config/pb";
import { Project } from "../../dashboard/models";

const getProjetById = (id?: string) => {
    const projectId = id ?? useParams().pid; 

    const { data, isLoading, isFetching, isError: error } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => pb.collection('projects').getOne(projectId!)
    })

    const project = data as unknown as Project;
    const loading = isLoading || isFetching;

    return { project, loading, error }
}

export default getProjetById