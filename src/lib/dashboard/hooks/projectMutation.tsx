import { useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "../../shared/config/pb";
import { toast } from "react-toastify";
import usePageData from "../../shared/hooks/usePageData";




interface MutationRequest{
    onClose?: () => void,
    reset?: () => void,
    queryKey?: string[],
}

const useProjectMutation = (mutationRequest: MutationRequest) => {
    const queryClient = useQueryClient();

    const { page, search, size, sort, direction } = usePageData();
    const queryKey = ['projects', page, size, sort, direction, search];


    interface CreateRequest{
        description: string;
        title: string;
    }

    const { mutate: createProject  } = useMutation({
        mutationFn: (createRequest: CreateRequest) => pb.collection('projects').create(createRequest),
        onSuccess: () => {
            toast.success('Success', {
                theme: 'colored',
                autoClose: 1000
            })

            queryClient.invalidateQueries({ queryKey })
            if(mutationRequest.reset) mutationRequest.reset();
            if(mutationRequest.onClose) mutationRequest.onClose();  
        },
        onError: () => {
            toast.error('Something went wrong', {
                theme: 'colored',
                autoClose: 1000
            })
        }
    })



    interface UpdateRequest{
        id: string;
        description?: string;
        title?: string;
    }

    const { mutate: updateProject  } = useMutation({
        mutationFn: (updateRequest: UpdateRequest) => pb.collection('projects').update(updateRequest.id, updateRequest),
        onSuccess: () => {
            toast.success('Success', {
                theme: 'colored',
                autoClose: 1000
            })

            queryClient.invalidateQueries({ queryKey })
            if(mutationRequest.reset) mutationRequest.reset();
            if(mutationRequest.onClose) mutationRequest.onClose();  
        },
        onError: () => {
            toast.error('Something went wrong', {
                theme: 'colored',
                autoClose: 1000
            })
        }
    })


    const { mutate: deleteProject  } = useMutation({
        mutationFn: (id: string) => pb.collection('projects').delete(id),
        onSuccess: () => {
            toast.success('Deleted', {
                theme: 'colored',
                autoClose: 1000
            })

            queryClient.invalidateQueries({ queryKey })
            if(mutationRequest.reset) mutationRequest.reset();
            if(mutationRequest.onClose) mutationRequest.onClose();  
        },
        onError: () => {
            toast.error('Something went wrong', {
                theme: 'colored',
                autoClose: 1000
            })
        }
    })





    return {
        createProject,
        updateProject,
        deleteProject
    }
}

export default useProjectMutation