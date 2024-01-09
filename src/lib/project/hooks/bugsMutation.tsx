import { useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "../../shared/config/pb";
import { toast } from "react-toastify";
import usePageData from "../../shared/hooks/usePageData";




interface MutationRequest{
    onClose?: () => void,
    reset?: () => void,
    queryKey?: string[],
}

const useBugsMutation = (mutationRequest: MutationRequest) => {
    const queryClient = useQueryClient();

    const { page, search, size, sort, direction } = usePageData();
    const queryKey = ['bugs', page, size, sort, direction, search];


    interface CreateRequest{
        description: string;
        title: string;
        project: string;
        feature?: string;
    }

    const { mutate: createBug  } = useMutation({
        mutationFn: (createRequest: CreateRequest) => pb.collection('bugs').create(createRequest),
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
        feature?: string;
    }

    const { mutate: updateBug  } = useMutation({
        mutationFn: (updateRequest: UpdateRequest) => pb.collection('bugs').update(updateRequest.id, updateRequest),
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


    const { mutate: deleteBug  } = useMutation({
        mutationFn: (id: string) => pb.collection('bugs').delete(id),
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
        createBug,
        updateBug,
        deleteBug
    }
}

export default useBugsMutation