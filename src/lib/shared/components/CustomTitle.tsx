import {Helmet} from 'react-helmet';

interface Props{
    title: string,
    prefix?: string,
    error?: boolean,
    loading?: boolean,
}

const CustomTitle = (props: Props) => {
    const { title, prefix, error, loading } = props;

    let titleString = `${prefix ? prefix + ' - ' : ''}`

    if(error) titleString += 'Error'
    else if(loading) titleString += 'Loading'
    else titleString += title;

    return <>
        <Helmet>
            <title>{titleString}</title>
        </Helmet>
    </>
}

export default CustomTitle;