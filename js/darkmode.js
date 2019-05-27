// to use enable chrome://flags/#enable-generic-sensor-extra-classes 
let darkmode = false;
if ("AmbientLightSensor" in window) {
    try {
        var sensor = new AmbientLightSensor();
        sensor.addEventListener("reading", function (event) {
            update(sensor.illuminance);
        });
        sensor.start();
    } catch (e) {
        console.error(e);
    }
}

const update = lux => {
    if(lux < 40 ^ darkmode) {
        darkmode = !darkmode;
        if(darkmode) {
            document.documentElement.classList.add("darkmode");
        } else {
            document.documentElement.classList.remove("darkmode");
        }
    }
}