
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { DiagramSchema } from "beautiful-react-diagrams/@types/DiagramSchema"
import 'beautiful-react-diagrams/styles.css';
import React from 'react';

const CustomRender = ({ id, content, data, inputs, outputs }) => {
    const fields = Object.entries(data.fields);
    return (
        <div className='relative group bg-gray-600 text-gray-200 rounded-lg shadow-xl p-2'>
            {/* Table header */}
            <div className='bg-gray-800'>{data.tableName}</div>
            {/* Fields */}
            <div className='flex flex-col'>
                {fields.map(([key, value]) => (
                    <div className='flex flex-row gap-12' key={key}>
                        <div className='min-w-[50%] justify-start' key={key}>{key}</div>
                        <div className='min-w-[50%] justify-end' key={key}>{value as string}</div>
                    </div>
                )
                )}
            </div>
            {/* Add Field Button */}
            <button
                className="relative top-6 left-1/2 right-1/2 invisible group-hover:visible p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </button>
            {/* <div style={{ textAlign: 'right' }}>
            <button className='w-6 h-6 bg-gray-800' onClick={() => data.onClick(id)} />
        </div>
        <input type="text" defaultValue={content} />
        {data.fields.map(field => {
            <div>{field}</div>
        })}
        <div role="button" onClick={() => console.log(content)} style={{ padding: '15px' }}>
            {content}
        </div>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            {inputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', background: '#1B263B' } }))}
            {outputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', background: '#1B263B' } }))}
        </div> */}
        </div>
    )

};


type DiagramProps = {
    onClick: (id: string) => void,
    tableName: string,
    fields: Record<string, string>
}


const SchemaPage = () => {
    const deleteNodeFromSchema = (id) => {
        const nodeToRemove = schema.nodes.find(node => node.id === id);
        removeNode(nodeToRemove);
    };

    const addNewNode = () => {
        const nextNode = {
            id: `node-${schema.nodes.length + 1}`,
            content: `Node ${schema.nodes.length + 1}`,
            coordinates: [
                schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
                schema.nodes[schema.nodes.length - 1].coordinates[1],
            ],
            render: CustomRender,
            data: { onClick: deleteNodeFromSchema },
            inputs: [{ id: `port-${Math.random()}` }],
            outputs: [{ id: `port-${Math.random()}` }],
        };

        addNode(nextNode);
    }

    const initialSchema: DiagramSchema<DiagramProps> = createSchema({
        nodes: [
            {
                id: "entity-1",
                content: "Entity-1",
                coordinates: [
                    200,
                    300,
                ],
                render: CustomRender,
                data: {
                    onClick: deleteNodeFromSchema,
                    tableName: "Users",
                    fields: {
                        id: "String",
                        user_name: "String",
                    }
                },
                inputs: [{ id: `port-${Math.random()}` }],
                outputs: [{ id: `port-${Math.random()}` }],

            },
        ]
    });

    const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);


    const handleAddTableClick = (e: any) => {
        addNode({ id: String(initialSchema.nodes.length + 1), content: 'Node 1', coordinates: [250, 60], })
    }


    return (
        <div className="flex justify-center">
            <div className="absolute top-3 ">
                <div className="flex flex-row gap-8">
                    <button type="button" className="bg-gray-200 p-2" onClick={addNewNode}>Add table</button>
                    <button type="button" className="bg-gray-200 p-2">generate</button>
                </div>

            </div>
            <main className="flex w-screen h-screen bg-red-100">
                <div className="grow m-16 ">
                    <Diagram schema={schema} onChange={onChange} />
                </div>

            </main>
        </div>
    )
}


export default SchemaPage;

