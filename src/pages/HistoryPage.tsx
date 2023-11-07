import {useEffect, useState} from "react";
import {HistoryApi} from "../service/HistoryApi.ts";
import {List} from "antd";


export const styleMap: string[] = [
    "None",
    "Black work",
    "Dot work",
    "Geometric",
    "Watercolor",
    "Realism",
    "Neo traditional",
    "New school",
    "Japanese",
    "Tribal",
    "Lettering",
    "Trash polka",
];

function HistoryPage() {
    const [history, setHistory] = useState<any[]>([]);

    const getHistory = async () => {
        const result = await HistoryApi.getHistory();
        console.log(result);
        result.history.forEach((item: any) => {
                item.images = JSON.parse(item.images);
            }
        );
        console.log(result);
        setHistory(result.history);
    }

    useEffect(() => {
        getHistory();
        console.log("HistoryPage");
    }, []);

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 2,
            }}
            dataSource={history}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[]}
                    extra={
                        <>
                            {
                                item?.images?.map((image: string) => {
                                    return (
                                        <img src={image} alt="image" style={{width: 200, margin: '5px'}}/>
                                    );
                                })
                            }
                        </>
                    }
                >
                    {`item.prompt_history_id: ${item.prompt_history_id}`}
                </List.Item>
            )
            }
        />
    )
        ;
}


export default HistoryPage;
