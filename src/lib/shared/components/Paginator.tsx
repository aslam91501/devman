import { Pagination } from "@nextui-org/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function Paginator({ currentPage, totalPages, hasType } : { currentPage: number, totalPages: number, hasType?: boolean }){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const currentRoute = useLocation().pathname.replace(/\/+$/, '');

    

    const setNavigation = (page: number) => {
        if(page < 1 || page > totalPages) return;

        let searchString = `?page=${page}&search=${searchParams.get('search') ?? ""}&sort=${searchParams.get('sort') ?? ""}&direction=${searchParams.get('direction') ?? ""}`

        if(hasType)
            searchString += `&type=${searchParams.get('type') ?? ""}`;

        navigate({
            pathname: currentRoute,
            search: searchString,
        }, { replace: true });
    }

    return <>
    <div className="flex justify-end">
        <Pagination 
            page={currentPage}
            total={totalPages}
            onChange={(p) => setNavigation(p)}
        />
    </div>
    </>
}