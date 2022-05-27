const express = require('express');
const res = require('express/lib/response');
const app = express();

const port = process.env.PORT || 5000;

// async function fetchWeather() {
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
//             'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//         },
//     };

//     try {
//         const response = await fetch(
//             'https://weatherapi-com.p.rapidapi.com/ip.json?q=%3CREQUIRED%3E',
//             options
//         );
//         console.log('Weather', response);
//         return response;
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function fetchNews() {
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Host': 'myallies-breaking-news-v1.p.rapidapi.com',
//             'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//         },
//     };

//     try {
//         const response = await fetch(
//             'https://myallies-breaking-news-v1.p.rapidapi.com/GetCompanyDetailsBySymbol?symbol=twtr',
//             options
//         );
//         console.log('News', response);
//         return response;
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function fetchMovies() {
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
//             'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//         },
//     };

//     try {
//         const response = await fetch(
//             'https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1',
//             options
//         );
//         console.log('Movies', response);
//         return response;
//     } catch (error) {
//         console.error(error);
//     }
// }

function fetchWeather() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'myallies-breaking-news-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        },
    };

    fetch(
        'https://myallies-breaking-news-v1.p.rapidapi.com/GetCompanyDetailsBySymbol?symbol=twtr',
        options
    )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
}

function fetchNews() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'myallies-breaking-news-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        },
    };

    fetch(
        'https://myallies-breaking-news-v1.p.rapidapi.com/GetCompanyDetailsBySymbol?symbol=twtr',
        options
    )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
}

function fetchMovies() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        },
    };

    fetch(
        'https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1',
        options
    )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
}

async function userData() {
    return Promise.all([fetchMovies, fetchMovies, fetchWeather]).then((data) => {
        console.log('data', data);
        return data;
    });
    const user = await userData();
    console.log('user', user);
}

// async function userData() {
//     try {
//         const response = await Promise.all([fetchMovies, fetchNews, fetchWeather]);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//     }
//     const user = await userData();
//     console.log('user', user);
// }

userData();

app.get('/route1', (req, res) => {
    setTimeout(() => res.send({ foo: 1 }), 1000);
});

app.get('/route2', (req, res) => {
    setTimeout(() => res.send({ bar: 1 }), 2000);
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
