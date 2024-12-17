import { SampleData, ServiceDeskQuery } from "api/types";
import axios from 'axios';
import { useEffect, useState } from "react";

function ListOrderPriority() {
    const [data, setData] = useState<SampleData | undefined>(undefined);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            // view a list of all issues of any type, sorted by priority
            const { data } = await axios.get<SampleData>('/api/data?datapoints=100');

            const low: ServiceDeskQuery[] = [];
            const medium: ServiceDeskQuery[] = [];
            const high: ServiceDeskQuery[] = [];

            data.results.forEach((query) => {
                switch(query.priority) {
                    case "low":
                        low.push(query);
                        break;
                    case "mediun":
                        medium.push(query);
                        break;
                    case "high":
                        high.push(query);
                        break;
                    default:
                        break;
                }
            });

            if (mounted) {
                setData({
                    results: [
                        ...high,
                        ...medium,
                        ...low,
                    ]
                });
            }
        }

        fetchData();

        return () => { mounted = false; }
    }, [])

    if (!data) {
        return 'loading data...';
    }

    return (
        <div className='border p-4'>
            <pre className='text-sm'>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default ListOrderPriority
