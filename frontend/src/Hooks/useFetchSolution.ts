import { useState, useEffect } from "react";
import { useGetSolutionsQuery } from "../store/slices/apiSlices"; // Adjust the import as needed
import { IServiceResponse } from "../types";

const useSolutions = () => {
  const [solutionsData, setSolutionsData] = useState<IServiceResponse | null>(null);
  const { data: solutions, isFetching } = useGetSolutionsQuery(undefined, { skip: solutionsData !== null });

  useEffect(() => {
    if (solutions && !solutionsData) {
      setSolutionsData(solutions?.solutions);
    }
  }, [solutions, solutionsData]);

  return { solutionsData, isFetching };
};

export default useSolutions;
