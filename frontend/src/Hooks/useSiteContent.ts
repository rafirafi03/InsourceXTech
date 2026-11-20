import { useEffect, useState } from "react";
import {
  useGetServicesQuery,
  useGetSolutionsQuery,
  useGetWhyUsQuery,
} from "../store/slices/apiSlices";
import { USE_STATIC_CONTENT } from "../constants";
import { staticServices, staticSolutions, staticWhyUs } from "../data/staticData";
import { IService } from "../types";

export type WhyUsItem = { _id?: string; title: string; description: string };

export function useServices() {
  const query = useGetServicesQuery(undefined, { skip: USE_STATIC_CONTENT });
  const data = USE_STATIC_CONTENT ? staticServices : query.data;
  const list: IService[] = Array.isArray(data?.services) ? data.services : [];
  return { services: list, isLoading: USE_STATIC_CONTENT ? false : query.isLoading };
}

export function useSolutions() {
  const query = useGetSolutionsQuery(undefined, { skip: USE_STATIC_CONTENT });
  const data = USE_STATIC_CONTENT ? staticSolutions : query.data;
  const list = Array.isArray(data?.solutions) ? (data.solutions as IService[]) : [];
  return { solutions: list, isLoading: USE_STATIC_CONTENT ? false : query.isLoading };
}

export function useWhyUs() {
  const query = useGetWhyUsQuery(undefined, { skip: USE_STATIC_CONTENT });
  const data = USE_STATIC_CONTENT ? staticWhyUs : query.data;
  const list: WhyUsItem[] = Array.isArray(data?.whyUs) ? data.whyUs : [];
  return { whyUs: list, isLoading: USE_STATIC_CONTENT ? false : query.isLoading };
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
