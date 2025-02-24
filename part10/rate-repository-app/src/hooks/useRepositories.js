import { useQuery } from "@apollo/client";
import { FETCH_REPOS } from "../graphql/queries";

const useRepositories = () => {
  const { loading, error, data } = useQuery(FETCH_REPOS, {
    fetchPolicy: "cache-and-network",
    // Other options
  });

  return { data, error, loading };
};

export default useRepositories;
