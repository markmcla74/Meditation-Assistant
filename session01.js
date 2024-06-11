        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('startButton');
        const contentDiv = document.getElementById('content');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let elapsedTime, lastTime, firstPassTime, isFirstLoop, sawtoothValue, animationFrameId, t1, t2, t3, t4, t5, t6, player;
        t1 = 90000;  // 1 min 30 sec
        t2 = 180000; // 3 min
        t3 = 270000; // 4 min 30 sec
        t4 = 390000; // 6 min 30 sec
        t5 = 480000; // 8 min
        t6 = 575000; // 9 min 35 sec
        lastTime = 0;
        isFirstLoop = 1;
        firstPassTime = 0;
        startButton.style.display = 'none'; // Hide the button

        // Add a custom button to the player
        // Load and play a specific video
        function onYouTubeIframeAPIReady() {
            //console.log("api is loaded");
            player = new YT.Player('player',{
            videoId: 'EwPC4MqbL70',
            events: {
              'onReady': onPlayerReady
              }
           });
        }

        function onPlayerReady(event) {
            startButton.style.display = 'block'; // show the button now that hidden video is ready
            startButton.addEventListener('click', function() {
            event.target.playVideo();
            });
        }

        function startFlashing() {
            contentDiv.style.display = 'none'; // Hide the text content
            canvas.style.display = 'block'; // Show the canvas
            startButton.style.display = 'none'; // Hide the button

            // Play flashing lights signals with requestAnimationFrame
            function playSignals(timestamp) {
                //start counting time when "start" button pressed, not when webpage opened
                if (isFirstLoop == 1){
                  firstPassTime = timestamp;
                  lastTime = timestamp;
                  isFirstLoop = 0;
                }
                elapsedTime = lastTime - firstPassTime;
                //console.log(elapsedTime);
                //elapsedTime is measured in milliseconds.
                //For example, 2 minutes = 2 min x 60sec/min x 1000 milliseconds/sec = 120,000 milliseconds
                //Total duration of song is 9 min, 41 sec = 581,000 milliseconds
                if (elapsedTime < t1){
                  signal01(elapsedTime);
                }
                if ((elapsedTime >= t1) && (elapsedTime < t2)){
                  signal02(elapsedTime);

                }
                if ((elapsedTime >= t2) && (elapsedTime < t3)){
                  signal03(elapsedTime);

                }
                if ((elapsedTime >= t3) && (elapsedTime < t4)){
                  signal04(elapsedTime);

                }
                if ((elapsedTime >= t4) && (elapsedTime < t5)){
                  signal05(elapsedTime);

                }
                if ((elapsedTime >= t5) && (elapsedTime < t6)){
                  signal06(elapsedTime);

                }
                if (elapsedTime >= t6){
                  signal07(elapsedTime);

                }

                ctx.fillRect(0, 0, canvas.width, canvas.height);
                lastTime = timestamp;

                animationFrameId = requestAnimationFrame(playSignals);

            }
            animationFrameId = requestAnimationFrame(playSignals);

            // Prepare to stop
            startButton.removeEventListener('click', startFlashing);
            startButton.addEventListener('click', stopFlashing);
            startButton.textContent = 'Stop';
            startButton.style.display = 'block';

            // Add global event listeners for stopping
            document.addEventListener('click', stopHandler);
            document.addEventListener('keydown', stopHandler);
        }
        //combine "patterns" into "signals"
        function signal01(elapsedTime){
             let periodColor1, slopeColor1, dcOffsetColor1, timeInterval, initialPeriod, finalPeriod;
             timeInterval = (t1 - 0);
             initialPeriod = 3000; //in milliseconds
             finalPeriod = 300;
             //console.log("finalPeriod", finalPeriod);
             periodColor1 = initialPeriod + ((finalPeriod - initialPeriod)/timeInterval)*(elapsedTime - 0); //gradually decrease period (i.e. increase frequency) during time interval
             periodColor1 = Math.round(periodColor1/300)*300; //round periodColor1 to nearest 300 milliseconds
             //console.log("periodColor1", periodColor1);
             slopeColor1 = 200/periodColor1; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetColor1 = -100; //dcOffset controls duty cycle.

             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern04(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);
        }

        function signal02(elapsedTime){
            // let periodColor1, slopeColor1, dcOffsetColor1;
            // periodColor1 = 300;
            // slopeColor1 = 200/periodColor1;
            // dcOffsetColor1 = -100;
            // pattern02(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);

             let periodColor1, slopeColor1, dcOffsetColor1, timeInterval, initialPeriod, finalPeriod;
             timeInterval = (t2 - t1);
             initialPeriod = 250; //in milliseconds
             finalPeriod = 125;
             periodColor1 = initialPeriod + ((finalPeriod - initialPeriod)/timeInterval)*(elapsedTime - t1); //gradually decrease period (i.e. increase frequency) during time interval
             periodColor1 = Math.round(periodColor1/125)*125; //round periodColor1 to nearest 125 milliseconds
             slopeColor1 = 200/periodColor1; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetColor1 = -100; //dcOffset controls duty cycle.

             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern02(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);
        }

        function signal03(elapsedTime){
           let periodColor1, slopeColor1, dcOffsetColor1;
             periodColor1 = 125;
             slopeColor1 = 200/periodColor1;
             dcOffsetColor1 = -100;
             pattern03(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);
           //  let periodColor1, slopeColor1, dcOffsetColor1, periodColor2, slopeColor2, dcOffsetColor2;
           //  periodColor1 = 150; //in milliseconds
           //  slopeColor1 = 200/periodColor1; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
           //  dcOffsetColor1 = -100; //dcOffset controls duty cycle.
           //  periodColor2 = 150; //in milliseconds
           //  slopeColor2 = 200/periodColor2; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
           //  dcOffsetColor2 = -100; //dcOffset controls duty cycle.
           //  //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
           //  //dutyCycle = (dcOffset/MAXdcOffset)*100%
           //  //Note: duty cycles too far from 50% look a little glitchy.
           //  if (((Math.floor(elapsedTime/100)) % 2)==0){
           //        pattern01(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);
           //        }
           //  if (((Math.floor(elapsedTime/100)) % 2)==1){
           //        pattern02(elapsedTime, periodColor2, slopeColor2, dcOffsetColor2);
           //        }

        }

        function signal04(elapsedTime){
            let periodColor1, slopeColor1, dcOffsetColor1;
             periodColor1 = 150;
             slopeColor1 = 200/periodColor1;
             dcOffsetColor1 = -100;
             pattern02(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);
           //  let periodColor1, slopeColor1, dcOffsetColor1, timeInterval, initialPeriod, finalPeriod;
           //  timeInterval = (t4 - t3);
           //  initialPeriod = 150; //in milliseconds
           //  finalPeriod = 300;
           //  periodColor1 = initialPeriod + ((finalPeriod - initialPeriod)/timeInterval)*(elapsedTime - t3); //gradually decrease period (i.e. increase frequency) during time interval
           //  periodColor1 = Math.round(periodColor1/150)*150; //round periodColor1 to nearest 50 milliseconds
           //  slopeColor1 = 200/periodColor1; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
           //  dcOffsetColor1 = -100; //dcOffset controls duty cycle.

           //  //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
           //  //dutyCycle = (dcOffset/MAXdcOffset)*100%
           //  //Note: duty cycles too far from 50% look a little glitchy.
           //  pattern03(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);
        }

        function signal05(elapsedTime){
             let periodColor1, slopeColor1, dcOffsetColor1;
             periodColor1 = 200;
             slopeColor1 = 200/periodColor1;
             dcOffsetColor1 = -100;
             pattern02(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);
            // let periodColor1, slopeColor1, dcOffsetColor1, timeInterval, initialPeriod, finalPeriod;
            // timeInterval = (t5 - t4);
            // initialPeriod = 300; //in milliseconds
            // finalPeriod = 600;
            // periodColor1 = initialPeriod + ((finalPeriod - initialPeriod)/timeInterval)*(elapsedTime - t4); //gradually decrease period (i.e. increase frequency) during time interval
            // periodColor1 = Math.round(periodColor1/300)*300; //round periodColor1 to nearest 50 milliseconds
            // slopeColor1 = 200/periodColor1; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
            // dcOffsetColor1 = -100; //dcOffset controls duty cycle.

            // //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
            // //dutyCycle = (dcOffset/MAXdcOffset)*100%
            // //Note: duty cycles too far from 50% look a little glitchy.
            // pattern02(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);
        }

        function signal06(elapsedTime){
            let periodColor1, slopeColor1, dcOffsetColor1, timeInterval, initialPeriod, finalPeriod;
             timeInterval = (t6 - t5);
             initialPeriod = 300; //in milliseconds
             finalPeriod = 3000;
             periodColor1 = initialPeriod + ((finalPeriod - initialPeriod)/timeInterval)*(elapsedTime - t5); //gradually decrease period (i.e. increase frequency) during time interval
             periodColor1 = Math.round(periodColor1/300)*300; //round periodColor1 to nearest 300 milliseconds
             slopeColor1 = 200/periodColor1; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetColor1 = -100; //dcOffset controls duty cycle.

             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern04(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);
        }

        function signal07(elapsedTime){
             let periodColor1, slopeColor1, dcOffsetColor1;

             periodColor1 = 1;
             slopeColor1 = 200/periodColor1; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetColor1 = -100; //dcOffset controls duty cycle.
             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern05(elapsedTime, periodColor1, slopeColor1, dcOffsetColor1);
        }

        function pattern01(elapsedTime, period, slope, dcOffset) {
             let sawtoothValue, triangleValue, scaleRed, scaleGreen, scaleBlue;
             sawtoothValue = slope*(elapsedTime % period) + dcOffset;
             triangleValue = Math.abs(Math.abs(sawtoothValue) + dcOffset);
             //console.log("triangleValue", triangleValue);
             //rgb value of dark orchid is: (153, 50, 204)
             //(triangleValue/dcOffset) goes from 0 to 1, and then back to 0, during one period
             //Smoothly transition from black to dark orchid, rgb(153,50,204), back to black, rgb(0,0,0)
             scaleRed = Math.round(Math.abs(triangleValue/dcOffset)*153);
             scaleGreen = Math.round(Math.abs(triangleValue/dcOffset)*50);
             scaleBlue = Math.round(Math.abs(triangleValue/dcOffset)*204);
             ctx.fillStyle = "rgb("+scaleRed+", "+scaleGreen+", "+scaleBlue+")";
        }

        function pattern02(elapsedTime, period, slope, dcOffset) {
             let sawtoothValue, triangleValue, scaleRed, scaleGreen, scaleBlue;
             sawtoothValue = slope*(elapsedTime % period) + dcOffset;
             triangleValue = Math.abs(Math.abs(sawtoothValue) + dcOffset);
             //rgb value of spring green is: rgb(0,255,127)
             //(triangleValue/dcOffset) goes from 0 to 1, and then back to 0, during one period
             //Smoothly transition from black to spring green, rgb(0,255,127), back to black, rgb(0,0,0)
             scaleRed = Math.round(Math.abs(triangleValue/dcOffset)*0);
             scaleGreen = Math.round(Math.abs(triangleValue/dcOffset)*255);
             scaleBlue = Math.round(Math.abs(triangleValue/dcOffset)*127);
             ctx.fillStyle = "rgb("+scaleRed+", "+scaleGreen+", "+scaleBlue+")";
        }

         function pattern03(elapsedTime, period, slope, dcOffset) {
             let sawtoothValue, triangleValue, scaleRed, scaleGreen, scaleBlue;
             sawtoothValue = slope*(elapsedTime % period) + dcOffset;
             triangleValue = Math.abs(Math.abs(sawtoothValue) + dcOffset);
             //rgb value of sky blue is: rgb(135,206,235)
             //(triangleValue/dcOffset) goes from 0 to 1, and then back to 0, during one period
             //Smoothly transition from black to sky blue, rgb(135,206,235), back to black, rgb(0,0,0)
             scaleRed = Math.round(Math.abs(triangleValue/dcOffset)*135);
             scaleGreen = Math.round(Math.abs(triangleValue/dcOffset)*206);
             scaleBlue = Math.round(Math.abs(triangleValue/dcOffset)*235);
             ctx.fillStyle = "rgb("+scaleRed+", "+scaleGreen+", "+scaleBlue+")";
        }

        function pattern04(elapsedTime, period, slope, dcOffset) {
             let sawtoothValue, triangleValue, scaleRed, scaleGreen, scaleBlue;
             sawtoothValue = slope*(elapsedTime % period) + dcOffset;
             triangleValue = Math.abs(Math.abs(sawtoothValue) + dcOffset);
             //rgb value of custom orange is: rgb(248,196,113)
             //(triangleValue/dcOffset) goes from 0 to 1, and then back to 0, during one period
             //Smoothly transition from black to custom orange, rgb(248,196,113), back to black, rgb(0,0,0)
             scaleRed = Math.round(Math.abs(triangleValue/dcOffset)*248);
             scaleGreen = Math.round(Math.abs(triangleValue/dcOffset)*196);
             scaleBlue = Math.round(Math.abs(triangleValue/dcOffset)*113);
             ctx.fillStyle = "rgb("+scaleRed+", "+scaleGreen+", "+scaleBlue+")";
        }

         function pattern05(elapsedTime, period, slope, dcOffset) {
             //let sawtoothValue;
             //sawtoothValue = slope*(elapsedTime % period) + dcOffset;
             ctx.fillStyle = 'black';
        }

        function stopFlashing() {


            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            startButton.textContent = 'Start';
            startButton.removeEventListener('click', stopFlashing);
            startButton.addEventListener('click', startFlashing);
            isFirstLoop = 1;

            // Remove global event listeners
            document.removeEventListener('click', stopHandler);
            document.removeEventListener('keydown', stopHandler);

            // Resetting the page to its initial state
            contentDiv.style.display = 'block';
            startButton.style.display = 'block';
            canvas.style.display = 'none';
            location.reload(true); //refresh the webpage
        }

        function stopHandler(event) {
            // Preventing the event from re-triggering start
            if (event.target !== startButton) {
                stopFlashing();
                location.reload(true); //refresh the webpage
                //console.log(player.getPlayerState());
            }
        }

        startButton.addEventListener('click', startFlashing);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
