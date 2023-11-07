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

const statusMap: string[] = [
    "Processing",
    "Success",
    "Fail",
];

function HistoryPage() {

    // {
    // 	"id": 130,
    // 	"userId": "admin",
    // 	"style": 1,
    // 	"prompt": "一只可爱的猫",
    // 	"promptEnglish": "A cute cat",
    // 	"generateUsedTime": 3000,
    // 	"status": 1,
    // 	"images": [
    // 		"http://123.60.97.192:9001/pic/2023-11-07T17:04:13.829028_1.png",
    // 		"http://123.60.97.192:9001/pic/2023-11-07T17:04:13.829028_1.png",
    // 		"http://123.60.97.192:9001/pic/2023-11-07T17:04:13.829028_1.png",
    // 		"http://123.60.97.192:9001/pic/2023-11-07T17:04:13.829028_1.png"
    // 	],
    // 	"createTime": "2023-10-19T11:19:04.000Z"
    // },
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
                    <p><b>ID:</b> {item.id} </p>
                    <p><b>Style:</b> {styleMap[item.style]} </p>
                    <p><b>Prompt:</b> {item.prompt} </p>
                    <p><b>Prompt English:</b> {item.promptEnglish} </p>
                    <p><b>Generate Used Time:</b> {item.generateUsedTime} </p>
                    <p><b>Status:</b> {statusMap[item.status]} </p>
                    <p><b>Create Time:</b> {item.createTime} </p>
                </List.Item>
            )
            }
        />
    )
        ;
}


export default HistoryPage;
