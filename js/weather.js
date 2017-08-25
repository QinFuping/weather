$(document).ready(function(){
    var _t=new Date();
    var _m=_t.getMonth()+1;
    var _d=_t.getDate();
    var _n=_t.getDay();
    var dateArr=['一','二','三','四','五','六','日'];
    document.getElementById('month').innerText=_m>9?_m:'0'+_m;
    document.getElementById('date').innerText=_d>9?_d:'0'+_d;
    document.getElementById('day').innerText=dateArr[_n];

    var dataContainer=document.getElementById('data');
    var request;
    if(window.XMLHttpRequest){
        request=new XMLHttpRequest();
    }else{
        request=new ActiveXObject("Microsoft.XMLHTTP");
    }
    getData();
    function getData(){
        request.open('GET','https://link.zhihu.com/?target=http%3A//sou.qq.com/online/get_weather.php%3Fcallback%3DWeather%26city%3Dnanjing',false);
        request.onreadystatechange = function(){
            if(request.readyState == 4){
                dataContainer.innerText='Loading...';
                if(requset.status == 200){
                    dataContainer.innerHTML=requset.responseText;
                }
            }
        }
        request.send();
    }
});
