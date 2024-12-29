import React, { useEffect, useState } from "react";
import './css/WeatherNow.css'; // CSS 파일 불러오기
import { Line } from 'react-chartjs-2'; // Chart.js에서 Line 그래프를 사용
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js 구성 요소 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

navigator.geolocation.getCurrentPosition(function(pos) {
    console.log(pos);
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    alert("현재 위치는 : " + latitude + ", " + longitude);
});

function getTodayDate() {
    const today = new Date();  // 현재 날짜와 시간을 가져옵니다.

    const year = today.getFullYear();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');

    return `${year}${month}${day}`;
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

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    // 온도(TMP)와 습도(REH) 데이터를 그래프 데이터로 변환
    const labels = data.filter(item => item.category === 'TMP').map(item => `${item.fcstDate} ${item.fcstTime}`);
    const temperatureData = data.filter(item => item.category === 'TMP').map(item => parseFloat(item.fcstValue));
    const humidityData = data.filter(item => item.category === 'REH').map(item => parseInt(item.fcstValue));

    // Chart.js 그래프 데이터 설정
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '온도(°C)',
                data: temperatureData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
            {
                label: '습도(%)',
                data: humidityData,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
            }
        ]
    };

    return (
        <div className="weather-container">
            <h1>오늘의 날씨 정보</h1>
            <div className="weather-info">
                {/* 그래프 표시 */}
                <Line data={chartData} options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '온도와 습도'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: '시간'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: '값'
                            },
                            ticks: {
                                beginAtZero: false
                            }
                        }
                    }
                }} />
            </div>
        </div>
    );
}

export default WeatherNow;
