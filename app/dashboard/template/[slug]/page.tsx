'use client';
import { useUser } from '@/hooks/useUser';
import { useParams } from 'next/navigation';
import React, {useCallback, useEffect, useRef, useState } from 'react'
import {ReactFlow,Background,Controls,addEdge,Node,connection, useNodesState,useEdgesState} from "reactflow";
import "reactflow/dist/style.css";
import { mockTemplate } from '@/lib/mock';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

const Page = () => {
    const params = useParams();
    const slug = params.slug as string;
    const {user} = useUser();

    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useNodesState([]);

    const [template, setTemplate] = useState<any>(null);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [modelNodeData, setModelNodeData] = useState<any>(null);

    const ReactFlowWrapper = useRef<HTMLDivElement>(null);
    
    const handleNodeChange = useCallback((changes:any) =>{
        onNodesChange(changes);
    },[onNodesChange, setNodes, edges]);
    
    useEffect(() =>{
     const foundTemplate = mockTemplate.find((t) => t.id == slug);
     if(!foundTemplate) return;
     setTemplate(foundTemplate);
    },[slug]) 
  return (
    <div className='flex h-full'>
      <div className='flex-1 p-6 flex flex-col h-full'>
        <div className='flex items-center justify-between mb-6'>
            <div>
                <h1 className='text-3xl font-bold text-white'>Edit Template: {template?.name || slug}</h1>
                <p className='text-gray-400'>{template?.description || "Design your workflow by connection nodes"}</p>
            </div>
            <div className='flex items-center gap-3'></div>
        </div>
                <Card className='bg-[#121826] border-[#1E293B] flex-1 relative'>
                    <CardContent className='p-0 h-full'>
                        <div ref={ReactFlowWrapper} className='w-full h-full'>
                            <ReactFlow nodes={nodes} edges={edges} onNodesChange={handleNodeChange}></ReactFlow>
                        </div>
                    </CardContent>
                </Card>
      </div>
    </div>
  )
}

export default Page
