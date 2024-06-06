        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('startButton');
        const contentDiv = document.getElementById('content');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let secs, elapsedTime, animationFrameId;

        function startAudioVisual() {
            contentDiv.style.display = 'none'; // Hide the text content
            canvas.style.display = 'block'; // Show the canvas
            startButton.style.display = 'none'; // Hide the button


            // Flashing setup with requestAnimationFrame
            let flash = false;
            let lastTime = 0;
            function toggleFlash(timestamp) {
                elapsedTime = (timestamp - lastTime);
                secs = Math.floor(((elapsedTime) / 1000) % 60);
                if (secs >= 0.5) {

                    if (flash== true){
                     ctx.fillStyle = 'black';
                    }
                    if (flash == false){
                     ctx.fillStyle = 'white';
                    }

                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    flash = !flash;
                    lastTime = timestamp;
                }
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
