import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Dialog from "@/shared/components/Dialog";
import TextArea from "@/shared/components/TextArea";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Button from "@/shared/components/Button";

interface CooperationRequestRejectDialogData {
  description: string;
}

interface CooperationRequestRejectDialogProps {
  open: boolean;
  onClose: () => void;
  defaultValues?: Partial<CooperationRequestRejectDialogData>;
  onRejectCooperationRequest: (
    data: CooperationRequestRejectDialogData
  ) => Promise<any>;
}

export default function CooperationRequestRejectDialog({
  open,
  onClose,
  defaultValues,
  onRejectCooperationRequest,
}: CooperationRequestRejectDialogProps) {
  const [description, setDescription] = useState(
    defaultValues?.description || ""
  );

  useEffect(() => {
    setDescription(defaultValues?.description || "");
  }, [defaultValues?.description, open]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog title="رد کردن درخواست ها همکاری" open={open} onClose={onClose}>
      <div className={styles.DialogContent}>
        <TextArea
          placeholder="توضیحات"
          value={description}
          onTextChange={setDescription}
          rows={5}
        />
      </div>
      <BottomActions>
        <Button
          varient="filled"
          onClick={() => {
            setIsSubmitting(true);
            onRejectCooperationRequest({
              description,
            }).finally(() => setIsSubmitting(false));
          }}
          style={{ minWidth: 100 }}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          رد کردن
        </Button>
      </BottomActions>
    </Dialog>
  );
}
