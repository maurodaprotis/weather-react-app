import React from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import GeolocationContext from '../context/GeolocationContext';
import Sun from '../icons/Sun';
import Uv from '../icons/Uv';
import Elevation from '../icons/Elevation';
import Cloud from '../icons/Cloud';
import Rain from '../icons/Rain';
import Wind from '../icons/Wind';
import WindDirection from '../icons/WindDirection';
import Sunrise from '../icons/Sunrise';
import Sunset from '../icons/Sunset';

const WeatherCardStyles = styled.div`
  width: 90%;
  max-width: 22rem;
  min-height: 32rem;
  background: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 5rem 2rem 2rem 2rem;
  text-align: center;
  color: #7c8383;

  & > div {
    padding-bottom: 1.5rem;
  }
  & > :last-child {
    padding: 0;
  }

  .temp {
    .current {
      line-height: 1.25;
      font-size: 2.25rem;
      font-size: 600;
    }
    .maxmin {
      font-size: 0.85rem;
      font-weight: 400;
    }
  }
  .location {
    padding-bottom: 1.5rem;
    .city {
      font-weight: 600;
      font-size: 1.5rem;
      line-height: 1.25;
    }
    .time {
      font-size: 0.85rem;
      font-weight: 400;
    }
  }
  .hr {
    margin-bottom: 1rem;
    padding: 0;
    width: 100%;
    height: 1px;
    background-color: #ddd;
  }
  .details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
    justify-items: start;
    align-items: center;

    .center {
      display: flex;
      justify-items: start;
      align-items: center;

      .value {
        padding-left: 1rem;
        font-size: 1rem;
      }
    }
  }
`;

const getFormatedTime = time =>
  format(new Date(`${time} UTC`.replace(/-/g, '/')), 'EEEE | LLL d | h:mma', {
    awareOfUnicodeTokens: true,
  });

const getFormatedHour = time =>
  format(new Date(`${time} UTC`.replace(/-/g, '/')), 'kk:mm', {
    awareOfUnicodeTokens: true,
  });

const WeatherCard = () => (
  <GeolocationContext.Consumer>
    {({ weather, loading, error }) => {
      if (loading) {
        return (
          <WeatherCardStyles>
            <div>Loading...</div>
          </WeatherCardStyles>
        );
      }
      return (
        <WeatherCardStyles>
          <div>
            <Sun />
          </div>
          <div className="temp">
            <div className="current">{weather.temp}º</div>
            <div className="maxmin">
              Feels like {weather.app_temp}º | {weather.weather.description}
            </div>
          </div>
          <div className="location">
            <div className="city">{weather.city_name}</div>
            <div className="time">{getFormatedTime(weather.ob_time)}</div>
          </div>
          <div className="hr" />
          <div className="details">
            <div className="center">
              <Uv /> <div className="value">{weather.uv.toFixed(2)}</div>
            </div>
            <div className="center">
              <Elevation />
              <div className="value">{weather.elev_angle}º</div>
            </div>
            <div className="center">
              <Cloud /> <div className="value">{weather.clouds}%</div>
            </div>
            <div className="center">
              <Rain /> <div className="value">{weather.precip}%</div>
            </div>
            <div className="center">
              <Wind />{' '}
              <div className="value">
                {parseFloat(weather.wind_spd * 3.6).toFixed(2)} km/h
              </div>
            </div>
            <div className="center">
              <WindDirection /> <div className="value">{weather.wind_cdir}</div>
            </div>
            <div className="center">
              <Sunrise />{' '}
              <div className="value">
                {getFormatedHour(
                  `${weather.datetime.split(':')[0]} ${weather.sunrise}`
                )}
              </div>
            </div>
            <div className="center">
              <Sunset /> <div className="value">20:30</div>
            </div>
          </div>
        </WeatherCardStyles>
      );
    }}
  </GeolocationContext.Consumer>
);

WeatherCard.propTypes = {};

export default WeatherCard;
