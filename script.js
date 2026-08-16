/* =====================================================
   WAVE MOTION PHYSICS LAB
===================================================== */


/* =====================================================
   WAVE SIMULATION
===================================================== */

const frequencySlider =
    document.getElementById("frequencySlider");

const wavelengthSlider =
    document.getElementById("wavelengthSlider");

const amplitudeSlider =
    document.getElementById("amplitudeSlider");


if (
    frequencySlider &&
    wavelengthSlider &&
    amplitudeSlider
) {

    const frequencyValue =
        document.getElementById("frequencyValue");

    const wavelengthValue =
        document.getElementById("wavelengthValue");

    const amplitudeValue =
        document.getElementById("amplitudeValue");

    const speedValue =
        document.getElementById("speedValue");

    const frequencyStat =
        document.getElementById("frequencyStat");

    const wavelengthStat =
        document.getElementById("wavelengthStat");

    const amplitudeStat =
        document.getElementById("amplitudeStat");

    const speedStat =
        document.getElementById("speedStat");

    const periodValue =
        document.getElementById("periodValue");

    const waveCalculation =
        document.getElementById("waveCalculation");

    const observation =
        document.getElementById("waveObservation");

    const playBtn =
        document.getElementById("playBtn");

    const pauseBtn =
        document.getElementById("pauseBtn");

    const resetBtn =
        document.getElementById("resetWaveBtn");

    const canvas =
        document.getElementById("waveCanvas");

    const graphCanvas =
        document.getElementById("waveGraph");


    const ctx =
        canvas ? canvas.getContext("2d") : null;

    const graphCtx =
        graphCanvas
            ? graphCanvas.getContext("2d")
            : null;


    let running = true;

    let time = 0;


    /* =================================================
       GET VALUES
    ================================================= */

    function getValues() {

        const frequency =
            Number(frequencySlider.value);

        const wavelength =
            Number(wavelengthSlider.value);

        const amplitude =
            Number(amplitudeSlider.value);

        const speed =
            frequency * wavelength;

        const period =
            1 / frequency;


        return {
            frequency,
            wavelength,
            amplitude,
            speed,
            period
        };
    }


    /* =================================================
       UPDATE VALUES
    ================================================= */

    function updateValues() {

        const values =
            getValues();


        if (frequencyValue)
            frequencyValue.textContent =
                values.frequency + " Hz";


        if (wavelengthValue)
            wavelengthValue.textContent =
                values.wavelength + " m";


        if (amplitudeValue)
            amplitudeValue.textContent =
                values.amplitude + " m";


        if (speedValue)
            speedValue.textContent =
                values.speed.toFixed(2) + " m/s";


        if (frequencyStat)
            frequencyStat.textContent =
                values.frequency + " Hz";


        if (wavelengthStat)
            wavelengthStat.textContent =
                values.wavelength + " m";


        if (amplitudeStat)
            amplitudeStat.textContent =
                values.amplitude + " m";


        if (speedStat)
            speedStat.textContent =
                values.speed.toFixed(2) + " m/s";


        if (periodValue)
            periodValue.textContent =
                values.period.toFixed(2) + " s";


        if (waveCalculation)
            waveCalculation.textContent =
                `v = ${values.frequency} × ${values.wavelength} = ${values.speed.toFixed(2)} m/s`;


        if (observation) {

            if (values.frequency >= 7) {

                observation.textContent =
                    "High frequency means more oscillations occur every second.";

            }

            else if (values.wavelength >= 4) {

                observation.textContent =
                    "A larger wavelength means greater distance between consecutive crests.";

            }

            else if (values.amplitude >= 1.6) {

                observation.textContent =
                    "Increasing amplitude makes the wave taller.";

            }

            else {

                observation.textContent =
                    "Try changing one property at a time and observe the wave.";

            }
        }
    }


    /* =================================================
       RESIZE MAIN CANVAS
    ================================================= */

    function resizeCanvas() {

        if (!canvas)
            return;


        const rect =
            canvas.getBoundingClientRect();


        const width =
            Math.max(rect.width, 600);

        const height =
            Math.max(rect.height, 350);


        canvas.width = width;

        canvas.height = height;
    }


    /* =================================================
       DRAW MAIN WAVE
    ================================================= */

    function drawWave() {

        if (!canvas || !ctx)
            return;


        const width =
            canvas.width;

        const height =
            canvas.height;


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /* BACKGROUND */

        ctx.fillStyle =
            "#071426";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        const values =
            getValues();


        const center =
            height / 2;


        const amplitude =
            Math.min(
                height * 0.25,
                Math.max(
                    40,
                    values.amplitude * 55
                )
            );


        const wavelength =
            Math.min(
                350,
                Math.max(
                    120,
                    values.wavelength * 55
                )
            );


        /* GRID */

        ctx.strokeStyle =
            "rgba(80,180,230,0.15)";

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


        /* MEAN POSITION */

        ctx.beginPath();

        ctx.setLineDash([
            8,
            8
        ]);

        ctx.strokeStyle =
            "rgba(255,255,255,0.4)";

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


        ctx.fillStyle =
            "#cbd5e1";

        ctx.font =
            "14px Arial";

        ctx.fillText(
            "Mean Position",
            20,
            center - 12
        );


        /* WAVE */

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


            if (x === 0)
                ctx.moveTo(x, y);

            else
                ctx.lineTo(x, y);
        }


        ctx.shadowBlur = 18;

        ctx.shadowColor =
            "#22d3ee";

        ctx.strokeStyle =
            "#22d3ee";

        ctx.lineWidth = 5;

        ctx.stroke();

        ctx.shadowBlur = 0;


        /* CREST */

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


        /* TROUGH */

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


        ctx.fillText(
            "TROUGH",
            troughX - 30,
            troughY + 28
        );


        /* AMPLITUDE */

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


        /* WAVELENGTH */

        const wy =
            height - 45;


        const start =
            crestX;

        const end =
            crestX + wavelength;


        if (end < width) {

            ctx.beginPath();

            ctx.strokeStyle =
                "#34d399";

            ctx.lineWidth = 3;


            ctx.moveTo(
                start,
                wy
            );

            ctx.lineTo(
                end,
                wy
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


        /* PARTICLES */

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

            ctx.fill();
        }


        /* INFORMATION PANEL */

        const panelW = 220;

        const panelH = 135;

        const panelX =
            width - panelW - 20;

        const panelY = 20;


        ctx.fillStyle =
            "rgba(5,20,38,0.95)";

        ctx.fillRect(
            panelX,
            panelY,
            panelW,
            panelH
        );


        ctx.strokeStyle =
            "#27c7ff";

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
    }


    /* =================================================
       DIFFERENT WAVE PROFILE GRAPH
    ================================================= */
function drawWaveGraph() {

    if (!graphCanvas || !graphCtx)
        return;

    const rect =
        graphCanvas.getBoundingClientRect();

    const width =
        Math.max(rect.width, 600);

    const height =
        Math.max(rect.height, 300);

    graphCanvas.width = width;
    graphCanvas.height = height;

    /* =========================
       BACKGROUND
    ========================= */

    graphCtx.fillStyle = "#050b18";

    graphCtx.fillRect(
        0,
        0,
        width,
        height
    );

    const values = getValues();

    /* =========================
       GRAPH AREA
    ========================= */

    const left = 70;
    const right = 30;
    const top = 50;
    const bottom = 60;

    const graphWidth =
        width - left - right;

    const graphHeight =
        height - top - bottom;

    /* =========================
       GRID
    ========================= */

    graphCtx.strokeStyle =
        "rgba(255,255,255,0.12)";

    graphCtx.lineWidth = 1;

    for (
        let i = 0;
        i <= 10;
        i++
    ) {

        const x =
            left +
            (graphWidth / 10) * i;

        graphCtx.beginPath();

        graphCtx.moveTo(
            x,
            top
        );

        graphCtx.lineTo(
            x,
            height - bottom
        );

        graphCtx.stroke();
    }

    for (
        let i = 0;
        i <= 5;
        i++
    ) {

        const y =
            top +
            (graphHeight / 5) * i;

        graphCtx.beginPath();

        graphCtx.moveTo(
            left,
            y
        );

        graphCtx.lineTo(
            width - right,
            y
        );

        graphCtx.stroke();
    }

    /* =========================
       AXES
    ========================= */

    graphCtx.strokeStyle =
        "#94a3b8";

    graphCtx.lineWidth = 2;

    graphCtx.beginPath();

    graphCtx.moveTo(
        left,
        top
    );

    graphCtx.lineTo(
        left,
        height - bottom
    );

    graphCtx.lineTo(
        width - right,
        height - bottom
    );

    graphCtx.stroke();

    /* =========================
       AXIS LABELS
    ========================= */

    graphCtx.fillStyle =
        "#ffffff";

    graphCtx.font =
        "bold 14px Arial";

    graphCtx.fillText(
        "Wavelength λ (m)",
        10,
        top - 15
    );

    graphCtx.fillText(
        "Frequency f (Hz) →",
        width - 150,
        height - 20
    );

    /* =========================
       RELATIONSHIP CURVE
       
       v = fλ
       λ = v/f
    ========================= */

    const speed =
        values.speed;

    graphCtx.beginPath();

    for (
        let frequency = 1;
        frequency <= 10;
        frequency += 0.1
    ) {

        const wavelength =
            speed / frequency;

        const x =
            left +
            ((frequency - 1) / 9)
            * graphWidth;

        const y =
            top +
            graphHeight -
            (wavelength / 10)
            * graphHeight;

        if (
            frequency === 1
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

    /* =========================
       CURVE
    ========================= */

    graphCtx.shadowBlur = 15;

    graphCtx.shadowColor =
        "#38bdf8";

    graphCtx.strokeStyle =
        "#38bdf8";

    graphCtx.lineWidth = 4;

    graphCtx.stroke();

    graphCtx.shadowBlur = 0;

    /* =========================
       CURRENT POINT
    ========================= */

    const currentX =
        left +
        ((values.frequency - 1) / 9)
        * graphWidth;

    const currentY =
        top +
        graphHeight -
        (values.wavelength / 10)
        * graphHeight;

    graphCtx.beginPath();

    graphCtx.arc(
        currentX,
        currentY,
        8,
        0,
        Math.PI * 2
    );

    graphCtx.fillStyle =
        "#facc15";

    graphCtx.fill();

    /* =========================
       CURRENT VALUES
    ========================= */

    graphCtx.fillStyle =
        "#facc15";

    graphCtx.font =
        "bold 14px Arial";

    graphCtx.fillText(
        "f = " +
        values.frequency +
        " Hz",
        currentX + 12,
        currentY - 10
    );

    graphCtx.fillText(
        "λ = " +
        values.wavelength +
        " m",
        currentX + 12,
        currentY + 12
    );

    /* =========================
       FORMULA
    ========================= */

    graphCtx.fillStyle =
        "#43e6a1";

    graphCtx.font =
        "bold 15px Arial";

    graphCtx.fillText(
        "v = fλ    →    λ = v/f",
        left + 15,
        top + 25
    );

    /* =========================
       EXPLANATION
    ========================= */

    graphCtx.fillStyle =
        "#cbd5e1";

    graphCtx.font =
        "14px Arial";

    graphCtx.fillText(
        "Higher frequency → shorter wavelength",
        left + 15,
        height - 25
    );
}
   
    /* =================================================
       ANIMATION
    ================================================= */

    function animateWave() {

        if (running) {

            const values =
                getValues();


            time +=
                values.frequency *
                0.015;
        }


        drawWave();

        drawWaveGraph();


        requestAnimationFrame(
            animateWave
        );
    }


    /* =================================================
       BUTTONS
    ================================================= */

    frequencySlider.addEventListener(
        "input",
        updateValues
    );


    wavelengthSlider.addEventListener(
        "input",
        updateValues
    );


    amplitudeSlider.addEventListener(
        "input",
        updateValues
    );


    if (playBtn) {

        playBtn.addEventListener(
            "click",
            function () {

                running = true;

            }
        );
    }


    if (pauseBtn) {

        pauseBtn.addEventListener(
            "click",
            function () {

                running = false;

            }
        );
    }


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

            }
        );
    }


    window.addEventListener(
        "resize",
        function () {

            resizeCanvas();

            drawWave();

            drawWaveGraph();

        }
    );


    resizeCanvas();

    updateValues();

    animateWave();
}


/* =====================================================
   WAVE CHALLENGES
===================================================== */

const challengeQuestion =
    document.getElementById(
        "challengeQuestion"
    );


if (challengeQuestion) {

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


    let current = 0;

    let score = 0;


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


    function loadChallenge() {

        const challenge =
            challenges[current];


        title.textContent =
            challenge.title;


        challengeQuestion.textContent =
            challenge.question;


        number.textContent =
            `Challenge ${current + 1} of ${challenges.length}`;


        progress.style.width =
            ((current + 1) /
            challenges.length *
            100) + "%";


        options.innerHTML = "";

        feedback.textContent = "";

        next.style.display =
            "none";


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


    function checkChallenge(
        selected,
        selectedButton
    ) {

        const challenge =
            challenges[current];


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


            score += 10;

        }

        else {

            selectedButton.classList.add(
                "wrong"
            );


            buttons[
                challenge.answer
            ].classList.add(
                "correct"
            );


            feedback.textContent =
                "❌ Incorrect. The highlighted answer is correct.";


            feedback.style.color =
                "#ff647c";
        }


        scoreElement.textContent =
            score;


        next.style.display =
            "inline-flex";
    }


    next.addEventListener(
        "click",
        function () {

            current++;


            if (
                current >=
                challenges.length
            ) {

                title.textContent =
                    "🏆 Challenges Completed!";


                challengeQuestion.textContent =
                    `You scored ${score} out of 50.`;


                options.innerHTML = "";


                feedback.textContent =
                    score >= 40
                        ? "🌟 Excellent! You understand wave motion very well."
                        : "📚 Good attempt! Review the Notes and try again.";


                next.style.display =
                    "none";


                return;
            }


            loadChallenge();
        }
    );


    loadChallenge();
}


/* =====================================================
   WAVE QUIZ
===================================================== */

const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );


if (quizQuestion) {

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

    let score = 0;


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


    const quizScore =
        document.getElementById(
            "quizScore"
        );


    const progress =
        document.getElementById(
            "quizProgress"
        );


    function loadQuestion() {

        const q =
            questions[currentQuestion];


        quizQuestion.textContent =
            q.question;


        questionNumber.textContent =
            `Question ${currentQuestion + 1} of ${questions.length}`;


        progress.style.width =
            ((currentQuestion + 1) /
            questions.length *
            100) + "%";


        options.innerHTML = "";

        feedback.textContent = "";

        next.style.display =
            "none";


        q.options.forEach(
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


    function checkAnswer(
        selected,
        selectedButton
    ) {

        const q =
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
            q.answer
        ) {

            selectedButton.classList.add(
                "correct"
            );


            feedback.textContent =
                "✅ Correct Answer!";


            feedback.style.color =
                "#43e6a1";


            score++;

        }

        else {

            selectedButton.classList.add(
                "wrong"
            );


            buttons[
                q.answer
            ].classList.add(
                "correct"
            );


            feedback.textContent =
                "❌ Incorrect. The highlighted answer is correct.";


            feedback.style.color =
                "#ff647c";
        }


        quizScore.textContent =
            `Score: ${score}`;


        next.style.display =
            "inline-flex";
    }


    next.addEventListener(
        "click",
        function () {

            currentQuestion++;


            if (
                currentQuestion >=
                questions.length
            ) {

                document.querySelector(
                    ".quiz-container"
                ).style.display =
                    "none";


                const result =
                    document.getElementById(
                        "quizResult"
                    );


                result.style.display =
                    "block";


                document.getElementById(
                    "finalScore"
                ).textContent =
                    `${score} / ${questions.length}`;


                const message =
                    document.getElementById(
                        "resultMessage"
                    );


                if (
                    score ===
                    questions.length
                ) {

                    message.textContent =
                        "🌟 Outstanding! You have mastered Wave Motion.";

                }

                else if (
                    score >= 4
                ) {

                    message.textContent =
                        "👏 Great job! Review a few concepts and try again.";

                }

                else {

                    message.textContent =
                        "📚 Keep learning! Go through the Notes and Simulation.";
                }


                return;
            }


            loadQuestion();

        }
    );


    loadQuestion();
}