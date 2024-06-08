        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('startButton');
        const contentDiv = document.getElementById('content');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let elapsedTime, lastTime, firstPassTime, isFirstLoop, sawtoothValue, animationFrameId, t1, t2, t3, t4, t5, t6, player;
        t1 = 30000;  // 30 sec
        t2 = 180000; // 3 min
        t3 = 270000; // 4 min 30 sec
        t4 = 390000; // 6 min 30 sec
        t5 = 480000; // 8 min
        t6 = 570000; // 9 min 30 sec
        lastTime = 0;
        isFirstLoop = 1;
        firstPassTime = 0;
        startButton.style.display = 'none'; // Hide the button

        // Add a custom button to the player
        // Load and play a specific video
        function onYouTubeIframeAPIReady() {
            //console.log("api is loaded");
            player = new YT.Player('player',{
            videoId: 'dKdeOdxl0UQ',
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
            //startButton.removeEventListener('click', startFlashing);
            //startButton.addEventListener('click', stopFlashing);
            //startButton.textContent = 'Stop';
            //startButton.style.display = 'block';

            // Add global event listeners for stopping
            document.addEventListener('click', stopHandler);
            document.addEventListener('keydown', stopHandler);
        }
        //combine "patterns" into "signals"
        function signal01(elapsedTime){
             let periodGreen, slopeGreen, dcOffsetGreen, periodBlue, slopeBlue, dcOffsetBlue;
             if (elapsedTime < t1/5){
               periodGreen = 4000; //in milliseconds
             }
             if ((elapsedTime >=t1/5) && (elapsedTime < 2*t1/5)){
               periodGreen = 2500;
             }
             if ((elapsedTime >=2*t1/5) && (elapsedTime < 3*t1/5)){
               periodGreen = 1500;
             }
             if ((elapsedTime >=3*t1/5) && (elapsedTime < 4*t1/5)){
               periodGreen = 1000;
             }
             if ((elapsedTime >=4*t1/5) && (elapsedTime < t1)){
               periodGreen = 500;
             }
             slopeGreen = 200/periodGreen; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetGreen = -100; //dcOffset controls duty cycle.

             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern07(elapsedTime, periodGreen, slopeGreen, dcOffsetGreen);
        }

        function signal02(elapsedTime){
             let periodGreen, slopeGreen, dcOffsetGreen;
             periodGreen = 250;
             slopeGreen = 200/periodGreen; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetGreen = -100; //dcOffset controls duty cycle.

             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern05(elapsedTime, periodGreen, slopeGreen, dcOffsetGreen);
        }

        function signal03(elapsedTime){
             let periodGreen, slopeGreen, dcOffsetGreen, periodBlue, slopeBlue, dcOffsetBlue;
             periodGreen = 150; //in milliseconds
             slopeGreen = 200/periodGreen; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetGreen = -100; //dcOffset controls duty cycle.
             periodBlue = 150; //in milliseconds
             slopeBlue = 200/periodBlue; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetBlue = -100; //dcOffset controls duty cycle.
             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             if (((Math.floor(elapsedTime/100)) % 2)==0){
                   pattern05(elapsedTime, periodGreen, slopeGreen, dcOffsetGreen);
                   }
             if (((Math.floor(elapsedTime/100)) % 2)==1){
                   pattern06(elapsedTime, periodBlue, slopeBlue, dcOffsetBlue);
                   }

        }

        function signal04(elapsedTime){
             let periodGreen, slopeGreen, dcOffsetGreen;
             periodGreen = 250;
             slopeGreen = 200/periodGreen; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetGreen = -100; //dcOffset controls duty cycle.

             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern05(elapsedTime, periodGreen, slopeGreen, dcOffsetGreen);
        }

        function signal05(elapsedTime){
             let periodGreen, slopeGreen, dcOffsetGreen;
             periodGreen = 250;
             slopeGreen = 200/periodGreen; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetGreen = -100; //dcOffset controls duty cycle.

             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern05(elapsedTime, periodGreen, slopeGreen, dcOffsetGreen);
        }

        function signal06(elapsedTime){
            let periodGreen, slopeGreen, dcOffsetGreen;
             if (elapsedTime < (t5 + (t6-t5)/5)){
               periodGreen = 250; //in milliseconds
             }
             if ((elapsedTime >=(t5+(t6-t5)/5)) && (elapsedTime < (t5 + 2*(t6-t5)/5))){
               periodGreen = 500;
             }
             if ((elapsedTime >=(t5+ 2*(t6-t5)/5)) && (elapsedTime < (t5 + 3*(t6-t5)/5))){
               periodGreen = 750;
             }
             if ((elapsedTime >=(t5 + 3*(t6-t5)/5)) && (elapsedTime < (t5+ 4*(t6-t5)/5))){
               periodGreen = 1000;
             }
             if ((elapsedTime >=(t5+ 4*(t6-t5)/5)) && (elapsedTime < t6)){
               periodGreen = 1500;
             }
             slopeGreen = 200/periodGreen; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetGreen = -100; //dcOffset controls duty cycle.

             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern07(elapsedTime, periodGreen, slopeGreen, dcOffsetGreen);
        }

        function signal07(elapsedTime){
             let periodGreen, slopeGreen, dcOffsetGreen, periodBlue, slopeBlue, dcOffsetBlue;

             periodGreen = 1;
             slopeGreen = 200/periodGreen; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetGreen = -100; //dcOffset controls duty cycle.
             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern03(elapsedTime, periodGreen, slopeGreen, dcOffsetGreen);
        }

        //define flashing pattern
        function pattern01(elapsedTime, period, slope, dcOffset) {
             let sawtoothValue;
             sawtoothValue = slope*(elapsedTime % period) + dcOffset;

                if (sawtoothValue > 0) {
                     ctx.fillStyle = 'black'; // black = rgb(0,0,0)
                }
                if (sawtoothValue <= 0){
                     ctx.fillStyle = 'rgb(0,255,127)'; // SpringGreen = rgb(0,255,127)
                }

        }

        //define flashing pattern
        function pattern02(elapsedTime, period, slope, dcOffset) {
             let sawtoothValue;
             sawtoothValue = slope*(elapsedTime % period) + dcOffset;

                if (sawtoothValue > 0) {
                     ctx.fillStyle = 'black';
                }
                if (sawtoothValue <= 0){
                     ctx.fillStyle = 'SkyBlue'; //SkyBlue = rgb((135,206,235)
                }

        }

        function pattern03(elapsedTime, period, slope, dcOffset) {
             //let sawtoothValue;
             //sawtoothValue = slope*(elapsedTime % period) + dcOffset;
             ctx.fillStyle = 'black';
        }

        function pattern04(elapsedTime, period, slope, dcOffset) {
             let sawtoothValue, triangleValue, scaleRed, scaleGreen, scaleBlue;
             sawtoothValue = slope*(elapsedTime % period) + dcOffset;
             triangleValue = Math.abs(Math.abs(sawtoothValue) + dcOffset);
             //rgb value of dark orchid is: (153, 50, 204)
             //(triangleValue/dcOffset) goes from 0 to 1, and then back to 0, during one period
             //Smoothly transition from black to dark orchid, rgb(153,50,204), back to black, rgb(0,0,0)
             scaleRed = Math.round(Math.abs(triangleValue/dcOffset)*153);
             scaleGreen = Math.round(Math.abs(triangleValue/dcOffset)*50);
             scaleBlue = Math.round(Math.abs(triangleValue/dcOffset)*204);
             ctx.fillStyle = "rgb("+scaleRed+", "+scaleGreen+", "+scaleBlue+")";
        }

        function pattern05(elapsedTime, period, slope, dcOffset) {
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

         function pattern06(elapsedTime, period, slope, dcOffset) {
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

        function pattern07(elapsedTime, period, slope, dcOffset) {
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

       // function stopFlashing() {


       //     if (animationFrameId) cancelAnimationFrame(animationFrameId);
       //     startButton.textContent = 'Start';
       //     startButton.removeEventListener('click', stopFlashing);
       //     startButton.addEventListener('click', startFlashing);
       //     isFirstLoop = 1;

            // Remove global event listeners
       //     document.removeEventListener('click', stopHandler);
       //     document.removeEventListener('keydown', stopHandler);

            // Resetting the page to its initial state
       //     contentDiv.style.display = 'block';
            //startButton.style.display = 'block';
       //     canvas.style.display = 'none';
       // }

        function stopHandler(event) {
            // Preventing the event from re-triggering start
            if (event.target !== startButton) {
                //stopFlashing();
                location.reload(); //refresh the webpage
                //console.log(player.getPlayerState());
            }
        }

        startButton.addEventListener('click', startFlashing);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
