$(document).ready(function(){
    var _t=new Date();
    var _m=_t.getMonth()+1;
    var _d=_t.getDate();
    var _n=_t.getDay();
    document.getElementById('month').innerText=_m>9?_m:'0'+_m;
    document.getElementById('date').innerText=_d>9?_d:'0'+_d;

    var city;
    if(window.localStorage){
        var storage=window.localStorage;
    }else{
        var storage={};
    }
    if(storage.thisCity){
        city=storage.thisCity;
    }else{
        city='广州';
    }
    $('#place').val(city);
    console.log(city);
    $('#changePlace').bind('click',function(){
        $('#place')[0].type='text';
        $('#place').focus();
    });
    var flag=false;
    $('#place').focus(function(){
        this.select();
        flag=true;
    });
    $('#place').bind('blur',changeCity);
    document.onkeydown=function(event){
        var event=event||window.event;
        if(event.keyCode==13&&flag==true){
            $('#place').blur();
        }
    }

    function changeCity(){
        city=$('#place').val();
        $('#place-tips')[0].innerHTML='';
        $('#place')[0].type='button';
        storage.thisCity=city;
        flag=false;
        getWeather();
        console.log(city);
    }
    getWeather();
    function getWeather(){
        $.ajax({
            url:'jisutianqi.market.alicloudapi.com/weather/query?',
            type:'GET',
            async:true,    //是否异步
            timeout:5000,    //超时时间
            dataType:'json',    //json/xml/html/script/jsonp/text
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "APPCODE" + "e7ab85ec27a14e40a7afffcf21250b14");
            },
            data:{
                'city' : city
            },
            success:function(data){
                console.log(data)
                storage.data=data;
                document.getElementById('week').innerText=data.result.week;
                $('.weather-tips-winddirect').html(data.result.winddirect);
                $('.weather-tips-windpower').html(data.result.windpower);
                $('.weather-tips-pm25').html(data.result.aqi.pm2_5);
                $('.weather-tips-quality').html(data.result.aqi.quality);
                var tipDom='<div class="place-tips-list"><span class="iname"></span><span>:</span><span class="ivalue"></span><b class="detail"></b></div>';
                for(var i=0;i<data.result.index.length;i++){
                    $('#place-tips')[0].innerHTML+=tipDom;
                    $('.iname')[i].innerText=data.result.index[i]['iname'];
                    $('.ivalue')[i].innerText=data.result.index[i]['ivalue'];
                    $('.detail')[i].innerText=data.result.index[i]['detail'];
                }
                $('#place-tips-temp').html(data.result.temp);
                $('#place-tips-weather').html(data.result.weather);
                $('#place-tips-minTemp').html(data.result.templow);
                $('#place-tips-maxTemp').html(data.result.temphigh);
                for(var i=0;i<data.result.daily.length;i++){
                    $('.weather-title').eq(i).html(data['result']['daily'][i]['week']);
                    $('.weather-title-small').eq(i).html(data['result']['daily'][i]['date']);
                    $('.weather-title').eq(0).html('今天');
                    $('.weather-weather').eq(i).html(data['result']['daily'][i]['day']['weather']);
                    $('.weather-winddirect').eq(i).html(data['result']['daily'][i]['day']['winddirect']);
                    $('.weather-windpower').eq(i).html('['+data['result']['daily'][i]['day']['windpower']+']');
                    $('.weather-weather2').eq(i).html(data['result']['daily'][i]['night']['weather']);
                    $('.weather-winddirect2').eq(i).html(data['result']['daily'][i]['night']['winddirect']);
                    $('.weather-windpower2').eq(i).html('['+data['result']['daily'][i]['night']['windpower']+']');
                    $('.weather-maxtemp').eq(i).html('最高温度：'+data['result']['daily'][i]['day']['temphigh']+'℃');
                    $('.weather-mintemp').eq(i).html('最低温度：'+data['result']['daily'][i]['night']['templow']+'℃');
                }
            },
            error:function(xhr,textStatus){
                console.log('错误')
                console.log(xhr)
                console.log(textStatus)
            }
        });
    }
});
