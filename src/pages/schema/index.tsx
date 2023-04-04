import Diagram, { createSchema, useSchema } from "beautiful-react-diagrams";
import type {
    DiagramSchema,
    Node,
} from "beautiful-react-diagrams/@types/DiagramSchema";
import "beautiful-react-diagrams/styles.css";
import React, { ReactNode } from "react";
import uuid from "react-uuid";

function CustomRender({
    id,
    content,
    data,
    inputs,
    outputs,
}: Node<DiagramProps>) {

    return (
        <div className="group relative rounded-lg bg-gray-600 p-2 text-gray-200 shadow-xl">
            {/* Table header */}
            <div className="bg-gray-800">{data!.tableName}</div>
            {/* Fields */}
            <div>
                {Object.entries(data!.fields).map(([key, value]) => (
                    <div className="grid grid-cols-2 justify-between gap-4" key={key}>
                        <div className="text-start">{key}</div>

                        <div className="text-end">{value}</div>
                    </div>
                ))}
            </div>
            {/* Add Field Button */}
            <button onClick={() => console.log(id)} className="invisible absolute right-0 left-0 m-auto w-8 h-8 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 group-hover:visible">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
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
    );
}

type DiagramProps = {
    onClick: (id: string) => void;
    tableName: string;
    fields: Record<string, string>;
};

const SchemaPage = () => {
    const deleteNodeFromSchema = (id: string) => {
        const nodeToRemove = schema.nodes.find((node) => node.id === id);
        if (!nodeToRemove) {
            return;
        }
        removeNode(nodeToRemove);
    };

    const addNewNode = () => {
        const nextNode: Node<DiagramProps> = {
            id: uuid(),
            coordinates: [200, 300],
            render: CustomRender,
            data: {
                onClick: deleteNodeFromSchema,
                tableName: "New Table",
                fields: {
                    // id: "String",
                    // user_name: "String",
                },
            },
        };

        addNode(nextNode);
    };

    const initialSchema: DiagramSchema<DiagramProps> = createSchema({
        nodes: [
            {
                id: uuid(),
                coordinates: [200, 300],
                render: CustomRender,
                data: {
                    onClick: deleteNodeFromSchema,
                    tableName: "Users",
                    fields: {
                        id: "String",
                        user_name: "String",
                    },
                },
                // inputs: [{ id: `port-${Math.random()}` }],
                // outputs: [{ id: `port-${Math.random()}` }],
            },
        ],
    });

    const [schema, { onChange, addNode, removeNode }] = useSchema<DiagramProps>(initialSchema);


    return (
        <div className="flex justify-center">
            <div className="absolute top-3 ">
                <div className="flex flex-row gap-8">
                    <button
                        type="button"
                        className="bg-gray-200 p-2"
                        onClick={addNewNode}
                    >
                        Add table
                    </button>
                    <button type="button" className="bg-gray-200 p-2">
                        generate
                    </button>
                </div>
            </div>
            <main className="flex h-screen w-screen bg-red-100">
                <div className="m-16 grow ">
                    <Diagram schema={schema} onChange={onChange} />
                </div>
            </main>
        </div>
    );
};

export default SchemaPage;
