import React from "react";
import { MeterReadings } from "../hooks/useGetCustomers";
import { Skeleton } from "@mui/material";

const MeterReadTable: React.FC<{
  data: MeterReadings[] | undefined;
  loading: boolean;
}> = ({ data, loading }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="border border-gray-100 ">
        <div className="flex py-1 bg-secondary items-center text-darkblue pl-4 font-semibold sticky top-[63px] drop shadow-md">
          <div className="w-32 text-sm">
            <span>AccountId</span>
          </div>
          <div className="w-48 text-sm">
            <span>MeterReadingDate</span>
          </div>
          <div className="w-24 text-sm">
            <span>MeterValue</span>
          </div>
        </div>
        {data && !loading
          ? data.map((s) => (
              <>
                <div className="flex pl-4 py-[2px] text-sm">
                  <div className="w-32">
                    <span>{s.accountId}</span>
                  </div>
                  <div className="w-48">
                    <span>{s.meterReadingDateTime}</span>
                  </div>
                  <div className="w-24">
                    <span>{s.meterReadValue}</span>
                  </div>
                </div>
                <div className="h-[1px] bg-slate-800 w-full"></div>
              </>
            ))
          : [...Array(20)].map((s) => (
              <>
                <div className="flex pl-4 py-[2px] text-sm">
                  <div className="w-32">
                    <Skeleton />
                  </div>
                  <div className="w-48">
                    <Skeleton />
                  </div>
                  <div className="w-24">
                    <Skeleton />
                  </div>
                </div>
              </>
            ))}

        {data?.length === 0 ? (
          <>
            <div className="py-4 text-center">No data</div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MeterReadTable;
