import React, {useState} from 'react';
import {
    Button,
    Form,
    Input,
    Radio,
} from 'antd';
import {DrawApi} from "../service/DrawApi.ts";

const {TextArea} = Input;

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

const GeneratePage: React.FC = () => {
    const [style, setStyle] = useState<string>('1');
    const [prompt, setPrompt] = useState<string>('');

    const handleStyleChange = (e: any) => {
        setStyle(e.target.value);
    }

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    }

    const handleGenerateClick = async () => {
        const result = await DrawApi.draw({style: Number(style), prompt: prompt});
        console.log(`DrawApi.draw result: ${JSON.stringify(result)}`);
    }
    return (
        <>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: 600}}
            >
                <Form.Item label="Style">
                    <Radio.Group onChange={handleStyleChange} value={style}>
                        {styleMap.map((item, index) => {
                                return <Radio.Button key={index} value={index.toString()}>{item}</Radio.Button>
                            }
                        )}
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Prompt">
                    <TextArea rows={4} value={prompt} onChange={handlePromptChange}/>
                </Form.Item>
                {/*<Form.Item label="Button">*/}
                <Button onClick={handleGenerateClick}>生成</Button>
                {/*</Form.Item>*/}
            </Form>
        </>
    );
};


export default GeneratePage;
