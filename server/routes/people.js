const axios = require("axios");
var express = require("express");
var router = express.Router();


router.get("/people/:sortBy", async function (req, res, next) {
  let people = [];

  const URL = "https://swapi.dev/api/people/";

  people = await axios
    .get(URL)
    .then((response) => {
      return JSON.stringify(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });

  people = JSON.parse(people);

  let sortByParam = req.params.sortBy;

  if (sortByParam === "name") {
    people.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }

  if (sortByParam === "height") {
    people.sort((a, b) => {
      return a.height - b.height;
    });
  }

  if (sortByParam === "mass") {
    people.sort((a, b) => {
      return a.mass - b.mass;
    });
  }

  if (
    sortByParam.length &&
    sortByParam !== "name" &&
    sortByParam !== "height" &&
    sortByParam !== "mass"
  ) {
    console.log("sortyBy param is invalid ");
  }

  res.send("people " + JSON.stringify(people));
});

module.exports = router;

// [
//  {
//   "birth_year": "19 BBY",
//   "eye_color": "Blue",
//   "films": [
//       "https://swapi.dev/api/films/1/",
//       ...
//   ],
//   "gender": "Male",
//   "hair_color": "Blond",
//   "height": "172",
//   "homeworld": "https://swapi.dev/api/planets/1/",
//   "mass": "77",
//   "name": "Luke Skywalker",
//   "skin_color": "Fair",
//   "created": "2014-12-09T13:50:51.644000Z",
//   "edited": "2014-12-10T13:52:43.172000Z",
//   "species": [
//       "https://swapi.dev/api/species/1/"
//   ],
//   "starships": [
//       "https://swapi.dev/api/starships/12/",
//       ...
//   ],
//   "url": "https://swapi.dev/api/people/1/",
//   "vehicles": [
//       "https://swapi.dev/api/vehicles/14/"
//       ...
//   ]
//  }
// ]
