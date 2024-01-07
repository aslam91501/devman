import { useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "../../shared/config/pb";
import { toast } from "react-toastify";
import usePageData from "../../shared/hooks/usePageData";
import { useParams } from "react-router-dom";


interface MutationRequest{
    onClose?: () => void,
    reset?: () => void,
    queryKey?: string[],
}

const useFeatureMutation = (mutationRequest: MutationRequest) => {
    const queryClient = useQueryClient();
    const { pid } = useParams();
    const queryKey = ['features', pid];


    interface CreateRequest{
        description: string;
        name: string;
    }

    const { mutate: createFeature  } = useMutation({
        mutationFn: (createRequest: CreateRequest) => pb.collection('features').create({  project: pid!, ...createRequest }),
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
        name?: string;
    }

    const { mutate: updateFeature  } = useMutation({
        mutationFn: (updateRequest: UpdateRequest) => pb.collection('features').update(updateRequest.id, updateRequest),
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


    const { mutate: deleteFeature  } = useMutation({
        mutationFn: (id: string) => pb.collection('features').delete(id),
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
        createFeature,
        updateFeature,
        deleteFeature
    }
}

export default useFeatureMutation