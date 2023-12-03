import {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const DATA_URL = "https://randomuser.me/api"

function getData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function InfoCard({info}) {
    return <div className="infoCardContainer">
        <img className="imagePerson" src={info.picture.large} alt="imagePerson"/>

        <div className="infoContainer">
            <div>Name: {info.name.first} {info.name.last}</div>

            <div>Cell: {info.phone}</div>

            <div>City: {info.location.city}</div>

            <div>Counrty: {info.location.country}</div>
        </div>
    </div>
}

function App() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onDownloadClick = () => {
        setIsLoading(true);

        getData(DATA_URL)
            .then(({results}) => {
                setData(results);

                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (isLoading) {
        return (
            <div className="App">
                <button type="button" onClick={onDownloadClick}>Download</button>

                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="App">
            <button type="button" className="btn" onClick={onDownloadClick}>Download</button>

            {data && <>
                <div>Success!</div>

                {data.map((info) => {
                    return <InfoCard key={info.name + info.city} info={info}/>
                })}
            </>}
        </div>
    );
}

export default App;
