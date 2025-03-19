import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetAboutCompanyQuery } from "../store/slices/apiSlices";
import { setAboutData, setLoading } from "../store/slices/aboutSlices";
import { AppDispatch } from "../store/store";

const AboutDataFetcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useGetAboutCompanyQuery(undefined);

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (data) {
        console.log("aoububobudataat", data)
      dispatch(setAboutData(data));
    }
  }, [data, isLoading, dispatch]);

  return null; // This component doesn't render anything, just fetches data
};

export default AboutDataFetcher;
