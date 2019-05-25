// to use enable chrome://flags/#enable-generic-sensor-extra-classes 
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