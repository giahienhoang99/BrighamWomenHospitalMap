import { useEffect, useState } from "react";
import firstFloor from "../assets/01_thefirstfloor.png";
import { Sidebar, MapContext, NodeFloorID } from "../components";
import BeefletMap from "@/features/map/components/BeefletMap.tsx";
import { Edges, Nodes, Requests, Employees } from "database";

const Map = () => {
  const [nodes, setNodes] = useState<Nodes[]>([]);
  const [edges, setEdges] = useState<Edges[]>([]);
  const [selectedFloor, setSelectedFloor] = useState(firstFloor);
  const [path, setPath] = useState<string[]>([]);
  const [algorithm, setAlgorithm] = useState<string>("AStar");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startID, setStartID] = useState("");
  const [endID, setEndID] = useState("");
  const [requests, setRequests] = useState<
    (Requests & {
      employee: Employees | null;
    })[]
  >([]);
  const [floorSections, setFloorSections] = useState<NodeFloorID[]>([]);
  const [selectedFID, setSelectedFID] = useState("");
  const [center, setCenter] = useState<number[]>([]);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const res = await fetch("/api/map/nodes");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setNodes(data);
      } catch (error) {
        console.error("Failed to fetch nodes:", error);
      }
    };
    const fetchEdges = async () => {
      try {
        const res = await fetch("/api/map/edges");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setEdges(data);
      } catch (error) {
        console.error("Failed to fetch edges:", error);
      }
    };
    const fetchServicesWithEmployees = async () => {
      try {
        const res = await fetch("/api/services/with-employee");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchNodes();
    fetchEdges();
    fetchServicesWithEmployees();
  }, []);

  return (
    <MapContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        selectedFloor,
        setSelectedFloor,
        algorithm,
        setAlgorithm,
        path,
        setPath,
        startLocation,
        setStartLocation,
        endLocation,
        setEndLocation,
        startID,
        setStartID,
        endID,
        setEndID,
        requests,
        setRequests,
        floorSections,
        setFloorSections,
        selectedFID,
        setSelectedFID,
        center,
        setCenter,
      }}
    >
      <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-neutral-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <BeefletMap />
        </div>
      </div>
    </MapContext.Provider>
  );
};

export { Map };
