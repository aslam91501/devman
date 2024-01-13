import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Page, PageRequest } from "../../shared/config/baseModels";
import pb from "../../shared/config/pb";
import usePageData from "../../shared/hooks/usePageData";
import { Bug, BugStatus } from "../models";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const getBugs = () => {
    const { page, search, size, sort, direction } = usePageData();
    const asdf = usePageData();
    const [params, setParams] = useSearchParams();
    const feature = params.get('feature');
    const status = params.get('status');

    async function fetch(request: PageRequest, search?: string, filter?: { feature?: string, status?: BugStatus }) {
        let sort = request.sort;    
        sort = (request.direction === 'ascending') ? sort : `-${sort}`;
        const hasSearch = typeof search === 'string' && search !== '';

       
        if(filter || hasSearch){
            const filterKeys = new Map<string, string>();
            
            if (filter?.feature) filterKeys.set('feature', filter.feature);
            if (filter?.status) filterKeys.set('status', filter.status);

            let filterString = "";

            if(hasSearch)
                filterString += filterKeys.size === 0 ? `(title~"${search}" || description~"${search}")` : `title~"${search}" || description~"${search}" && `;
            
            for(let i = 0; i < filterKeys.size; i++){
                const key = Array.from(filterKeys.keys())[i];
                const value = Array.from(filterKeys.values())[i];
    
                filterString += `${key}="${value}"`;
                if(i !== filterKeys.size - 1) filterString += ' && ';
            }
    
            return await pb.collection('bugs').getList(request.pageNo, request.size ?? 10, {
                sort: sort,
                filter: filterString
            })  
        }
        else{
            return await pb.collection('bugs').getList(request.pageNo, request.size ?? 10, {
                sort: sort,
            })
        }
    }


    const queryKey = ['bugs', page, size, sort, direction, search, feature, status];

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: queryKey,
        queryFn: () => fetch({ pageNo: page, sort, direction }, search, 
            { feature: feature !== null ? feature : undefined, status: status !== null ? status as BugStatus : undefined  }),
        placeholderData: keepPreviousData
    });

    const bugs = data as unknown as Page<Bug>;
    const loading = isLoading || isFetching;
    const error = isError;



    const navigate = useNavigate();
    const currentRoute = useLocation().pathname.replace(/\/+$/, '');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        console.log(params)

        let searchString = `?page=${page}&search=${search}&sort=${sort}&direction=${direction}&size=${size}`;
        if (feature) {
            searchString += `&feature=${feature}`;
        }

        navigate({
            pathname: currentRoute,
            search: searchString,
        }, { replace: true });
    }

    const handleFilter = (filters : { feature?: string, status?: BugStatus }) => {
        let searchString = `?page=${page}&search=${search ?? ""}&sort=${sort}&direction=${direction}&size=${size}`;
        
        if (filters.feature) {
            searchString += `&feature=${filters.feature}`;
        } else { if(feature) searchString += `&feature=${feature}` };

        if (filters.status) {
            searchString += `&status=${filters.status}`;
        } else { if(status) searchString += `&status=${status}` };

        navigate({
            pathname: currentRoute,
            search: searchString,
        }, { replace: true });
    }

    
    return {
        bugs,
        loading,
        error,
        queryKey,
        handleSearch,
        handleFilter
    }
}

export default getBugs;