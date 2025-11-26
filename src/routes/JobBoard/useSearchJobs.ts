import { useMemo, useState } from "react";
import { useSearchJobsQuery } from "./queries.generated";

const useSearchJobs = () => {
  const [search, setSearch] = useState("");

  const { data, previousData, loading } = useSearchJobsQuery({
    variables: {
      input: {query: search}
    },
    notifyOnNetworkStatusChange: true
  })

  const results = useMemo(() => {
    return data?.searchJobs || previousData?.searchJobs || []
  }, [data?.searchJobs, previousData?.searchJobs])

  return { search, setSearch, results, isLoading: loading };
};

export default useSearchJobs;
