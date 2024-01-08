import { useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "../../shared/config/pb";
import { toast } from "react-toastify";
import usePageData from "../../shared/hooks/usePageData";
import { useNavigate, useParams } from "react-router-dom";


interface MutationRequest{
    onClose?: () => void,
    reset?: () => void,
    queryKey?: string[],
}

const useSubFeatureMutation = (mutationRequest: MutationRequest) => {
    const queryClient = useQueryClient();
    const { fid,pid } = useParams();
    const navigate = useNavigate();
    const queryKey = ['sub_features', fid];


    interface CreateRequest{
        description: string;
        name: string;
    }

    const { mutate: createSubFeature  } = useMutation({
        mutationFn: (createRequest: CreateRequest) => pb.collection('sub_features').create({  feature: fid!, ...createRequest }),
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

    const { mutate: updateSubFeature  } = useMutation({
        mutationFn: (updateRequest: UpdateRequest) => pb.collection('sub_features').update(updateRequest.id, updateRequest),
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


    const { mutate: deleteSubFeature  } = useMutation({
        mutationFn: (id: string) => pb.collection('sub_features').delete(id),
        onSuccess: () => {
            toast.success('Deleted', {
                theme: 'colored',
                autoClose: 1000
            })

            queryClient.invalidateQueries({ queryKey })
            if(mutationRequest.reset) mutationRequest.reset();
            if(mutationRequest.onClose) mutationRequest.onClose();  
            navigate(`/p/${pid}/f/${fid}`)
        },
        onError: () => {
            toast.error('Something went wrong', {
                theme: 'colored',
                autoClose: 1000
            })
        }
    })





    return {
        createSubFeature,
        updateSubFeature,
        deleteSubFeature
    }
}

export default useSubFeatureMutation