import { memo } from "react";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Types
import { TJobModalInfo } from "../../app/types/Job.type";

type TJobModalProps = {
  modal: boolean;
  setModal: (value: React.SetStateAction<boolean>) => void;
  jobInfo: TJobModalInfo;
};

function JobModal({ modal, setModal, jobInfo }: TJobModalProps) {
  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold">{jobInfo.title}</h3>
                <button
                  onClick={() => setModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="default-modal"
                >
                  <CloseIcon />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Geo: {jobInfo.geo}</p>
                <p className="text-sm text-gray-500">
                  Salary currency: {jobInfo.salaryCurrency}
                </p>
                <p className="text-sm text-gray-500">
                  Industry: {jobInfo.industry}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"></div>
        </div>
      </div>
    </Modal>
  );
}

export default memo(JobModal);
