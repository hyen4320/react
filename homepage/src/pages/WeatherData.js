import React, { useEffect, useState } from "react";
import './css/WeatherNow.css'; // CSS 파일 불러오기

navigator.geolocation.getCurrentPosition(function(pos) {
    console.log(pos);
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    alert("현재 위치는 : " + latitude + ", " + longitude);
});

function getTodayDate() {
    const today = new Date();  // 현재 날짜와 시간을 가져옵니다.

    // 년, 일, 월을 구해서 문자열로 반환합니다.
    const year = today.getFullYear();
    const day = String(today.getDate()).padStart(2, '0');  // 날짜도 두 자릿수로 맞추기 위해 padStart 사용
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.

    return `${year}${month}${day}`;  // YYYYMMDD 형식으로 반환
}

function WeatherNow() {
    const url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=x1pc42aSDv8am9Ucfx%2BPSOF8QJ2p%2BR%2F6sjJaVeS7JHoIgPuHxDFF%2FwLi1X0vZxjnr6uip4ZxSKo%2FBCqmLqvFeQ%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=" + getTodayDate() + "&base_time=0500&nx=55&ny=127";
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error network");
                }
                const result = await response.json();
                setData(result.response.body.items.item); // 날씨 정보 배열만 추출하여 상태 설정
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    if (loading) return <p>로딩 중...</p>; // 로딩 중 표시
    if (error) return <p style={{ color: 'red' }}>{error}</p>; // 에러 발생 시 표시

    return (
        <div className="weather-container">
            <h1>오늘의 날씨 정보</h1>
            <div className="weather-info">
                {data.length > 0 ? (
                    data.map((item, index) => {
                        let weatherDetail = '';
                        switch (item.category) {
                            case 'TMP':
                                weatherDetail = `온도: ${item.fcstValue}°C`;
                                break;
                            case 'UUU':
                                weatherDetail = `풍속: ${item.fcstValue} m/s`;
                                break;
                            case 'VVV':
                                weatherDetail = `풍향: ${item.fcstValue}°`;
                                break;
                            case 'VEC':
                                weatherDetail = `풍향 방향: ${item.fcstValue}°`;
                                break;
                            case 'WSD':
                                weatherDetail = `풍속: ${item.fcstValue} m/s`;
                                break;
                            case 'SKY':
                                weatherDetail = `하늘 상태: ${item.fcstValue === '1' ? '맑음' : item.fcstValue === '3' ? '구름 많음' : '흐림'}`;
                                break;
                            case 'PTY':
                                weatherDetail = `강수형태: ${item.fcstValue === '0' ? '없음' : '있음'}`;
                                break;
                            case 'POP':
                                weatherDetail = `강수 확률: ${item.fcstValue}%`;
                                break;
                            case 'WAV':
                                weatherDetail = `파고: ${item.fcstValue}`;
                                break;
                            case 'PCP':
                                weatherDetail = `강수: ${item.fcstValue}`;
                                break;
                            case 'REH':
                                weatherDetail = `습도: ${item.fcstValue}%`;
                                break;
                            case 'SNO':
                                weatherDetail = `적설: ${item.fcstValue}`;
                                break;
                            default:
                                weatherDetail = `알 수 없음`;
                        }
                        return (
                            <div key={index} className="weather-item">
                                <p>{weatherDetail}</p>
                                <p>{item.fcstDate} {item.fcstTime}</p>
                            </div>
                        );
                    })
                ) : (
                    <p>날씨 정보를 불러올 수 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default WeatherNow;
