"use client";

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionLineType,
  Panel,
  BackgroundVariant,
  Node,
  NodeProps,
  Edge,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';
import { Send, Mic, ArrowUp } from 'lucide-react';
import { TemperatureChart } from './TemperatureChart';
import { SalinityChart } from './SalinityChart';
import { WorldMap } from './WorldMap';
import { initialNodes, initialEdges } from './initialElements';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

// Mock chart components
// const TemperatureChart = () => (
//   <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 h-full shadow-xl">
//     <h3 className="text-white font-medium mb-3">Temperature</h3>
//     <div className="h-40 bg-gradient-to-r from-blue-900 to-red-900 rounded flex items-center justify-center text-sm text-gray-300">
//       Temperature Data
//     </div>
//   </div>
// );

// const SalinityChart = () => (
//   <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 h-full shadow-xl">
//     <h3 className="text-white font-medium mb-3">Salinity</h3>
//     <div className="h-40 bg-gradient-to-r from-green-900 to-blue-900 rounded flex items-center justify-center text-sm text-gray-300">
//       Salinity Data
//     </div>
//   </div>
// );

// const WorldMap = () => (
//   <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 h-full shadow-xl">
//     <h3 className="text-white font-medium mb-3">Map</h3>
//     <div className="h-40 bg-gradient-to-r from-gray-800 to-blue-900 rounded flex items-center justify-center text-sm text-gray-300">
//       Geographic Data
//     </div>
//   </div>
// );

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface FlowInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

// Custom node components
const UserMessageNode = ({ data, selected }: NodeProps) => {
  const nodeData = data as { content: string };
  return (
    <div className={`bg-gray-800 border border-gray-700 text-white p-4 rounded-lg max-w-xs shadow-xl relative transition-all duration-200 ${selected ? 'ring-4 ring-blue-400 ring-opacity-75 scale-105' : ''
      }`}>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#3b82f6', width: 12, height: 12 }}
      />
      <div className="text-xs font-medium mb-2 opacity-60">USER</div>
      <div className="text-sm leading-relaxed break-words">{nodeData.content}</div>
    </div>
  );
};

const AIResponseNode = ({ data, selected }: NodeProps) => {
  const nodeData = data as { content: string };
  return (
    <div className={`bg-gray-900 border border-gray-600 text-white p-4 rounded-lg max-w-md shadow-xl relative transition-all duration-200 ${selected ? 'ring-4 ring-blue-400 ring-opacity-75 scale-105' : ''
      }`}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#3b82f6', width: 12, height: 12 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#8b5cf6', width: 12, height: 12 }}
      />
      <div className="text-xs font-medium mb-2 text-blue-400 opacity-80">AI</div>
      <div className="text-sm leading-relaxed break-words">{nodeData.content}</div>
    </div>
  );
};

const ChartNode = ({ data, selected }: NodeProps) => {
  const nodeData = data as { componentType: string };
  const renderComponent = () => {
    switch (nodeData.componentType) {
      case 'temperature':
        return <TemperatureChart />;
      case 'salinity':
        return <SalinityChart />;
      case 'worldmap':
        return <div className="bg-gray-900 rounded-lg p-4">
          <WorldMap />
        </div>;
      default:
        return <div>Chart Component</div>;
    }
  };

  return (
    <div className={`w-full h-full min-w-[350px] min-h-[300px] relative transition-all duration-200 ${selected ? 'ring-4 ring-blue-400 ring-opacity-75 scale-105' : ''
      }`}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#8b5cf6', width: 12, height: 12 }}
      />
      {renderComponent()}
    </div>
  );
};

const KeyFindingsNode = ({ data, selected }: NodeProps) => (
  <div className={`bg-gray-900 border border-gray-600 rounded-lg p-4 shadow-xl overflow-hidden min-w-[500px] min-h-[250px] w-full h-full relative transition-all duration-200 ${selected ? 'ring-4 ring-blue-400 ring-opacity-75 scale-105' : ''
    }`}>
    <Handle
      type="target"
      position={Position.Top}
      style={{ background: '#8b5cf6', width: 12, height: 12 }}
    />
    <h3 className="text-white font-medium mb-3">Key Findings</h3>
    <ul className="space-y-2 text-gray-300 text-sm">
      <li className="flex items-start gap-2">
        <span className="text-blue-400">•</span>
        <span><strong className="text-white">Monsoon Impact:</strong> Mixed layer depth increased from 25m to 65m</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-red-400">•</span>
        <span><strong className="text-white">Temperature Anomaly:</strong> Surface temperatures 0.8°C cooler than climatology</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-400">•</span>
        <span><strong className="text-white">Salinity Patterns:</strong> Fresh water intrusion in northern regions</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-purple-400">•</span>
        <span><strong className="text-white">Float Network:</strong> 5 active floats providing real-time data</span>
      </li>
    </ul>
  </div>
);

// Node types configuration
const nodeTypes = {
  userMessage: UserMessageNode,
  aiResponse: AIResponseNode,
  chart: ChartNode,
  keyFindings: KeyFindingsNode,
};

// Dagre layout configuration
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 150;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

// Get initial layouted elements
const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

function FlowInterfaceInner({ messages = [], onSendMessage }: FlowInterfaceProps) {
  const [message, setMessage] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Generate nodes and edges from messages
  const generateNodesFromMessages = useCallback(() => {
    if (messages.length === 0) {
      return { nodes: layoutedNodes, edges: layoutedEdges };
    }

    const nodes = [];
    const edges = [];
    let nodeId = 1;
    const messageNodeIds = [];

    messages.forEach((message, index) => {
      const currentNodeId = nodeId.toString();
      messageNodeIds.push(currentNodeId);

      if (message.isUser) {
        nodes.push({
          id: currentNodeId,
          type: 'userMessage',
          data: { content: message.content },
        });
      } else {
        nodes.push({
          id: currentNodeId,
          type: 'aiResponse',
          data: { content: message.content },
        });

        // Add chart nodes after AI response if it mentions ARGO
        if (message.content.toLowerCase().includes('argo')) {
          const aiNodeId = currentNodeId;

          // Temperature chart
          nodeId++;
          nodes.push({
            id: nodeId.toString(),
            type: 'chart',
            data: { componentType: 'temperature' },
          });
          edges.push({
            id: `e${aiNodeId}-${nodeId}`,
            source: aiNodeId,
            target: nodeId.toString(),
            type: 'smoothstep',
            animated: true,
          });

          // Salinity chart
          nodeId++;
          nodes.push({
            id: nodeId.toString(),
            type: 'chart',
            data: { componentType: 'salinity' },
          });
          edges.push({
            id: `e${aiNodeId}-${nodeId}`,
            source: aiNodeId,
            target: nodeId.toString(),
            type: 'smoothstep',
            animated: true,
          });

          // World map
          nodeId++;
          nodes.push({
            id: nodeId.toString(),
            type: 'chart',
            data: { componentType: 'worldmap' },
          });
          edges.push({
            id: `e${aiNodeId}-${nodeId}`,
            source: aiNodeId,
            target: nodeId.toString(),
            type: 'smoothstep',
            animated: true,
          });

          // Key findings
          nodeId++;
          nodes.push({
            id: nodeId.toString(),
            type: 'keyFindings',
            data: {},
          });
          edges.push({
            id: `e${aiNodeId}-${nodeId}`,
            source: aiNodeId,
            target: nodeId.toString(),
            type: 'smoothstep',
            animated: true,
          });
        }
      }

      nodeId++;
    });

    // Connect consecutive message nodes
    for (let i = 1; i < messageNodeIds.length; i++) {
      edges.push({
        id: `e${messageNodeIds[i - 1]}-${messageNodeIds[i]}`,
        source: messageNodeIds[i - 1],
        target: messageNodeIds[i],
        type: 'smoothstep',
        animated: true,
      });
    }

    return getLayoutedElements(nodes, edges);
  }, [messages]);

  const { nodes: dynamicNodes, edges: dynamicEdges } = generateNodesFromMessages();
  const [nodes, setNodes, onNodesChange] = useNodesState(dynamicNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(dynamicEdges);

  // Update nodes and edges when messages change
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = generateNodesFromMessages();
    setNodes(newNodes);
    setEdges(newEdges);
  }, [messages, generateNodesFromMessages, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds),
      ),
    [],
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction,
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, []);

  // Handle input changes and open sheet when typing after node selection
  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);

    // If a node is selected and user starts typing, open the sheet
    if (selectedNode && value.trim() && !isSheetOpen) {
      setQuery(value);
      setIsSheetOpen(true);
    }
  }, [selectedNode, isSheetOpen]);

  const handleSend = useCallback(() => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      setSelectedNode(null);
      setIsSheetOpen(false);
    }
  }, [message, onSendMessage]);

  // Handle sheet query changes
  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);



  return (
    <div className="flex-1  h-full ">
      {/* React Flow Canvas */}
      <div className="flex-1 h-full  bg-black relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          fitViewOptions={{
            padding: 0.2,
            includeHiddenNodes: false,
          }}
          className="w-full h-full"
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 2 }}
          defaultEdgeOptions={{
            style: { stroke: '#3b82f6', strokeWidth: 2 },
            type: 'smoothstep',
            markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }
          }}
        >
          <Panel position="top-right">
            <button className="px-4 py-2 bg-blue-600 text-white rounded mr-2 hover:bg-blue-700" onClick={() => onLayout('TB')}>
              Vertical Layout
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => onLayout('LR')}>
              Horizontal Layout
            </button>
          </Panel>
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#374151"
          />
          <Controls />
        </ReactFlow>
      </div>

      {/* Chat Input */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            placeholder={selectedNode ? "Type your query about the selected node..." : "Ask about ARGO floats to see visualizations..."}
            className={`w-[600px] bg-gray-800 border border-gray-600 rounded-full pl-4 pr-20 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${selectedNode ? 'border-blue-500 ring-1 ring-blue-500' : ''
              }`}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Mic className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors disabled:opacity-50"
              disabled={!message.trim()}
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Side Panel Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Node Analysis</SheetTitle>
            <SheetDescription>
              Analysis and insights for the selected node
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Query:
              </label>
              <input
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="Enter your question..."
                className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                Analysis Results
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Based on your query about the selected node, here are the key insights:
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>This node represents a critical data point in the ARGO float network analysis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>The data shows significant oceanographic patterns relevant to climate monitoring.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>Temperature and salinity measurements indicate seasonal variations in this region.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>This information contributes to our understanding of global ocean circulation patterns.</span>
                  </li>
                </ul>

                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Recommendation:</strong> Consider correlating this data with nearby float measurements for a more comprehensive analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

    </div>
  );
}

// Wrapper component with ReactFlowProvider
export default function FlowInterface(props: FlowInterfaceProps) {
  return (
    <ReactFlowProvider>
      <FlowInterfaceInner {...props} />
    </ReactFlowProvider>
  );
}