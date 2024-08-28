import { rowSchema } from "@/components/Table/Data/Schema";
import { Button } from "@/components/Ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Ui/dropdown-menu";
import useStore from "@/store/store";
import { useRouter } from "next/navigation";
const DataTableRowActions = ({ row }) => {
  const { setSingleData } = useStore();
  const router = useRouter();
  const parsedData = rowSchema.safeParse(row.original); // Use safeParse to avoid crashes
  const data = parsedData.data;





  const handleSingleOnMap = () => {
   
    setSingleData(data);
    router.push("/dashboard/single-employee/map");
  };
  const handleRoadMap = () => {
    // Set the selected rows in the Zustand store
    setSingleData(data);
    router.push("/dashboard/single-employee/roadmap");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <div className="flex flex-col gap-2 m-2 ">
          <Button className="border border-gray-500"
            variant="default"
            onClick={handleSingleOnMap}
          >
            Map
          </Button>
          <Button className="border border-gray-400"
            variant="default"
            onClick={handleRoadMap}
          >
            Road Map
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
