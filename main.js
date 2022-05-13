status="";
objects=[];

function setup()
{
    canvas=createCanvas(500,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(500,300)
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
    object_name=document.getElementById("input").value;
    objectDetector.detect(video,gotResult);
}

function modelLoaded()
{
    console.log("model loaded!");
    status=true;
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }

    else
    {
        console.log(results);
        objects=results;
    }
}

function draw()
{
    image(video,0,0,500,300);
    if(status !="")
    {
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status:Object Detected";
            fill("#FFF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#FFF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label==object_name)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("bob").innerHTML=object_name+"Found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("bob").innerHTML=object_name+"Not Found";
            }
        }
    }
}