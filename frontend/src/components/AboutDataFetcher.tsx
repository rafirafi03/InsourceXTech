import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetAboutCompanyQuery } from "../store/slices/apiSlices";
import { setAboutData, setLoading } from "../store/slices/aboutSlices";
import { AppDispatch } from "../store/store";
import { USE_STATIC_CONTENT } from "../constants";
import { staticAbout } from "../data/staticData";

const AboutDataFetcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useGetAboutCompanyQuery(undefined, { skip: USE_STATIC_CONTENT });
  const data = USE_STATIC_CONTENT ? staticAbout : query.data;
  const isLoading = USE_STATIC_CONTENT ? false : query.isLoading;

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (data) {
      dispatch(setAboutData(data));
    }
  }, [data, isLoading, dispatch]);

  return null; // This component doesn't render anything, just fetches data
};

export default AboutDataFetcher;
