import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Page, PageRequest } from "../../shared/config/baseModels";
import pb from "../../shared/config/pb";
import usePageData from "../../shared/hooks/usePageData";
import { Bug, BugStatus, Item } from "../models";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

const getAllItems = () => {
    const {pid} = useParams();
    const { page, search, size, sort, direction } = usePageData();
    const [params, setParams] = useSearchParams();
    const feature = params.get('feature');
    const done = params.get('done');

    async function fetch(request: PageRequest, search?: string, filter?: { feature?: string, done?: boolean }) {
        let sort = request.sort;    
        sort = (request.direction === 'ascending') ? sort : `-${sort}`;
        const hasSearch = typeof search === 'string' && search !== '';
       
        let filterString = `subfeature.feature.project="${pid}" `;

        if(hasSearch) filterString += `&& name ~ "${search}" `;
        if(filter?.feature) filterString += `&& subfeature.feature = "${filter.feature}"`
        if(filter?.done) filterString += `&& done = ${done}`
       
        return await pb.collection('items').getList(request.pageNo, request.size ?? 10, {
            sort: sort,
            filter: filterString
        })  
    }


    const queryKey = ['items', page, size, sort, direction, search, feature, done];

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: queryKey,
        queryFn: () => fetch({ pageNo: page, sort, direction }, search, 
            { 
                feature: feature !== null ? feature : undefined, 
                done: done == 'true' || done == 'false' ? done as unknown as boolean: undefined  
            }),
        placeholderData: keepPreviousData
    });

    const items = data as unknown as Page<Item>;
    const loading = isLoading || isFetching;
    const error = isError;



    const navigate = useNavigate();
    const currentRoute = useLocation().pathname.replace(/\/+$/, '');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        
        params.set('search', search)
        setParams(params);
    }

    
    return {
        items,
        loading,
        error,
        queryKey,
        handleSearch,
    }
}

export default getAllItems;