import axios from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export interface UserMeterReadings {
  accountId: number;
  lastName: string;
  firstName: string;
  meterReadingDateTime?: string;
  meterReadValue?: number;
}

export interface MeterReadings {
  accountId?: number;
  meterReadingDateTime?: string;
  meterReadValue?: number;
}

export interface MeterReadResult {
  successfulReadings: number;
  failedReadings: number;
}

const getUserMeterReadings = async () => {
  const { data } = await axios.get<UserMeterReadings[]>(
    "/api/v1/user-meter-readings"
  );
  return data;
};

const getMeterReadings = async () => {
  const { data } = await axios.get<MeterReadings[]>("/api/v1/meter-readings");
  return data;
};

export const uploadMeterReadingsCSV = async (file: FormData) => {
  const { data } = await axios.post<MeterReadResult>(
    "/api/v1/meter-reading-uploads",
    file,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const deleteAllReadings = async () => {
  const { data } = await axios.delete("/api/v1/delete-meter-readings");
  return;
};

export const useGetCustomers = (
  config?: UseQueryOptions<UserMeterReadings[]>
) => {
  const query = useQuery({
    queryKey: ["UserMeterReadings"],
    queryFn: async () => {
      const result = await getUserMeterReadings();
      return result;
    },
    ...config,
  });

  return {
    error: query.error,
    queryResult: query.data,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
};

export const useGetMeterReadings = (
  config?: UseQueryOptions<MeterReadings[]>
) => {
  const query = useQuery({
    queryKey: ["MeterReadings"],
    queryFn: async () => {
      const result = await getMeterReadings();
      return result;
    },
    ...config,
  });

  return {
    error: query.error,
    queryResult: query.data,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
};
