import { useState, useEffect } from "react";

import { Grid, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { InfoBox, Select, Table } from "./components";
// import useAxios from "./utils/useAxios";
import people from "./utils/people.json";
import planets from "./utils/planets.json";

import "./App.css";

const fauxStateAPIWasDown = {
  people,
  planets,
};

function App() {
  const [peopleOrPlanets, setPeopleOrPlanets] = useState("people");
  // @ts-ignore
  const [results, setResults] = useState(fauxStateAPIWasDown[peopleOrPlanets]);
  const [object, setObject] = useState(people[0]);

  // API was broken at time of submission
  // const { fetchData } = useAxios();

  useEffect(() => {
    // fetchData(
    //   {
    //     method: "GET",
    //     url: `${peopleOrPlanets}`,
    //     headers: {
    //       accept: "*/*",
    //     },
    //   },
    //   (data) => {
    //     setResults(data.results);
    //   }
    // );

    // @ts-ignore
    setResults(fauxStateAPIWasDown[peopleOrPlanets]);

    return () => {};
  }, [peopleOrPlanets]);

  return (
    <div className="App">
      <Typography variant="h3" sx={{ textAlign: "left", marginBottom: "20px" }}>
        Star Wars API
      </Typography>
      <Grid container spacing={2}>
        <Grid item container xs={12}>
          <Grid item xs={4}>
            <Select
              label="People or Planets"
              value={peopleOrPlanets}
              options={[
                { label: "People", value: "people" },
                { label: "Planets", value: "planets" },
              ]}
              callBack={(event: SelectChangeEvent) => {
                setPeopleOrPlanets(event.target.value as string);
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Table
            rows={results}
            callBack={(selectionName: string) => {
              const current = results.find(({ name }: { name: string }) => {
                return name === selectionName;
              });
              setObject(current || people[0]);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoBox info={object} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
