import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Page, PageRequest } from "../../shared/config/baseModels";
import pb from "../../shared/config/pb";
import usePageData from "../../shared/hooks/usePageData";
import { Project } from "../models";
import { useLocation, useNavigate } from "react-router-dom";

const getProjects = () => {
    const { page, search, size, sort, direction } = usePageData();

    async function fetch(request: PageRequest, search?: string) {
        let sort = request.sort;
    
        sort = (request.direction === 'ascending') ? sort : `-${sort}`;
    
        if (typeof search === 'string') {
            return await pb.collection('projects').getList(request.pageNo, request.size ?? 10, {
                sort: sort,
                filter: `title~"${search}" || description~"${search}"`
            });
        }
        else {
            return await pb.collection('projects').getList(request.pageNo, request.size ?? 10, {
                sort: sort,
            });
        }
    }


    const queryKey = ['projects', page, size, sort, direction, search];

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: queryKey,
        queryFn: () => fetch({ pageNo: page, sort, direction }, search),
        placeholderData: keepPreviousData
    });

    const projects = data as unknown as Page<Project>;
    const loading = isLoading || isFetching;
    const error = isError;



    const navigate = useNavigate();
    const currentRoute = useLocation().pathname.replace(/\/+$/, '');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const search = formData.get('search') as string;

        navigate({
            pathname: currentRoute,
            search: `?page=${page}&search=${search}&sort=${sort}&direction=${direction}&size=${size}`,
        }, { replace: true });
    }

    
    return {
        projects,
        loading,
        error,
        queryKey,
        handleSearch
    }
}

export default getProjects;