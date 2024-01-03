import React, {useState} from 'react';
import {
    Button,
    Form,
    Input, message,
    Radio,
} from 'antd';
import {DrawApi} from "../service/DrawApi.ts";
import {TATTOO_STYLES} from "../constant/style.ts";

const {TextArea} = Input;


const randomEmptyPromptMsg = [
    '写点什么吧',
    '写字啊',
    '写点字啊',
    '没字你点nm',
    '不写我给你造?',
    '你搁这点nm呢'
]

const randomPrompt = [
    '一只可爱的小猫',
    '一个宇航员漫步在太空站内',
    '大海上的日出景色',
    '一杯热蓝莓酒',
    '城市的霓虹灯光',
    '高山上的松树林',
    '一对恋人手牵手漫步在沙滩上',
    '古老城堡的庭院',
    '美丽的夕阳照耀在湖泊上',
    '一个快乐的生日派对',
    '静谧的森林小径',
]


const GeneratePage: React.FC = () => {
    // 从styleMap随机选一个
    const [style, setStyle] = useState<string>(Math.floor(Math.random() * TATTOO_STYLES.length).toString());
    const [prompt, setPrompt] = useState<string>(randomPrompt[Math.floor(Math.random() * randomPrompt.length)]);

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const [messageApi, contextHolder] = message.useMessage();


    const handleStyleChange = (e: any) => {
        console.log(`radio checked:${e.target.value}`)
        setStyle(e.target.value);
    }

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    }

    const handleGenerateClick = async () => {
        if (prompt === '') {
            messageApi.error(randomEmptyPromptMsg[Math.floor(Math.random() * randomEmptyPromptMsg.length)]);
            return;
        }
        setButtonDisabled(true);
        setButtonLoading(true);
        const result = await DrawApi.draw({style: Number(style), prompt: prompt});
        // set timeout 3 seconds
        setTimeout(() => {
            console.log(`DrawApi.draw result: ${JSON.stringify(result)}`);
            messageApi.success('后台正在努力生成中，本次ID为' + result.generateHistoryId);
            setButtonDisabled(false);
            setButtonLoading(false);
        }, 1000);
    }
    return (
        <>
            {contextHolder}
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth:1200}}
            >
                <Form.Item label="Style">
                    <Radio.Group onChange={handleStyleChange} value={style}>
                        {
                            TATTOO_STYLES.map((item, index) => {
                                    return (<Radio.Button key={index} value={index.toString()}>
                                        <img src={item.icon} alt={item.name}/>
                                        {item.name}
                                    </Radio.Button>)
                                }
                            )
                        }
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Prompt">
                    <TextArea rows={4} value={prompt} onChange={handlePromptChange}/>
                </Form.Item>
                {/*<Form.Item label="Button">*/}
                <Button
                    onClick={handleGenerateClick}
                    disabled={buttonDisabled}
                    loading={buttonLoading}
                >
                    生成
                </Button>
                {/*</Form.Item>*/}
            </Form>
        </>
    );
};


export default GeneratePage;
