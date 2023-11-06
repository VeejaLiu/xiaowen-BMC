import React, {useState} from 'react';
import {
    Button,
    Form,
    Input,
    Radio,
} from 'antd';
import {DrawApi} from "../service/DrawApi.ts";

const {TextArea} = Input;


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
                        <Radio value="1"> Black work </Radio>
                        <Radio value="2"> Dot work </Radio>
                        <Radio value="3"> Geometric </Radio>
                        <Radio value="4"> Watercolor </Radio>
                        <Radio value="5"> Realism </Radio>
                        <Radio value="6"> Neo traditional </Radio>
                        <Radio value="7"> New school </Radio>
                        <Radio value="8"> Japanese </Radio>
                        <Radio value="9"> Tribal </Radio>
                        <Radio value="10"> Lettering </Radio>
                        <Radio value="11"> Trash polka </Radio>
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
