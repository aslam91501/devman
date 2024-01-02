import { useMutation } from "@tanstack/react-query";
import pb from "../../shared/config/pb";
import { toast } from "react-toastify";




interface MutationRequest{
    onClose?: () => void,
    reset?: () => void
}

const useProjectMutation = (mutationRequest: MutationRequest) => {
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
        createProject
    }
}

export default useProjectMutation