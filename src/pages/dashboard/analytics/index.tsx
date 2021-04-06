import React, { useState, useEffect } from "react";

declare global {
  interface Window { gapi: any; }
}

const Analytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const queryReport = () => {
      window.gapi.client
        .request({
          path: "/v4/reports:batchGet",
          root: "https://analyticsreporting.googleapis.com/",
          method: "POST",
          body: {
            reportRequests: [
              {
                viewId: "240449962", //enter your view ID here
                dateRanges: [
                  {
                    startDate: "10daysAgo",
                    endDate: "today",
                  },
                ],
                metrics: [
                  {
                    expression: "ga:sessions",
                  },
                ],
                dimensions: [
                  {
                    name: "ga:date",
                  },
                ],
              },
            ],
          },
        })
        .then(displayResults, console.error.bind(console));
    };

    const displayResults = (response: any) => {//(2)
      console.log('RES: ', response.result.reports[0].data.rows)
      const queryResult = response.result.reports[0].data.rows;
      if (queryResult) {
        const result = queryResult.map((row: any) => {
          const dateSting = row.dimensions[0];
          const formattedDate = `${dateSting.substring(0, 4)}
          -${dateSting.substring(4, 6)}-${dateSting.substring(6, 8)}`;
          return {
            date: formattedDate,
            visits: row.metrics[0].values[0],
          };
        });
        setData(result);
      }
      // console.log(queryResult);
    };

    queryReport();
  }, []);

  return <>{data && data.length ? data.map((row: any) => (
    <div key={row.date}>{row.date} {row.visits} visits</div>
  )) : <h3>Sorry no data available</h3>}</>
};

export default Analytics;