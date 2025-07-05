document.querySelectorAll("#button button").forEach(function(b){b.disabled=true;});
            let currentvideo=null;
            let canvas=document.createElement('canvas');
            canvas.className="canvasdisplay";
            let context=canvas.getContext('2d');
            document.querySelector("#display").appendChild(canvas);
            let modelpromise=cocoSsd.load();
            modelpromise.then(function(model){
                document.getElementById("para").style.display="None";
                document.querySelectorAll("#button button").forEach(function(b){b.disabled=false;});
            })   
            function startdetection(selectedVideo){
                currentvideo=selectedVideo;
                canvas.width=selectedVideo.videoWidth;
                canvas.height=selectedVideo.videoHeight;
                canvas.style.display = "block";

            }
            async function detectframe() {
                if (!currentvideo || currentvideo.paused || currentvideo.ended) {
                   requestAnimationFrame(detectframe);
                    return;}

                let model = await modelpromise;
                const predictions=await model.detect(currentvideo);
                if(!predictions)
                {console.log("Model didnot detect any video");}
                context.clearRect(0, 0, canvas.width, canvas.height);
                predictions.forEach(pred => {
                   context.beginPath();
                   context.rect(...pred.bbox);
                   context.lineWidth = 2;
                   context.strokeStyle = 'red';
                   context.fillStyle = 'red';
                   context.stroke();
                   context.fillText(`${pred.class} (${(pred.score * 100).toFixed(1)}%)`, pred.bbox[0], pred.bbox[1] > 10 ? pred.bbox[1] - 5 : 10);});
                   requestAnimationFrame(detectframe);
            };
            detectframe();
