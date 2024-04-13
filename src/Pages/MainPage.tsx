import React, { useState, useRef } from "react";
import tickdLogo from "../assets/Full-Tickd-Logo.png";
import {
  UploadOutlined,
  SwitcherOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Modal } from "antd";
import {
  useGetCustomers,
  uploadMeterReadingsCSV,
  useGetMeterReadings,
  deleteAllReadings,
} from "../hooks/useGetCustomers";
import UserMeterReadTable from "../components/UserMeterReadTable";
import MeterReadTable from "../components/MeterReadTable";
import { AxiosError } from "axios";

const MainPage = () => {
  const { queryResult, isLoading, refetch } = useGetCustomers();
  const {
    queryResult: meterReadings,
    isLoading: loading,
    refetch: readingsRefetch,
  } = useGetMeterReadings();

  const [switchView, setSwitchView] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<{
    success: number;
    failed: number;
  } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    file && setSelectedFile(file);
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllReadings();
      refetch();
      readingsRefetch();
    } catch (error) {
      console.log(error);
      setErrorMessage("Unable to delete readings");
      setOpen(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      const result = await uploadMeterReadingsCSV(formData);
      setSuccessMessage({
        failed: result.failedReadings,
        success: result.successfulReadings,
      });
      setOpenSuccess(true);
      refetch();
      readingsRefetch();
      setSelectedFile(null);
      setUploading(false);
    } catch (error) {
      const apiError = error as AxiosError<any>;
      if (apiError) {
        var message = apiError.response?.data.message;
        if (message) {
          setErrorMessage(message);
          setOpen(true);
        } else {
          setErrorMessage("Unexpected error, please try again later");
          setOpen(true);
        }
        setUploading(false);
        setSelectedFile(null);
        return;
      }
      setUploading(false);
      setSelectedFile(null);
    }
  };

  const handleParentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSuccess(false);
  };

  return (
    <>
      <div className="h-16 bg-gray-200 text-black top-0 items-center flex fixed w-full z-50 drop-shadow-md">
        <div className="ml-12 h-20 w-32 flex items-center">
          <img src={tickdLogo} alt="Tickd" />
        </div>
      </div>
      <div className="mt-20">
        <div className="flex justify-center pt-2 pb-1 items-center text-lg text-secondary font-semibold">
          Customer Meter Reading{" "}
          <button
            onClick={() => {
              setSwitchView(!switchView);
            }}
            className="ml-5"
          >
            <SwitcherOutlined />
          </button>
        </div>
        <div className="ml-10 mb-1 sticky top-[80px]">
          <div className="flex h-6 items-center">
            <div
              onClick={handleParentClick}
              className="text-xs border py-[2px] px-1 rounded-md hover:bg-secondary hover:text-darkblue cursor-pointer "
            >
              <label
                onClick={(e) => e.preventDefault()}
                className="cursor-pointer"
                htmlFor="csvFileInput"
              >
                Choose CSV file
              </label>
            </div>
            <input
              id="csvFileInput"
              type="file"
              onChange={handleFileChange}
              accept=".csv"
              style={{ display: "none" }}
              ref={fileInputRef}
            />

            {selectedFile && (
              <button
                className="bg-secondary text-darkblue rounded-md text-sm font-bold ml-5 px-2 border border-secondary "
                onClick={handleUpload}
              >
                <UploadOutlined />
              </button>
            )}
            <button
              className="bg-red-400 text-darkblue rounded-md text-sm font-semibold ml-5 px-2 border border-secondary "
              onClick={handleDeleteAll}
            >
              Delete all meter readings
              <DeleteFilled />
            </button>
          </div>
          <div className="text-xs mt-[2px]">{`${
            selectedFile
              ? `Selected file: ${selectedFile.name}`
              : "No file selected"
          }`}</div>
        </div>

        <div>
          {switchView ? (
            <UserMeterReadTable data={queryResult} loading={isLoading} />
          ) : (
            <MeterReadTable data={meterReadings} loading={loading} />
          )}
        </div>
        <Modal
          className="custom-modal"
          open={open}
          onCancel={handleClose}
          footer={null}
        >
          <div className="bg-red-400  text-center py-2">
            <p className="block-inline font-bold">CSV Upload Error</p>
            <p className="font-semibold">{errorMessage}</p>
          </div>
        </Modal>
        <Modal
          className="custom-modal"
          open={openSuccess}
          onCancel={handleClose}
          footer={null}
        >
          <div className="bg-slate-400  text-center py-2">
            <p className="block-inline font-bold text-base">
              CSV Upload Success
            </p>
            <p className="font-semibold">{`Successul Uploads: ${successMessage?.success}`}</p>
            <p className="font-semibold">{`Failed Readings: ${successMessage?.failed}`}</p>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MainPage;
