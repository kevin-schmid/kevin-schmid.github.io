// to use enable chrome://flags/#enable-generic-sensor-extra-classes 
let darkmode = false;
if ("AmbientLightSensor" in window) {
    try {
        var sensor = new AmbientLightSensor();
        sensor.addEventListener("reading", function (event) {
            if(lux < 40 ^ darkmode) {
                darkmode = !darkmode;
                switchMode(darkmode);
            }
        });
        sensor.start();
    } catch (e) {
        console.error(e);
    }
} else {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        switchMode(e.matches);
    });
}

const switchMode = darkmode => {
    if(darkmode) {
        document.documentElement.classList.add("darkmode");
    } else {
        document.documentElement.classList.remove("darkmode");
    }
}

switchMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);