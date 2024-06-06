        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('startButton');
        const contentDiv = document.getElementById('content');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let elapsedTime, lastTime, firstPassTime, isFirstLoop, sawtoothValue, animationFrameId;
        lastTime = 0;
        isFirstLoop = 1;
        firstPassTime = 0;
        function startAudioVisual() {
            contentDiv.style.display = 'none'; // Hide the text content
            canvas.style.display = 'block'; // Show the canvas
            startButton.style.display = 'none'; // Hide the button


            // Flashing setup with requestAnimationFrame
            function toggleFlash(timestamp) {
                //start counting time when "start" button pressed, not when webpage opened
                if (isFirstLoop == 1){
                  firstPassTime = timestamp;
                  lastTime = timestamp;
                  isFirstLoop = 0;
                }
                elapsedTime = lastTime - firstPassTime;
                console.log(elapsedTime);
                //elapsedTime is measured in milliseconds.
                //For example, 2 minutes = 2 min x 60sec/min x 1000 milliseconds/sec = 120000 milliseconds
                if (elapsedTime < 12000){
                  signal01(elapsedTime);
                }
                if (elapsedTime >= 12000){
                  signal02(elapsedTime);

                }

                ctx.fillRect(0, 0, canvas.width, canvas.height);
                lastTime = timestamp;

                animationFrameId = requestAnimationFrame(toggleFlash);

            }
            animationFrameId = requestAnimationFrame(toggleFlash);

            // Prepare to stop
            startButton.removeEventListener('click', startAudioVisual);
            startButton.addEventListener('click', stopAudioVisual);
            startButton.textContent = 'Stop';
            startButton.style.display = 'block';

            // Add global event listeners for stopping
            document.addEventListener('click', stopHandler);
            document.addEventListener('keydown', stopHandler);
        }
        //combine "patterns" into "signals"
        function signal01(elapsedTime){
             let periodGreen, slopeGreen, dcOffsetGreen, periodBlue, slopeBlue, dcOffsetBlue;
             periodGreen = 12100 - elapsedTime; //in milliseconds
             slopeGreen = 200/periodGreen; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetGreen = -100; //dcOffset controls duty cycle.

             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             pattern01(elapsedTime, periodGreen, slopeGreen, dcOffsetGreen);
        }

        function signal02(elapsedTime){
             let periodGreen, slopeGreen, dcOffsetGreen, periodBlue, slopeBlue, dcOffsetBlue;
             periodGreen = 500; //in milliseconds
             slopeGreen = 200/periodGreen; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetGreen = -100; //dcOffset controls duty cycle.
             periodBlue = 500; //in milliseconds
             slopeBlue = 200/periodBlue; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
             dcOffsetBlue = -100; //dcOffset controls duty cycle.
             //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
             //dutyCycle = (dcOffset/MAXdcOffset)*100%
             //Note: duty cycles too far from 50% look a little glitchy.
             if (((Math.floor(elapsedTime/100)) % 2)==0){
                   pattern01(elapsedTime, periodGreen, slopeGreen, dcOffsetGreen);
                   }
                   if (((Math.floor(elapsedTime/100)) % 2)==1){
                   pattern02(elapsedTime, periodBlue, slopeBlue, dcOffsetBlue);
                   }

        }
        //define flashing pattern
        function pattern01(elapsedTime, periodGreen, slopeGreen, dcOffsetGreen) {
             let sawtoothValue, slope, period, dcOffset;
             slope = slopeGreen;
             period = periodGreen;
             dcOffset = dcOffsetGreen;
             sawtoothValue = slope*(elapsedTime % period) + dcOffset;

                if (sawtoothValue > 0) {
                     ctx.fillStyle = 'black';
                }
                if (sawtoothValue <= 0){
                     ctx.fillStyle = 'green';
                }

        }

        //define flashing pattern
        function pattern02(elapsedTime, periodBlue, slopeBlue, dcOffsetBlue) {
             let sawtoothValue, slope, period, dcOffset;
             slope = slopeBlue;
             period = periodBlue;
             dcOffset = dcOffsetBlue;
             sawtoothValue = slope*(elapsedTime % period) + dcOffset;

                if (sawtoothValue > 0) {
                     ctx.fillStyle = 'black';
                }
                if (sawtoothValue <= 0){
                     ctx.fillStyle = 'blue';
                }

        }

        function stopAudioVisual() {


            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            startButton.textContent = 'Start';
            startButton.removeEventListener('click', stopAudioVisual);
            startButton.addEventListener('click', startAudioVisual);

            // Remove global event listeners
            document.removeEventListener('click', stopHandler);
            document.removeEventListener('keydown', stopHandler);

            // Resetting the page to its initial state
            contentDiv.style.display = 'block';
            startButton.style.display = 'block';
            canvas.style.display = 'none';
        }

        function stopHandler(event) {
            // Preventing the event from re-triggering start
            if (event.target !== startButton) {
                stopAudioVisual();
            }
        }

        startButton.addEventListener('click', startAudioVisual);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
