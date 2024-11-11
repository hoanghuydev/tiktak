import React from 'react';
import { Modal } from 'antd';
import { IoClose } from 'react-icons/io5';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
interface CircularProgressModalProps {
  visible: boolean;
  closeModal: () => void;
  percentUploading: number;
}

const CircularProgressModal: React.FC<CircularProgressModalProps> = ({
  visible,
  closeModal,
  percentUploading,
}) => {
  return (
    <Modal
      open={visible}
      onOk={closeModal}
      onCancel={closeModal}
      footer={() => <div></div>}
      closeIcon={<IoClose fontSize={32} />}
      width={'fit-content'}
      centered
    >
      <div className="flex flex-col">
        <div className="min-w-[90px] max-w-[90px] h-[90px] rounded-full mx-auto">
          <CircularProgressbar
            value={percentUploading}
            text={`${percentUploading}%`}
            strokeWidth={5}
            styles={buildStyles({
              textColor: '#828282',
              textSize: 18,
              pathColor: '#f42750',
            })}
          />
        </div>
        <p className="font-semibold text-center mt-5">Posting...</p>
        <p className="text-center w-[220px]">
          Leaving the page does not interrupt the posting process
        </p>
      </div>
    </Modal>
  );
};

export default CircularProgressModal;
