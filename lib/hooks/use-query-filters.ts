// import React from "react";
// import { Filters } from "./use-filters";

// import { useRouter } from "next/navigation";

// export const useQueryFilters = (filters: Filters) => {
//   const router = useRouter();

//   React.useEffect(() => {
//     const params = {
//       ...filters.prices,
//       languages: Array.from(filters.languages),
//       categories: Array.from(filters.categories),
//       sort: filters.sort,
//     };

//     const query = qs.stringify(params, {
//       arrayFormat: "comma",
//       skipNulls: true,
//     });

//     router.push(`?${query}`, {
//       scroll: false,
//     });
//   }, [filters]);
// };
