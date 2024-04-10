        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('startButton');
        const contentDiv = document.getElementById('content');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let elapsedTime, period, slope, dcOffset, sawtoothValue, animationFrameId;
        period = 100; //in milliseconds
        slope = 200/period; //Height of sawtooth arbitrary decision. Choose 200, so when duty cycle = 50%, sawtooth goes from -100 to 100
        dcOffset = -75; //dcOffset controls duty cycle.
        //dcOffset duty cycle ranges from 0 to -200. -100 = 50% duty cycle,
        //dutyCycle = (dcOffset/MAXdcOffset)*100%

        let lastTime = 0;
        function startAudioVisual() {
            contentDiv.style.display = 'none'; // Hide the text content
            canvas.style.display = 'block'; // Show the canvas
            startButton.style.display = 'none'; // Hide the button


            // Flashing setup with requestAnimationFrame
            function toggleFlash(timestamp) {
                elapsedTime = lastTime;
                sawtoothValue = slope*(elapsedTime % period) + dcOffset;
                console.log(elapsedTime);
                if (sawtoothValue > 0) {
                     ctx.fillStyle = 'black';
                }
                if (sawtoothValue <= 0){
                     ctx.fillStyle = 'green';
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
