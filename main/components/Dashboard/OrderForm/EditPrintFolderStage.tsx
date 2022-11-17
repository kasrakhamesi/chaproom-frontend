import { useState } from "react";
import toast from "react-hot-toast";
import { PrintFolder } from "@/shared/types";
import { getPrintFolder, updatePrintFolder } from "@/main/api";
import DataLoader from "@/shared/components/DataLoader";
import PrintFolderForm from "@/main/components/Dashboard/PrintFolderForm";

interface EditPrintFolderStageProps {
  printFolderId: number;
  actions: {
    finish: () => void;
  };
}

export default function EditPrintFolderStage({
  printFolderId,
  actions,
}: EditPrintFolderStageProps) {
  const [data, setData] = useState<PrintFolder>();

  return (
    <DataLoader load={() => getPrintFolder(printFolderId)} setData={setData}>
      <PrintFolderForm
        defaultValues={data}
        onCancel={actions.finish}
        onFinish={(printFolderData) =>
          updatePrintFolder(printFolderId, printFolderData)
            .then((message) => {
              toast.success(message);
              actions.finish();
            })
            .catch(toast.error)
        }
      />
    </DataLoader>
  );
}
