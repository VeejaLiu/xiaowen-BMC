import {useEffect, useState} from "react";
import {HistoryApi} from "../service/HistoryApi.ts";
import {Card} from "antd";

function HistoryPage() {
    const [history, setHistory] = useState<any[]>([]);

    const getHistory = async () => {
        const result = await HistoryApi.getHistory();
        console.log(result);
        setHistory(result.history);
    }

    useEffect(() => {
        getHistory();
        console.log("HistoryPage");
    }, []);

    return (
        <div style={{flex: 1}}>
            {
                history.map((item) => {
                    return (
                        <Card title={item.id} bordered={false} style={{width: 300, margin: '5px'}}>
                            {/*{"id":7,"user_id":"admin","style":1,"prompt_history_id":7,"status":0,"generate_used_time":0,"images":"","is_private":0,"is_starred":0,"is_deleted":0,"create_time":"2023-11-06T15:28:18.000Z","update_time":"2023-11-06T15:28:18.000Z"}*/}
                            <p>style: {item.style}</p>
                            <p>generate_used_time: {item.generate_used_time}</p>
                            <p>images: {item.images}</p>
                            <p>create_time: {item.create_time}</p>
                        </Card>


                    );
                })
            }
        </div>
    );
}

export default HistoryPage;
