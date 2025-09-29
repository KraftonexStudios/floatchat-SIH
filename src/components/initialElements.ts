// Initial nodes and edges for the ReactFlow with dagre layout

export const initialNodes = [
  {
    id: "1",
    type: "userMessage",
    data: { content: "Tell me about ARGO floats in the Indian Ocean" },
  },
  {
    id: "2",
    type: "aiResponse",
    data: {
      content:
        "ARGO floats are autonomous oceanographic instruments that collect temperature and salinity data. In the Indian Ocean, they provide crucial insights into monsoon patterns and ocean circulation.",
    },
  },
  {
    id: "3",
    type: "chart",
    data: { componentType: "temperature" },
  },
  {
    id: "4",
    type: "chart",
    data: { componentType: "salinity" },
  },
  {
    id: "5",
    type: "chart",
    data: { componentType: "worldmap" },
  },
  {
    id: "6",
    type: "keyFindings",
    data: {},
  },
];

export const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    animated: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    animated: true,
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    type: "smoothstep",
    animated: true,
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    type: "smoothstep",
    animated: true,
  },
  {
    id: "e2-6",
    source: "2",
    target: "6",
    type: "smoothstep",
    animated: true,
  },
];
