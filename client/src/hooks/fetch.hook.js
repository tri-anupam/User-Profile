import axios from "axios";
import { useEffect, useState } from "react";
import { REACT_APP_SERVER_DOMAIN } from "../secrets/secret";

axios.defaults.baseURL = REACT_APP_SERVER_DOMAIN;

export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { data, status } = await axios.get(`/api/${query}`);

        if (status === 201) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({ ...prev, apiData: data, status: status }));
        }

        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
  }, [query]);
}

// export default function useFetch(query) {
//   const [getData, setData] = useState({
//     isLoading: false,
//     apiData: undefined,
//     status: null,
//     serverError: null,
//   });

//   useEffect(() => {
//     if (!query) return;

//     const fetchData = async () => {
//       try {
//         setData((prev) => ({ ...prev, isLoading: true }));

//         const { data, status } = await axios.get(`/api/${query}`);

//         if (status === 201) {
//           setData((prev) => ({ ...prev, apiData: data, status: status }));
//         }
//       } catch (error) {
//         setData((prev) => ({ ...prev, serverError: error }));
//       } finally {
//         setData((prev) => ({ ...prev, isLoading: false }));
//       }
//     };

//     fetchData(); // Call fetchData to initiate the data fetching.
//   }, [query]);

//   return getData; // Return the data and loading states for the component to use.
// }
