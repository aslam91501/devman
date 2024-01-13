import { useEffect, useState } from "react";
import { Item } from "../models"
import getItems from "../hooks/getItems";
import { Card, CardBody, CircularProgress, Progress, Skeleton } from "@nextui-org/react";

interface Props{
    items: Item[]
    isError: boolean
}

const ProgressInfographics = (props: Props) => {
    const { items, isError } = props;
    
    const [loading, setLoading] = useState(true)

    const [bp, setBp] = useState(0)
    const [tp, setTp] = useState(0)
    const [top, setTop] = useState(0)

    const [totalProgress, setTotalProgress] = useState(0)

    

    const calculatePercentage = (items: Item[]) => {
        const total = items.length;
        
        if(total === 0) return 0;

        const done = items.filter(i => i.done).length;

        return (done / total) * 100
    }

    useEffect(() => {
        if(!items) return;

        const business = items.filter(i => i.type === 'business')
        const todo = items.filter(i => i.type === 'todo')
        const tests = items.filter(i => i.type === 'test')

        setBp(calculatePercentage(business))
        setTop(calculatePercentage(todo))
        setTp(calculatePercentage(tests))

        setTotalProgress(calculatePercentage(items))

        setLoading(false)
    }, [items])

    if(isError) return <>Something Went Wrong</>
    return <>

        <Card className="p-7 mt-7" shadow="md">
            <Skeleton isLoaded={!loading}>
                <Progress
                    value={totalProgress}
                    label="Total Progress"
                    showValueLabel />
            </Skeleton>
        </Card>

    <div className="flex gap-5 mt-7 justify-center w-full">
        <PercentageCard isLoading={loading} color="primary" label="Requirements" value={bp} />
        <PercentageCard isLoading={loading} color="warning" label="Todo" value={top} />
        <PercentageCard isLoading={loading} color="success" label="Tests" value={tp} />
    </div>
    </>
}





interface PercentageCardProps{
    label: string,
    value: number,
    color?: "danger" | "primary" | "success" | "warning"
    isLoading?: boolean
}

const PercentageCard = (props: PercentageCardProps) => {
    return <>
        <Card  shadow="md" className={`flex-grow`}>
            <Skeleton isLoaded={!props.isLoading}>
                <CardBody className="flex items-center justify-center py-5">
                    <CircularProgress
                        label={props.label}
                        size="lg"
                        classNames={{ svg: 'h-32 w-32', label: 'text-sm mt-4', value: 'text-sm'}}
                        value={props.value}
                        showValueLabel
                        // color={props.color}
                    />
                </CardBody>
            </Skeleton>
        </Card>
    </>
}

export default ProgressInfographics