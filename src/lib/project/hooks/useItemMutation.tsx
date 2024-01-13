import { useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "../../shared/config/pb";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ItemType } from "../models";


interface MutationRequest{
    onClose?: () => void,
    reset?: () => void,
    queryKey?: string[],
}

const useItemMutation = (mutationRequest: MutationRequest) => {
    const queryClient = useQueryClient();
    const { sfid } = useParams();
    const queryKey = ['items', sfid];


    interface CreateRequest{
        type: ItemType;
        name: string;
    }

    const { mutate: createItem  } = useMutation({
        mutationFn: (createRequest: CreateRequest) => pb.collection('items').create({  subfeature: sfid!, ...createRequest }),
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
        done: boolean
    }

    const { mutate: updateItemStatus  } = useMutation({
        mutationFn: (updateRequest: UpdateRequest) => pb.collection('items').update(updateRequest.id, updateRequest),
        onSuccess: () => {
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


    const { mutate: deleteItem  } = useMutation({
        mutationFn: (id: string) => pb.collection('items').delete(id),
        onSuccess: () => {
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
        createItem,
        updateItemStatus,
        deleteItem
    }
}

export default useItemMutation