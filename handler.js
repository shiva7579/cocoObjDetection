function upload()
            {
                document.getElementById("file").click();
            }
            
            document.getElementById("file").addEventListener("change",function()
                {
                    var x=this.files[0];
                    const reader=new FileReader();
                    var video=document.getElementById("preview");

                    if(!x.type.startsWith("video/"))
                    {
                        alert("Please Upload video Only!!!");
                        return;
                    }
                    if(x.size>10*1024*1024){
                        alert("Please upload files up to 5mb only");
                        return;}
              
                    reader.onload=function(e)
                    {
                        video.src=e.target.result;
                        video.className="videostyl";
                        video.controls=true;
                        video.style.display="block";
                        };
                    reader.readAsDataURL(x);

                    // video.addEventListener("loadedmetadata",function()
                    // {
                    //     video.addEventListener("play",function(){
                    //     document.querySelectorAll("#button button").forEach(function(b){b.disabled=true;});
                    //     startdetection(video);});
                    // });
                    video.addEventListener("play",function(){
                        document.querySelectorAll("#button button").forEach(function(b){b.disabled=true;});
                        startdetection(video);});

                    video.addEventListener("ended",function()
                    {
                        video.style.display="none";
                        canvas.style.display="none";
                        video.removeAttribute("src");
                        video.load();
                        currentvideo=null;
                        document.querySelectorAll("#button button").forEach(function(b){b.disabled=false;});
                    });
                });
            
            async function webcam(){
            try{
                const stream=await navigator.mediaDevices.getUserMedia({video:true});
                document.querySelectorAll("#button button").forEach(function(b){b.disabled=true;});
                const cam=document.getElementById("webcam");
                cam.srcObject=stream;
                cam.className="webcam";
                cam.style.display="block";
                // cam.addEventListener("loadedmetadata",function()
                // {
                //     startdetection(cam);
                // })
                cam.addEventListener("play",function()
                {
                    startdetection(cam);
                });

                setTimeout(() => {
                stream.getTracks().forEach(track => track.stop());
                cam.style.display = "none"; // hide video
                canvas.style.display = "none";
                currentvideo = null;
                alert("Webcam turned off after 30 seconds.");
                document.querySelectorAll("#button button").forEach(function(b){b.disabled=false;});
                 }, 30 * 1000);
            
            } 
            catch (err) {
            alert("Error accessing webcam: " + err.message);}}; 