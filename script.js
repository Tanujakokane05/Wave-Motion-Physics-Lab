/* =========================================================
   🌊 WAVE MOTION PHYSICS LAB
   PART 1 — MAIN WAVE SIMULATION
========================================================= */

const frequencySlider = document.getElementById("frequencySlider");
const wavelengthSlider = document.getElementById("wavelengthSlider");
const amplitudeSlider = document.getElementById("amplitudeSlider");

if (frequencySlider && wavelengthSlider && amplitudeSlider) {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const frequencyValue = document.getElementById("frequencyValue");
    const wavelengthValue = document.getElementById("wavelengthValue");
    const amplitudeValue = document.getElementById("amplitudeValue");
    const speedValue = document.getElementById("speedValue");

    const frequencyStat = document.getElementById("frequencyStat");
    const wavelengthStat = document.getElementById("wavelengthStat");
    const amplitudeStat = document.getElementById("amplitudeStat");
    const speedStat = document.getElementById("speedStat");

    const periodValue = document.getElementById("periodValue");
    const waveCalculation = document.getElementById("waveCalculation");
    const observation = document.getElementById("waveObservation");

    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetWaveBtn");

    const canvas = document.getElementById("waveCanvas");

    let ctx = null;

    if (canvas) {
        ctx = canvas.getContext("2d");
    }

    let running = true;
    let time = 0;
    let animationFrame = null;


    /* =====================================================
       GET CURRENT VALUES
    ===================================================== */

    function getValues() {

        const frequency = Number(frequencySlider.value);
        const wavelength = Number(wavelengthSlider.value);
        const amplitude = Number(amplitudeSlider.value);

        const speed = frequency * wavelength;
        const period = 1 / frequency;

        return {
            frequency,
            wavelength,
            amplitude,
            speed,
            period
        };
    }


    /* =====================================================
       UPDATE TEXT VALUES
    ===================================================== */

    function updateValues() {

        const values = getValues();

        if (frequencyValue) {
            frequencyValue.textContent =
                values.frequency + " Hz";
        }

        if (wavelengthValue) {
            wavelengthValue.textContent =
                values.wavelength + " m";
        }

        if (amplitudeValue) {
            amplitudeValue.textContent =
                values.amplitude + " m";
        }

        if (speedValue) {
            speedValue.textContent =
                values.speed.toFixed(2) + " m/s";
        }


        if (frequencyStat) {
            frequencyStat.textContent =
                values.frequency + " Hz";
        }

        if (wavelengthStat) {
            wavelengthStat.textContent =
                values.wavelength + " m";
        }

        if (amplitudeStat) {
            amplitudeStat.textContent =
                values.amplitude + " m";
        }

        if (speedStat) {
            speedStat.textContent =
                values.speed.toFixed(2) + " m/s";
        }


        if (periodValue) {
            periodValue.textContent =
                values.period.toFixed(2) + " s";
        }


        if (waveCalculation) {

            waveCalculation.textContent =
                `v = ${values.frequency} × ${values.wavelength} = ${values.speed.toFixed(2)} m/s`;
        }


        /* -------------------------------------------------
           OBSERVATION MESSAGE
        ------------------------------------------------- */

        if (observation) {

            if (values.frequency >= 7) {

                observation.textContent =
                    "High frequency means more oscillations occur every second.";

            }

            else if (values.wavelength >= 4) {

                observation.textContent =
                    "A larger wavelength means a larger distance between consecutive crests.";

            }

            else if (values.amplitude >= 1.6) {

                observation.textContent =
                    "A larger amplitude makes the wave taller but does not directly change wave speed.";

            }

            else {

                observation.textContent =
                    "Try changing one property at a time and observe what happens.";
            }
        }
    }


    /* =====================================================
       RESIZE MAIN CANVAS
    ===================================================== */

    function resizeCanvas() {

        if (!canvas || !ctx) {
            return;
        }

        const rect = canvas.getBoundingClientRect();

        const width = Math.max(rect.width, 700);
        const height = Math.max(rect.height, 380);

        canvas.width = width;
        canvas.height = height;

        canvas.style.width = "100%";
        canvas.style.height = "100%";
    }


    /* =====================================================
       DRAW MAIN WAVE
    ===================================================== */

    function drawWave() {

        if (!canvas || !ctx) {
            return;
        }

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);


        /* -------------------------------------------------
           BACKGROUND
        ------------------------------------------------- */

        ctx.fillStyle = "#071426";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        const values = getValues();

        const center = height / 2;


        /* -------------------------------------------------
           AMPLITUDE
        ------------------------------------------------- */

        const amplitude =
            Math.min(
                height * 0.30,
                Math.max(
                    35,
                    values.amplitude * 65
                )
            );


        /* -------------------------------------------------
           WAVELENGTH
        ------------------------------------------------- */

        const wavelength =
            Math.min(
                400,
                Math.max(
                    100,
                    values.wavelength * 60
                )
            );


        /* =================================================
           GRID
        ================================================= */

        ctx.strokeStyle =
            "rgba(80,180,230,0.12)";

        ctx.lineWidth = 1;

        for (
            let x = 0;
            x <= width;
            x += 40
        ) {

            ctx.beginPath();

            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);

            ctx.stroke();
        }


        for (
            let y = 0;
            y <= height;
            y += 40
        ) {

            ctx.beginPath();

            ctx.moveTo(0, y);
            ctx.lineTo(width, y);

            ctx.stroke();
        }


        /* =================================================
           MEAN POSITION
        ================================================= */

        ctx.beginPath();

        ctx.setLineDash([
            8,
            8
        ]);

        ctx.strokeStyle =
            "rgba(255,255,255,0.35)";

        ctx.lineWidth = 2;

        ctx.moveTo(
            0,
            center
        );

        ctx.lineTo(
            width,
            center
        );

        ctx.stroke();

        ctx.setLineDash([]);


        ctx.fillStyle = "#cbd5e1";

        ctx.font =
            "14px Arial";

        ctx.fillText(
            "Mean Position",
            20,
            center - 12
        );


        /* =================================================
           WAVE
        ================================================= */

        ctx.beginPath();

        for (
            let x = 0;
            x <= width;
            x += 2
        ) {

            const y =
                center -
                amplitude *
                Math.sin(
                    (2 * Math.PI * x) /
                    wavelength -
                    time
                );

            if (x === 0) {

                ctx.moveTo(
                    x,
                    y
                );

            }

            else {

                ctx.lineTo(
                    x,
                    y
                );
            }
        }


        /* Glow effect */

        ctx.shadowBlur = 18;

        ctx.shadowColor =
            "#22d3ee";

        ctx.strokeStyle =
            "#22d3ee";

        ctx.lineWidth = 5;

        ctx.stroke();

        ctx.shadowBlur = 0;


        /* =================================================
           CREST
        ================================================= */

        const crestX =
            wavelength / 4;

        const crestY =
            center - amplitude;


        ctx.beginPath();

        ctx.arc(
            crestX,
            crestY,
            8,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#facc15";

        ctx.fill();


        ctx.font =
            "bold 15px Arial";

        ctx.fillText(
            "CREST",
            crestX - 25,
            crestY - 18
        );


        /* =================================================
           TROUGH
        ================================================= */

        const troughX =
            (3 * wavelength) / 4;

        const troughY =
            center + amplitude;


        ctx.beginPath();

        ctx.arc(
            troughX,
            troughY,
            8,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#fb7185";

        ctx.fill();


        ctx.font =
            "bold 15px Arial";

        ctx.fillText(
            "TROUGH",
            troughX - 30,
            troughY + 28
        );


        /* =================================================
           AMPLITUDE ARROW
        ================================================= */

        const ax = 70;

        ctx.beginPath();

        ctx.strokeStyle =
            "#c084fc";

        ctx.lineWidth = 3;

        ctx.moveTo(
            ax,
            center
        );

        ctx.lineTo(
            ax,
            crestY
        );


        /* Arrow head */

        ctx.moveTo(
            ax - 7,
            crestY + 10
        );

        ctx.lineTo(
            ax,
            crestY
        );

        ctx.lineTo(
            ax + 7,
            crestY + 10
        );

        ctx.stroke();


        ctx.fillStyle =
            "#c084fc";

        ctx.font =
            "bold 14px Arial";

        ctx.fillText(
            "Amplitude",
            ax + 12,
            (center + crestY) / 2
        );


        /* =================================================
           WAVELENGTH ARROW
        ================================================= */

        const wy =
            height - 45;

        const start =
            crestX;

        const end =
            crestX + wavelength;


        if (end < width - 20) {

            ctx.beginPath();

            ctx.strokeStyle =
                "#34d399";

            ctx.lineWidth = 3;


            /* Main line */

            ctx.moveTo(
                start,
                wy
            );

            ctx.lineTo(
                end,
                wy
            );


            /* Left arrow */

            ctx.moveTo(
                start + 10,
                wy - 7
            );

            ctx.lineTo(
                start,
                wy
            );

            ctx.lineTo(
                start + 10,
                wy + 7
            );


            /* Right arrow */

            ctx.moveTo(
                end - 10,
                wy - 7
            );

            ctx.lineTo(
                end,
                wy
            );

            ctx.lineTo(
                end - 10,
                wy + 7
            );

            ctx.stroke();


            ctx.fillStyle =
                "#34d399";

            ctx.font =
                "bold 14px Arial";

            ctx.fillText(
                "Wavelength λ = " +
                values.wavelength +
                " m",
                start + 10,
                wy - 12
            );
        }


        /* =================================================
           PARTICLES
        ================================================= */

        for (
            let x = 0;
            x <= width;
            x += 35
        ) {

            const y =
                center -
                amplitude *
                Math.sin(
                    (2 * Math.PI * x) /
                    wavelength -
                    time
                );


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                4,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "#ffffff";

            ctx.shadowBlur = 10;

            ctx.shadowColor =
                "#ffffff";

            ctx.fill();

            ctx.shadowBlur = 0;
        }


        /* =================================================
           INFORMATION BOX
        ================================================= */

        const panelW = 230;
        const panelH = 145;

        const panelX =
            width - panelW - 20;

        const panelY = 20;


        ctx.fillStyle =
            "rgba(5,20,38,0.96)";

        ctx.fillRect(
            panelX,
            panelY,
            panelW,
            panelH
        );


        ctx.strokeStyle =
            "#27c7ff";

        ctx.lineWidth = 1;

        ctx.strokeRect(
            panelX,
            panelY,
            panelW,
            panelH
        );


        ctx.fillStyle =
            "#ffffff";

        ctx.font =
            "bold 16px Arial";

        ctx.fillText(
            "WAVE PROFILE",
            panelX + 15,
            panelY + 25
        );


        ctx.font =
            "14px Arial";


        ctx.fillStyle =
            "#27c7ff";

        ctx.fillText(
            "Frequency : " +
            values.frequency +
            " Hz",
            panelX + 15,
            panelY + 52
        );


        ctx.fillStyle =
            "#43e6a1";

        ctx.fillText(
            "Wavelength : " +
            values.wavelength +
            " m",
            panelX + 15,
            panelY + 76
        );


        ctx.fillStyle =
            "#c084fc";

        ctx.fillText(
            "Amplitude : " +
            values.amplitude +
            " m",
            panelX + 15,
            panelY + 100
        );


        ctx.fillStyle =
            "#facc15";

        ctx.fillText(
            "Speed : " +
            values.speed.toFixed(2) +
            " m/s",
            panelX + 15,
            panelY + 124
        );


        /* =================================================
           DISTANCE LABEL
        ================================================= */

        ctx.fillStyle =
            "rgba(255,255,255,0.7)";

        ctx.font =
            "13px Arial";

        ctx.fillText(
            "Distance →",
            width - 100,
            height - 12
        );
    }
    /* =========================================================
   PART 2 — WAVE PROFILE GRAPH + ANIMATION + CONTROLS
========================================================= */

/* =====================================================
   WAVE PROFILE GRAPH
   DISPLACEMENT vs DISTANCE
===================================================== */

const graphCanvas =
    document.getElementById("waveGraph");

if (graphCanvas) {

    const graphCtx =
        graphCanvas.getContext("2d");


    function drawWaveGraph() {

        const rect =
            graphCanvas.getBoundingClientRect();

        const width =
            Math.max(rect.width, 600);

        const height =
            Math.max(rect.height, 300);


        graphCanvas.width = width;
        graphCanvas.height = height;


        /* ==============================
           BACKGROUND
        ============================== */

        graphCtx.fillStyle = "#071426";

        graphCtx.fillRect(
            0,
            0,
            width,
            height
        );


        const values =
            getValues();


        /* ==============================
           GRAPH AREA
        ============================== */

        const left =
            65;

        const right =
            width - 30;

        const top =
            35;

        const bottom =
            height - 55;


        const graphWidth =
            right - left;

        const graphHeight =
            bottom - top;


        const center =
            top + graphHeight / 2;


        /* ==============================
           SCALE
        ============================== */

        const amplitude =
            Math.max(
                30,
                Math.min(
                    graphHeight * 0.40,
                    values.amplitude * 55
                )
            );


        const wavelength =
            Math.max(
                120,
                Math.min(
                    350,
                    values.wavelength * 55
                )
            );


        /* ==============================
           GRID
        ============================== */

        graphCtx.strokeStyle =
            "rgba(80,180,230,0.15)";

        graphCtx.lineWidth = 1;


        for (
            let x = left;
            x <= right;
            x += 40
        ) {

            graphCtx.beginPath();

            graphCtx.moveTo(
                x,
                top
            );

            graphCtx.lineTo(
                x,
                bottom
            );

            graphCtx.stroke();

        }


        for (
            let y = top;
            y <= bottom;
            y += 40
        ) {

            graphCtx.beginPath();

            graphCtx.moveTo(
                left,
                y
            );

            graphCtx.lineTo(
                right,
                y
            );

            graphCtx.stroke();

        }


        /* ==============================
           AXES
        ============================== */

        graphCtx.strokeStyle =
            "rgba(255,255,255,0.65)";

        graphCtx.lineWidth = 2;


        // Y axis

        graphCtx.beginPath();

        graphCtx.moveTo(
            left,
            top
        );

        graphCtx.lineTo(
            left,
            bottom
        );

        graphCtx.stroke();


        // X axis

        graphCtx.beginPath();

        graphCtx.moveTo(
            left,
            center
        );

        graphCtx.lineTo(
            right,
            center
        );

        graphCtx.stroke();


        /* ==============================
           AXIS LABELS
        ============================== */

        graphCtx.fillStyle =
            "#cbd5e1";

        graphCtx.font =
            "13px Arial";


        graphCtx.fillText(
            "Displacement (m)",
            10,
            top + 5
        );


        graphCtx.fillText(
            "Distance (m)",
            right - 80,
            bottom + 35
        );


        graphCtx.fillText(
            "0",
            left - 15,
            center + 5
        );


        /* ==============================
           MEAN POSITION
        ============================== */

        graphCtx.setLineDash([
            7,
            7
        ]);

        graphCtx.strokeStyle =
            "rgba(255,255,255,0.45)";

        graphCtx.beginPath();

        graphCtx.moveTo(
            left,
            center
        );

        graphCtx.lineTo(
            right,
            center
        );

        graphCtx.stroke();

        graphCtx.setLineDash([]);


        graphCtx.fillStyle =
            "#cbd5e1";

        graphCtx.fillText(
            "Mean Position",
            left + 10,
            center - 10
        );


        /* ==============================
           WAVE PROFILE
        ============================== */

        graphCtx.beginPath();


        for (
            let x = left;
            x <= right;
            x += 2
        ) {

            const distance =
                x - left;


            const y =
                center -
                amplitude *
                Math.sin(
                    (2 * Math.PI * distance) /
                    wavelength
                );


            if (
                x === left
            ) {

                graphCtx.moveTo(
                    x,
                    y
                );

            } else {

                graphCtx.lineTo(
                    x,
                    y
                );

            }

        }


        graphCtx.shadowBlur =
            15;

        graphCtx.shadowColor =
            "#22d3ee";

        graphCtx.strokeStyle =
            "#22d3ee";

        graphCtx.lineWidth =
            4;

        graphCtx.stroke();

        graphCtx.shadowBlur = 0;


        /* ==============================
           CREST
        ============================== */

        const crestX =
            left +
            wavelength / 4;


        const crestY =
            center -
            amplitude;


        graphCtx.beginPath();

        graphCtx.arc(
            crestX,
            crestY,
            7,
            0,
            Math.PI * 2
        );

        graphCtx.fillStyle =
            "#facc15";

        graphCtx.fill();


        graphCtx.fillStyle =
            "#facc15";

        graphCtx.font =
            "bold 14px Arial";

        graphCtx.fillText(
            "CREST",
            crestX - 25,
            crestY - 15
        );


        /* ==============================
           TROUGH
        ============================== */

        const troughX =
            left +
            (3 * wavelength) / 4;


        const troughY =
            center +
            amplitude;


        graphCtx.beginPath();

        graphCtx.arc(
            troughX,
            troughY,
            7,
            0,
            Math.PI * 2
        );

        graphCtx.fillStyle =
            "#fb7185";

        graphCtx.fill();


        graphCtx.fillStyle =
            "#fb7185";

        graphCtx.fillText(
            "TROUGH",
            troughX - 28,
            troughY + 25
        );


        /* ==============================
           AMPLITUDE MEASUREMENT
        ============================== */

        const ax =
            left + 35;


        graphCtx.strokeStyle =
            "#c084fc";

        graphCtx.lineWidth =
            3;


        graphCtx.beginPath();

        graphCtx.moveTo(
            ax,
            center
        );

        graphCtx.lineTo(
            ax,
            crestY
        );

        graphCtx.stroke();


        // Arrow top

        graphCtx.beginPath();

        graphCtx.moveTo(
            ax - 6,
            crestY + 10
        );

        graphCtx.lineTo(
            ax,
            crestY
        );

        graphCtx.lineTo(
            ax + 6,
            crestY + 10
        );

        graphCtx.stroke();


        graphCtx.fillStyle =
            "#c084fc";

        graphCtx.font =
            "bold 13px Arial";

        graphCtx.fillText(
            "A = " +
            values.amplitude +
            " m",
            ax + 8,
            (center + crestY) / 2
        );


        /* ==============================
           WAVELENGTH MEASUREMENT
        ============================== */

        const wy =
            bottom - 20;


        const startX =
            left +
            wavelength / 4;


        const endX =
            startX +
            wavelength;


        if (
            endX <= right
        ) {

            graphCtx.strokeStyle =
                "#34d399";

            graphCtx.lineWidth =
                3;


            graphCtx.beginPath();

            graphCtx.moveTo(
                startX,
                wy
            );

            graphCtx.lineTo(
                endX,
                wy
            );

            graphCtx.stroke();


            // Left arrow

            graphCtx.beginPath();

            graphCtx.moveTo(
                startX + 9,
                wy - 6
            );

            graphCtx.lineTo(
                startX,
                wy
            );

            graphCtx.lineTo(
                startX + 9,
                wy + 6
            );

            graphCtx.stroke();


            // Right arrow

            graphCtx.beginPath();

            graphCtx.moveTo(
                endX - 9,
                wy - 6
            );

            graphCtx.lineTo(
                endX,
                wy
            );

            graphCtx.lineTo(
                endX - 9,
                wy + 6
            );

            graphCtx.stroke();


            graphCtx.fillStyle =
                "#34d399";

            graphCtx.font =
                "bold 13px Arial";


            graphCtx.fillText(
                "λ = " +
                values.wavelength +
                " m",
                startX + 15,
                wy - 8
            );

        }


        /* ==============================
           TITLE
        ============================== */

        graphCtx.fillStyle =
            "#ffffff";

        graphCtx.font =
            "bold 16px Arial";

        graphCtx.fillText(
            "Displacement vs Distance",
            left + 10,
            top - 12
        );


        /* ==============================
           CURRENT VALUES
        ============================== */

        graphCtx.fillStyle =
            "#27c7ff";

        graphCtx.font =
            "13px Arial";


        graphCtx.fillText(
            "Frequency: " +
            values.frequency +
            " Hz",
            right - 190,
            top - 12
        );

    }

}


/* =========================================================
   ANIMATION
========================================================= */

function animateWave() {

    if (running) {

        const values =
            getValues();


        /*
           Frequency controls
           how quickly the wave moves.
        */

        time +=
            values.frequency *
            0.015;
    }


    drawWave();

    drawWaveGraph();


    animationFrame =
        requestAnimationFrame(
            animateWave
        );
}


/* =========================================================
   SLIDER EVENTS
========================================================= */

frequencySlider.addEventListener(
    "input",
    function () {

        updateValues();
        drawWave();
        drawWaveGraph();

    }
);


wavelengthSlider.addEventListener(
    "input",
    function () {

        updateValues();
        drawWave();
        drawWaveGraph();

    }
);


amplitudeSlider.addEventListener(
    "input",
    function () {

        updateValues();
        drawWave();
        drawWaveGraph();

    }
);


/* =========================================================
   PLAY BUTTON
========================================================= */

if (playBtn) {

    playBtn.addEventListener(
        "click",
        function () {

            running = true;

        }
    );
}


/* =========================================================
   PAUSE BUTTON
========================================================= */

if (pauseBtn) {

    pauseBtn.addEventListener(
        "click",
        function () {

            running = false;

        }
    );
}


/* =========================================================
   RESET BUTTON
========================================================= */

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        function () {

            frequencySlider.value = 2;

            wavelengthSlider.value = 2;

            amplitudeSlider.value = 1;

            time = 0;

            running = true;

            updateValues();

            resizeCanvas();

            drawWave();

            drawWaveGraph();

        }
    );
}


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        resizeCanvas();

        drawWave();

        drawWaveGraph();

    }
);


/* =========================================================
   INITIALIZE SIMULATION
========================================================= */

resizeCanvas();

updateValues();

drawWave();

drawWaveGraph();

animateWave();
/* =========================================================
   PART 3 — WAVE CHALLENGES
========================================================= */

const challengeQuestion =
    document.getElementById(
        "challengeQuestion"
    );


if (challengeQuestion) {


    /* =====================================================
       CHALLENGE DATA
    ===================================================== */

    const challenges = [

        {
            title: "Challenge 1",

            question:
                "A wave has a frequency of 5 Hz and wavelength of 2 m. What is its speed?",

            options: [
                "2.5 m/s",
                "7 m/s",
                "10 m/s"
            ],

            answer: 2
        },


        {
            title: "Challenge 2",

            question:
                "What happens to wavelength if frequency increases while wave speed remains constant?",

            options: [
                "Wavelength increases",
                "Wavelength decreases",
                "Wavelength remains unchanged"
            ],

            answer: 1
        },


        {
            title: "Challenge 3",

            question:
                "Which quantity represents maximum displacement from the mean position?",

            options: [
                "Frequency",
                "Amplitude",
                "Wavelength"
            ],

            answer: 1
        },


        {
            title: "Challenge 4",

            question:
                "A wave has frequency 10 Hz. What is its time period?",

            options: [
                "0.1 s",
                "10 s",
                "100 s"
            ],

            answer: 0
        },


        {
            title: "Challenge 5",

            question:
                "Which equation represents the basic wave relation?",

            options: [
                "F = ma",
                "V = IR",
                "v = fλ"
            ],

            answer: 2
        }

    ];


    let currentChallenge = 0;

    let challengeScore = 0;


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const title =
        document.getElementById(
            "challengeTitle"
        );


    const options =
        document.getElementById(
            "challengeOptions"
        );


    const feedback =
        document.getElementById(
            "challengeFeedback"
        );


    const next =
        document.getElementById(
            "nextChallenge"
        );


    const scoreElement =
        document.getElementById(
            "challengeScore"
        );


    const number =
        document.getElementById(
            "challengeNumber"
        );


    const progress =
        document.getElementById(
            "challengeProgress"
        );


    /* =====================================================
       LOAD CHALLENGE
    ===================================================== */

    function loadChallenge() {

        const challenge =
            challenges[currentChallenge];


        if (title) {

            title.textContent =
                challenge.title;
        }


        challengeQuestion.textContent =
            challenge.question;


        if (number) {

            number.textContent =
                `Challenge ${currentChallenge + 1} of ${challenges.length}`;
        }


        if (progress) {

            progress.style.width =
                (
                    (
                        currentChallenge + 1
                    ) /
                    challenges.length *
                    100
                ) + "%";
        }


        options.innerHTML = "";


        if (feedback) {

            feedback.textContent = "";
        }


        if (next) {

            next.style.display =
                "none";
        }


        challenge.options.forEach(
            function (
                option,
                index
            ) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "option-btn";


                button.textContent =
                    option;


                button.addEventListener(
                    "click",
                    function () {

                        checkChallenge(
                            index,
                            button
                        );

                    }
                );


                options.appendChild(
                    button
                );

            }
        );
    }


    /* =====================================================
       CHECK CHALLENGE ANSWER
    ===================================================== */

    function checkChallenge(
        selected,
        selectedButton
    ) {

        const challenge =
            challenges[currentChallenge];


        const buttons =
            options.querySelectorAll(
                ".option-btn"
            );


        buttons.forEach(
            function (button) {

                button.disabled = true;

            }
        );


        if (
            selected ===
            challenge.answer
        ) {

            selectedButton.classList.add(
                "correct"
            );


            feedback.textContent =
                "✅ Correct! Excellent understanding.";


            feedback.style.color =
                "#43e6a1";


            challengeScore += 10;

        }

        else {

            selectedButton.classList.add(
                "wrong"
            );


            if (
                buttons[challenge.answer]
            ) {

                buttons[
                    challenge.answer
                ].classList.add(
                    "correct"
                );
            }


            feedback.textContent =
                "❌ Not quite. The highlighted answer is correct.";


            feedback.style.color =
                "#ff647c";
        }


        if (scoreElement) {

            scoreElement.textContent =
                challengeScore;
        }


        if (next) {

            next.style.display =
                "inline-flex";
        }
    }


    /* =====================================================
       NEXT CHALLENGE
    ===================================================== */

    if (next) {

        next.addEventListener(
            "click",
            function () {

                currentChallenge++;


                /* -----------------------------------------
                   ALL CHALLENGES COMPLETED
                ----------------------------------------- */

                if (
                    currentChallenge >=
                    challenges.length
                ) {

                    title.textContent =
                        "🏆 Challenges Completed!";


                    challengeQuestion.textContent =
                        `You scored ${challengeScore} out of 50.`;


                    options.innerHTML =
                        "";


                    if (feedback) {

                        if (
                            challengeScore >= 40
                        ) {

                            feedback.textContent =
                                "🌟 Excellent! You understand Wave Motion very well.";

                        }

                        else {

                            feedback.textContent =
                                "📚 Good attempt! Review the Notes and try again.";
                        }


                        feedback.style.color =
                            "#43e6a1";
                    }


                    next.style.display =
                        "none";


                    return;
                }


                loadChallenge();

            }
        );
    }


    /* =====================================================
       START CHALLENGES
    ===================================================== */

    loadChallenge();

}
/* =========================================================
   PART 4 — WAVE MASTERY QUIZ
========================================================= */

const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );


if (quizQuestion) {


    /* =====================================================
       QUIZ QUESTIONS
    ===================================================== */

    const questions = [

        {
            question:
                "What is the SI unit of frequency?",

            options: [
                "Metre",
                "Hertz",
                "Second",
                "Newton"
            ],

            answer: 1
        },


        {
            question:
                "What is the basic relation between wave speed, frequency and wavelength?",

            options: [
                "v = fλ",
                "F = ma",
                "V = IR",
                "P = VI"
            ],

            answer: 0
        },


        {
            question:
                "A wave has frequency 20 Hz. What is its time period?",

            options: [
                "20 s",
                "0.5 s",
                "0.05 s",
                "2 s"
            ],

            answer: 2
        },


        {
            question:
                "What does amplitude represent?",

            options: [
                "Number of waves per second",
                "Maximum displacement",
                "Distance travelled per second",
                "Time for one oscillation"
            ],

            answer: 1
        },


        {
            question:
                "Sound waves are generally classified as:",

            options: [
                "Mechanical waves",
                "Electromagnetic waves",
                "Light waves",
                "Matter waves"
            ],

            answer: 0
        },


        {
            question:
                "If frequency increases while speed remains constant, wavelength will:",

            options: [
                "Increase",
                "Decrease",
                "Become zero",
                "Remain the same"
            ],

            answer: 1
        },


        {
            question:
                "Which is an example of a transverse wave?",

            options: [
                "Sound in air",
                "Light",
                "Sound in water",
                "Compression wave"
            ],

            answer: 1
        }

    ];


    let currentQuestion = 0;

    let quizScore = 0;


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const options =
        document.getElementById(
            "quizOptions"
        );


    const feedback =
        document.getElementById(
            "quizFeedback"
        );


    const next =
        document.getElementById(
            "nextQuestion"
        );


    const questionNumber =
        document.getElementById(
            "questionNumber"
        );


    const quizScoreElement =
        document.getElementById(
            "quizScore"
        );


    const progress =
        document.getElementById(
            "quizProgress"
        );


    /* =====================================================
       LOAD QUESTION
    ===================================================== */

    function loadQuestion() {

        const question =
            questions[currentQuestion];


        quizQuestion.textContent =
            question.question;


        if (questionNumber) {

            questionNumber.textContent =
                `Question ${currentQuestion + 1} of ${questions.length}`;
        }


        if (progress) {

            progress.style.width =
                (
                    (
                        currentQuestion + 1
                    ) /
                    questions.length *
                    100
                ) + "%";
        }


        options.innerHTML = "";


        if (feedback) {

            feedback.textContent = "";
        }


        if (next) {

            next.style.display =
                "none";
        }


        question.options.forEach(
            function (
                option,
                index
            ) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "option-btn";


                button.textContent =
                    option;


                button.addEventListener(
                    "click",
                    function () {

                        checkAnswer(
                            index,
                            button
                        );

                    }
                );


                options.appendChild(
                    button
                );

            }
        );
    }


    /* =====================================================
       CHECK ANSWER
    ===================================================== */

    function checkAnswer(
        selected,
        selectedButton
    ) {

        const question =
            questions[currentQuestion];


        const buttons =
            options.querySelectorAll(
                ".option-btn"
            );


        buttons.forEach(
            function (button) {

                button.disabled = true;

            }
        );


        if (
            selected ===
            question.answer
        ) {

            selectedButton.classList.add(
                "correct"
            );


            feedback.textContent =
                "✅ Correct Answer!";


            feedback.style.color =
                "#43e6a1";


            quizScore++;

        }

        else {

            selectedButton.classList.add(
                "wrong"
            );


            if (
                buttons[question.answer]
            ) {

                buttons[
                    question.answer
                ].classList.add(
                    "correct"
                );
            }


            feedback.textContent =
                "❌ Incorrect. The highlighted answer is correct.";


            feedback.style.color =
                "#ff647c";
        }


        if (quizScoreElement) {

            quizScoreElement.textContent =
                `Score: ${quizScore}`;
        }


        if (next) {

            next.style.display =
                "inline-flex";
        }
    }


    /* =====================================================
       NEXT QUESTION
    ===================================================== */

    if (next) {

        next.addEventListener(
            "click",
            function () {

                currentQuestion++;


                /* -----------------------------------------
                   QUIZ COMPLETED
                ----------------------------------------- */

                if (
                    currentQuestion >=
                    questions.length
                ) {

                    const quizContainer =
                        document.querySelector(
                            ".quiz-container"
                        );


                    if (quizContainer) {

                        quizContainer.style.display =
                            "none";
                    }


                    const result =
                        document.getElementById(
                            "quizResult"
                        );


                    if (result) {

                        result.style.display =
                            "block";
                    }


                    const finalScore =
                        document.getElementById(
                            "finalScore"
                        );


                    if (finalScore) {

                        finalScore.textContent =
                            `${quizScore} / ${questions.length}`;
                    }


                    const message =
                        document.getElementById(
                            "resultMessage"
                        );


                    if (message) {

                        if (
                            quizScore ===
                            questions.length
                        ) {

                            message.textContent =
                                "🌟 Outstanding! You have mastered Wave Motion.";

                        }

                        else if (
                            quizScore >= 4
                        ) {

                            message.textContent =
                                "👏 Great job! Review a few concepts and try again.";

                        }

                        else {

                            message.textContent =
                                "📚 Keep learning! Go through the Notes and Simulation.";
                        }
                    }


                    return;
                }


                loadQuestion();

            }
        );
    }


    /* =====================================================
       START QUIZ
    ===================================================== */

    loadQuestion();

}
}