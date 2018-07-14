class AsteroidsTable {
    constructor() {

    }

    fetchAsteroidsData(start_date, end_date) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "https://api.nasa.gov/neo/rest/v1/feed?start_date=" 
                        + start_date + "&end_date=" 
                        + end_date 
                        + "&api_key=x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2");
    
        xhr.send(null);

        let self = this; // Save a reference of "this" keyword for future use

        xhr.onreadystatechange = function () {
            let DONE = 4;
            let OK = 200;
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    let res = JSON.parse(xhr.responseText);
                    let days = Object.keys(res.near_earth_objects); // Collect all the keys/days, so you can access all asteroids by day

                    let hazardousAsteroids = self.fetchHazardousAsteroids.call(self, res, days); // Store only hazardous asteroids
                    
                    // Save the resulting array to local storage for future use
                    localStorage.setItem("hazardousAsteroids", JSON.stringify(hazardousAsteroids));

                    self.createTable.call(self, hazardousAsteroids);
                    self.createAsteroidsList.call(self, hazardousAsteroids);
                } else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.
                }
            }
        };
    }

    fetchHazardousAsteroids(response, days) {
        let results = []; // Store all hazardous asteroids here

        for (let i = 0; i < days.length; i++) {

            let asteroidsOnEachDay = response.near_earth_objects[days[i]]; // Check all asteroids on a given day

            for(let j = 0; j < asteroidsOnEachDay.length; j++) {
                // Look for a asteroid that is hazardous
                if(asteroidsOnEachDay[j].is_potentially_hazardous_asteroid === true) {
                    results.push(asteroidsOnEachDay[j]); // Add hazardous asteroid to a resulting array
                }
            }
        }

        return results;
    }

    createTable(array) {
        let tableBody = document.getElementById("table-body");
    
        // Before creating a table make sure to clear existing data, if any
        tableBody.innerHTML = "";

        // Create a new row for each hazardous asteroid
        for(let i = 0; i < array.length; i++) {

            let tr = document.createElement("tr"); // Create table row

            // Create all table cells and append them to table row, five in total
            let date = document.createElement("td");
            let dateText = document.createTextNode(array[i].close_approach_data["0"].close_approach_date);
            date.appendChild(dateText);
            tr.appendChild(date);

            let name = document.createElement("td");
            let nameText = document.createTextNode(array[i].name);
            name.appendChild(nameText);
            tr.appendChild(name);

            let speed = document.createElement("td");
            let speedText = document.createTextNode(array[i].close_approach_data["0"].relative_velocity.kilometers_per_hour);
            speed.appendChild(speedText);
            tr.appendChild(speed);

            let min = document.createElement("td");
            let minText = document.createTextNode(array[i].estimated_diameter.meters.estimated_diameter_min);
            min.appendChild(minText);
            tr.appendChild(min);

            let max = document.createElement("td");
            let maxText = document.createTextNode(array[i].estimated_diameter.meters.estimated_diameter_min);
            max.appendChild(maxText);
            tr.appendChild(max);

            // Append the whole row to the table
            tableBody.appendChild(tr);

            // Show the preview
            let asteroidSection = document.getElementById("asteroids-preview");
            asteroidSection.style.display = "block";

            // Clear the input field, if there is any data from previous search
            document.getElementById("asteroidList").value = "";
        }
    }

    createAsteroidsList(array) {
        let dropdown = document.getElementById("asteroids");
    
        // Before creating a dropdown make sure to clear existing data, if any
        dropdown.innerHTML = "";

        for(let i = 0; i < array.length; i++) {

            let option = document.createElement("option"); // Create the option tag

            option.setAttribute("value", array[i].name); // Set the value

            // Append all the options to the dropdown
            dropdown.appendChild(option);
        }
    }
}

export default AsteroidsTable;