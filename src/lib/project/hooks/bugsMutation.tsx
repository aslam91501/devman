import { useMutation, useQueryClient } from "@tanstack/react-query";
import pb from "../../shared/config/pb";
import { toast } from "react-toastify";
import usePageData from "../../shared/hooks/usePageData";
import { BugStatus } from "../models";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";




interface MutationRequest{
    onClose?: () => void,
    reset?: () => void,
    queryKey?: string[],
}

const useBugsMutation = (mutationRequest: MutationRequest) => {
    const queryClient = useQueryClient();

    const { page, search, size, sort, direction } = usePageData();
    const [params] = useSearchParams();
    const feature = params.get('feature');
    const status = params.get('status');
    
    const queryKey = ['bugs', page, size, sort, direction, search, feature, status];

    const navigate = useNavigate();
    const path = useLocation().pathname
    const {pid} = useParams();

    interface CreateRequest{
        description: string;
        title: string;
        project: string;
        feature?: string;
        status: BugStatus
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
        status?: BugStatus
    }

    const { mutate: updateBug  } = useMutation({
        mutationFn: (updateRequest: UpdateRequest) => pb.collection('bugs').update(updateRequest.id, updateRequest),
        onSuccess: (bug) => {
            toast.success('Success', {
                theme: 'colored',
                autoClose: 1000
            })

            queryClient.invalidateQueries({ queryKey })
            queryClient.invalidateQueries({ queryKey: ['bugs', bug.id] })
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

            if(path.startsWith(`/p/${pid}/b`) && path !== `/p/${pid}/b`){
                navigate(`/p/${pid}/b`)
            } 

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


    const { mutate: managePhoto  } = useMutation({
        mutationFn: ({ id, action, file } : { id: string, action: 'add' | 'remove', file: string | File }) => 
        {
            if(action === 'remove')
                return pb.collection('bugs').update(id!, { 'photos-': [file] })
            else{
                const formData =  new FormData();
                formData.append('photos', file);
            
                return pb.collection('bugs').update(id!, formData);
            }
        },
        onSuccess: (bug) => {
            toast.success('Success', {
                theme: 'colored',
                autoClose: 1000
            })

            queryClient.invalidateQueries({ queryKey: ['bugs', bug.id] });
        },
        onError: (e) => {
            toast.error('Something went wrong', {
                theme: 'colored',
                autoClose: 1000
            })

            console.log(e);
        }
    })




    return {
        createBug,
        updateBug,
        deleteBug,
        managePhoto
    }
}

export default useBugsMutation