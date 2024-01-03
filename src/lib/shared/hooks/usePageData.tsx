import { useSearchParams } from "react-router-dom";

interface Config{
    typeValue?: string
}

const usePageData = (config?: Config) => {
    const [searchParams] = useSearchParams();

    const page = searchParams.get('page') as unknown as number ?? 1;
    const size = searchParams.get('size') as unknown as number ?? 10;
    const search = searchParams.get('search') ?? undefined;
    const sort = searchParams.get('sort') ?? 'updated';
    const direction = searchParams.get('direction') ?? 'descending';
    const type = searchParams.get('type') ?? config?.typeValue ?? '';

    return {
        page,
        size,
        search,
        sort,
        direction,
        type
    }
}

export default usePageData;