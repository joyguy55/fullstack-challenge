const axios = require("axios");
var express = require("express");
var router = express.Router();

let planets = [];
const URL = "https://swapi.dev/api/planets/";

router.get("/planets", async (req, res, next) => {
  planets = await axios
    .get(URL)
    .then((response) => {
      return JSON.stringify(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });

  planets = JSON.parse(planets);

  planets = await Promise.all(
    planets.map(async (planet) => {
      let { residents } = planet;

      let requestList = residents.map((URL) => {
        return axios.get(URL);
      });

      residents = await Promise.all(requestList)
        .then((values) => {
          return values.map((value) => value.data.name);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(residents);
      return await { ...planet, residents };
    })
  );

  res.json("planets " + JSON.stringify(planets));
});

module.exports = router;

// [
// 	{
// 		"name": "Alderaan",
// 		"rotation_period": "24",
// 		"orbital_period": "364",
// 		"diameter": "12500",
// 		"climate": "temperate",
// 		"gravity": "1 standard",
// 		"terrain": "grasslands, mountains",
// 		"surface_water": "40",
// 		"population": "2000000000",
// 		"residents": [
// 			"https://swapi.dev/api/people/5/",
// 			"https://swapi.dev/api/people/68/",
// 			"https://swapi.dev/api/people/81/"
// 		],
// 		"films": [
// 			"https://swapi.dev/api/films/6/",
// 			"https://swapi.dev/api/films/1/"
// 		],
// 		"created": "2014-12-10T11:35:48.479000Z",
// 		"edited": "2014-12-20T20:58:18.420000Z",
// 		"url": "https://swapi.dev/api/planets/2/"
// 	},
// 	{
// 		"name": "Yavin IV",
// 		"rotation_period": "24",
// 		...
// 	},
// 	...
// ]

// [
// 	{
// 		"name": "Alderaan",
// 		"rotation_period": "24",
// 		"orbital_period": "364",
// 		"diameter": "12500",
// 		"climate": "temperate",
// 		"gravity": "1 standard",
// 		"terrain": "grasslands, mountains",
// 		"surface_water": "40",
// 		"population": "2000000000",
// 		"residents": [
// 			"Leia Organa",
// 			"Bail Prestor Organa",
// 			"Raymus Antilles"
// 		],
// 		"films": [
// 			"https://swapi.dev/api/films/6/",
// 			"https://swapi.dev/api/films/1/"
// 		],
// 		"created": "2014-12-10T11:35:48.479000Z",
// 		"edited": "2014-12-20T20:58:18.420000Z",
// 		"url": "https://swapi.dev/api/planets/2/"
// 	},
// 	{
// 		"name": "Yavin IV",
// 		"rotation_period": "24",
// 		...
// 	},
// 	...
// ]
