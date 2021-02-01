let clock = $("#time");
let clock_2 = $("#lapTime");
let startBtn = $("#start");
let stopBtn = $("#stop-resume");
let lapBtn = $("#lap-reset");
let lapTable = $(".lap-table");
let watch;
let calcLaps = false;

let mins = 0;
let secs = 0;
let centsecs = 0;
var mins_2 = 0;
var secs_2 = 0;
var centsecs_2 = 0;
let lapNum = 1;

startBtn.on("click", () => {
    startStopWatch();
    startBtn.hide();
    stopBtn.show();
    lapBtn.show();
});

stopBtn.on("click", () => {
    if (stopBtn.text() === "Stop") {
        stopStopWatch();
    } else if (stopBtn.text() === "Resume") {
        startStopWatch();
    }

    changeStopLapBtns();
});

lapBtn.on("click", () => {
    if (lapBtn.text() === "Lap") {
        if ($(".table-heading").is(":empty")) {
            loadLapTableHeadings();
            clock_2.show();
        }
        loadLapRows(lapNum);
        calcLaps = true;
        resetLapTime();
        lapNum++;
    } else if (lapBtn.text() === "Reset") {
        resetStopWatch();
        stopBtn.hide();
        lapBtn.hide();
        changeStopLapBtns();
        startBtn.show();
        calcLaps = false;
    }
});

// Functions

function formatTime(mins_ar, secs_ar, centsecs_ar) {
    let time;
    let cs = centsecs_ar;
    let s = secs_ar;
    let m = mins_ar;

    if (cs < 10) {
        cs = "0" + centsecs_ar;
    }

    if (s < 10) {
        s = "0" + secs_ar;
    }

    if (m < 10) {
        m = "0" + mins_ar;
    }

    time = m + " : " + s + " . " + cs;

    return time;
}

function getCurrentTime() {
    return formatTime(mins, secs, centsecs);
}

function getCurrentLapTime() {
    return formatTime(mins_2, secs_2, centsecs_2);
}

function showCurrentTime() {
    clock.text(getCurrentTime());
}

function showCurrentLapTime() {
    clock_2.text(getCurrentLapTime());
}

function startStopWatch() {
    watch = setInterval(() => {
        centsecs++;

        if (centsecs === 99) {
            centsecs = 0;
            secs++;
        }

        if (secs === 60) {
            secs = 0;
            mins++;
        }

        if (calcLaps) {
            centsecs_2++;

            if (centsecs_2 === 99) {
                centsecs_2 = 0;
                secs_2++;
            }

            if (secs_2 === 60) {
                secs_2 = 0;
                mins_2++;
            }
        }

        showCurrentTime();
        showCurrentLapTime();
    }, 10);
}

function resetStopWatch() {
    clearInterval(watch);
    clock.text("00 : 00 . 00");
    clearLapTable();
    mins = 0;
    secs = 0;
    centsecs = 0;
    mins_2 = 0;
    secs_2 = 0;
    centsecs_2 = 0;
    lapNum = 1;
}

function stopStopWatch() {
    clearInterval(watch);
}

function resetLapTime() {
    mins_2 = 0;
    secs_2 = 0;
    centsecs_2 = 0;
}

function changeStopLapBtns() {
    if (stopBtn.text() === "Stop" && lapBtn.text() === "Lap") {
        stopBtn.text("Resume");
        stopBtn.removeClass("btn-danger");
        stopBtn.addClass("btn-primary");
        lapBtn.text("Reset");
    } else if (stopBtn.text() === "Resume" && lapBtn.text() === "Reset") {
        stopBtn.text("Stop");
        stopBtn.removeClass("btn-primary");
        stopBtn.addClass("btn-danger");
        lapBtn.text("Lap");
    }
}

function loadLapTableHeadings() {
    lapTable.show();
    $(".table-heading").append('<div class="col">Lap</div>');
    $(".table-heading").append('<div class="col">Lap times</div>');
    $(".table-heading").append('<div class="col">Overall time</div>');
    $(".table-heading").append('<div class="underline"></div>');
}

function loadLapRows(lapNum) {
    $(".table").prepend('<div class="row table-row"></div>');
    $(".table-row")
        .first()
        .append('<div class="col">' + lapNum + "</div>");
    if (!calcLaps) {
        $(".table-row")
            .first()
            .append('<div class="col">' + getCurrentTime() + "</div>");
    } else {
        $(".table-row")
            .first()
            .append('<div class="col">' + getCurrentLapTime() + "</div>");
    }

    $(".table-row")
        .first()
        .append('<div class="col">' + getCurrentTime() + "</div>");
}

function clearLapTable() {
    lapTable.hide();
    clock_2.hide();
    clock_2.text("00 : 00 . 00");
    resetLapTime();
    $(".table").html("");
    $(".table-heading").html("");
}
